import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Configuration pour l'export statique
export const dynamic = 'force-static';
export const revalidate = false;

// Configuration n8n selon l'environnement
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || 'https://jdvot57.app.n8n.cloud/webhook/chat';
const N8N_API_KEY = process.env.N8N_API_KEY;

// Define schema for incoming request validation
const ChatRequestSchema = z
  .object({
    message: z
      .string()
      .min(1, 'Message cannot be empty')
      .max(1000, 'Message is too long')
      .optional(),
    files: z.array(z.any()).optional(),
  })
  .refine((data) => data.message || (data.files && data.files.length > 0), {
    message: 'Either message or at least one file is required',
  });

interface N8NResponse {
  response: string;
  processingTime?: number;
  fileAnalysis?: {
    fileName: string;
    summary: string;
  }[];
}

// Fonction utilitaire pour convertir un fichier en base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function POST(request: NextRequest) {
  let message: string | null = null;
  let files: File[] = [];

  try {
    const formData = await request.formData();
    message = formData.get('message') as string | null;
    files = formData.getAll('files') as File[];

    // Validate input using zod
    const validationResult = ChatRequestSchema.safeParse({ message, files });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    // Pour l'export statique, retourner une réponse simulée
    if (process.env.NODE_ENV === 'production' || process.env.STATIC_EXPORT) {
      return NextResponse.json({
        response: `Simulated response for: "${message}"\n\nThis is a static export. In production with server-side rendering, this would be processed by n8n.`,
        processingTime: 1500,
        fileAnalysis: files.map((file) => ({
          fileName: file.name,
          summary: `Simulated analysis of file ${file.name}`,
        })),
        static: true,
      });
    }

    // Préparer les données pour n8n (seulement en développement)
    const filesWithContent = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        content: await fileToBase64(file),
      }))
    );

    const n8nPayload = {
      message: validationResult.data.message,
      files: filesWithContent,
      timestamp: new Date().toISOString(),
      sessionId: request.headers.get('x-session-id') || 'default',
    };

    console.log('Sending to n8n:', N8N_WEBHOOK_URL);
    console.log('n8n payload:', JSON.stringify(n8nPayload, null, 2));

    // Check if n8n is accessible
    try {
      // Envoyer à n8n
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(N8N_API_KEY && { Authorization: `Bearer ${N8N_API_KEY}` }),
        },
        body: JSON.stringify(n8nPayload),
        // Add timeout for better error handling
        signal: AbortSignal.timeout(30000), // 30 second timeout
      });

      if (!n8nResponse.ok) {
        const errorText = await n8nResponse.text();
        console.error('n8n HTTP error:', n8nResponse.status, errorText);
        throw new Error(`n8n HTTP error: ${n8nResponse.status} - ${errorText}`);
      }

      // Check if response has content
      const responseText = await n8nResponse.text();
      console.log('n8n raw response:', responseText);

      if (!responseText || responseText.trim() === '') {
        throw new Error(
          'n8n returned empty response - check workflow configuration'
        );
      }

      let n8nData: N8NResponse;
      try {
        n8nData = JSON.parse(responseText);
        console.log('n8n response parsed:', n8nData);
      } catch (parseError) {
        console.error('n8n JSON parse error:', parseError);
        console.error('Raw response that failed to parse:', responseText);
        throw new Error(
          `n8n returned invalid JSON: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`
        );
      }

      return NextResponse.json({
        response: n8nData.response,
        processingTime: n8nData.processingTime,
        fileAnalysis: n8nData.fileAnalysis,
        model: 'gemini-pro',
        hasFiles: files.length > 0,
        fileCount: files.length,
        contentType: files.length > 0 ? 'document' : 'text',
      });
    } catch (fetchError) {
      console.error('n8n fetch error:', fetchError);

      // Check if it's a network error
      if (
        fetchError instanceof TypeError &&
        fetchError.message.includes('fetch')
      ) {
        throw new Error(
          `n8n service unavailable. Please check if n8n is running at ${N8N_WEBHOOK_URL}`
        );
      }

      throw fetchError;
    }
  } catch (error) {
    console.error('Chat API error:', error);

    // Mock response for development - utiliser les données déjà extraites
    const mockMessage = message || 'Test message';
    const mockFiles = files || [];

    // Determine error type and provide appropriate message
    let errorMessage = 'Unknown error occurred';
    let isNetworkError = false;

    if (error instanceof Error) {
      if (error.message.includes('n8n service unavailable')) {
        errorMessage = `🔌 n8n Service Unavailable\n\nPlease ensure n8n is running at:\n${N8N_WEBHOOK_URL}\n\nFor development, you can start n8n with:\ndocker-compose up n8n`;
        isNetworkError = true;
      } else if (error.message.includes('timeout')) {
        errorMessage = '⏱️ Request timeout - n8n is taking too long to respond';
        isNetworkError = true;
      } else if (error.message.includes('fetch')) {
        errorMessage = '🌐 Network error - unable to connect to n8n service';
        isNetworkError = true;
      } else if (error.message.includes('empty response')) {
        errorMessage =
          '📭 n8n returned empty response - check workflow configuration in n8n Cloud';
        isNetworkError = true;
      } else if (error.message.includes('invalid JSON')) {
        errorMessage =
          '📄 n8n returned invalid JSON - check workflow output format';
        isNetworkError = true;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json({
      response: isNetworkError
        ? `🚧 Development Mode - n8n Not Available\n\n${errorMessage}\n\nThis is a simulated response for: "${mockMessage}"\n\nTo enable full AI functionality:\n1. Start n8n service\n2. Configure N8N_WEBHOOK_URL environment variable\n3. Ensure n8n workflow is active`
        : `Simulated response for: "${mockMessage}"\n\nIn production, this request would be processed by n8n with uploaded files.\n\nError details: ${errorMessage}`,
      processingTime: 1500,
      fileAnalysis: mockFiles.map((file: File) => ({
        fileName: file.name,
        summary: `Simulated analysis of file ${file.name}`,
      })),
      model: 'gemini-pro',
      hasFiles: mockFiles.length > 0,
      fileCount: mockFiles.length,
      contentType: mockFiles.length > 0 ? 'document' : 'text',
      error: errorMessage,
      isNetworkError,
    });
  }
}
