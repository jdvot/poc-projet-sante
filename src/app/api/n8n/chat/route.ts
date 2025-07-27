import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; // Import zod for validation

// Configuration n8n (à adapter selon votre setup)
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/chat';
const N8N_API_KEY = process.env.N8N_API_KEY;

// Define schema for incoming request validation
const ChatRequestSchema = z
  .object({
    message: z
      .string()
      .min(1, 'Message cannot be empty')
      .max(1000, 'Message is too long')
      .optional(),
    // For files, we'll validate their presence and basic properties, but content validation
    // is more complex and usually handled by the file processing service (n8n in this case).
    // Here we just ensure it's an array of objects that *could* be files.
    files: z.array(z.any()).optional(), // More refined validation for files can be added later
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
      // Extraire la partie base64 (après la virgule)
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function POST(request: NextRequest) {
  // Implement rate limiting here if needed
  // Example: if (rateLimitExceeded(request)) {
  //   return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
  // }

  try {
    const formData = await request.formData();
    const message = formData.get('message') as string | null;
    const files = formData.getAll('files') as File[];

    // Validate input using zod
    const validationResult = ChatRequestSchema.safeParse({ message, files });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    // Préparer les données pour n8n
    const filesWithContent = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        // Convertir le fichier en base64 pour l'envoi
        content: await fileToBase64(file),
      }))
    );

    const n8nPayload = {
      message: validationResult.data.message,
      files: filesWithContent,
      timestamp: new Date().toISOString(),
      sessionId: request.headers.get('x-session-id') || 'default',
    };

    // Envoyer à n8n
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(N8N_API_KEY && { Authorization: `Bearer ${N8N_API_KEY}` }),
      },
      body: JSON.stringify(n8nPayload),
    });

    if (!n8nResponse.ok) {
      console.error('n8n error:', await n8nResponse.text());
      // In production, return a generic error message
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
      }
      throw new Error('Error processing with n8n');
    }

    const n8nData: N8NResponse = await n8nResponse.json();

    // Retourner la réponse formatée
    return NextResponse.json({
      response: n8nData.response,
      processingTime: n8nData.processingTime,
      fileAnalysis: n8nData.fileAnalysis,
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // In development mode, return mock response
    if (process.env.NODE_ENV === 'development') {
      const formData = await request.formData(); // Re-parse formData for mock response
      const message = formData.get('message') as string;
      const files = formData.getAll('files') as File[];

      return NextResponse.json({
        response: `Simulated response for: "${message}"\n\nIn production, this request would be processed by n8n with uploaded files.`,
        processingTime: 1500,
        fileAnalysis: files.map((file) => ({
          fileName: file.name,
          summary: `Simulated analysis of file ${file.name}`,
        })),
      });
    }

    // Generic error for production
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Configuration pour les fichiers uploadés
export const config = {
  api: {
    bodyParser: false, // Désactiver le body parser par défaut pour FormData
  },
};
