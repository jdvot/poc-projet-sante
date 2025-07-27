export interface ChatResponse {
  response: string;
  processingTime?: number;
  fileAnalysis?: {
    fileName: string;
    summary: string;
  }[];
  model?: string;
  hasFiles?: boolean;
  fileCount?: number;
  contentType?: string;
  static?: boolean;
  error?: string;
  isNetworkError?: boolean;
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

export async function postChatMessage(
  message: string,
  files: File[],
  sessionId?: string
): Promise<ChatResponse> {
  const formData = new FormData();
  formData.append('message', message);
  files.forEach((file) => {
    formData.append('files', file);
  });

  const headers: Record<string, string> = {};
  if (sessionId) {
    headers['X-Session-Id'] = sessionId;
  }

  // En production, appeler directement n8n
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://jdvot57.app.n8n.cloud/webhook/chat'
      : '/api/n8n/chat';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      files: await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          content: await fileToBase64(file),
        }))
      ),
      sessionId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error sending to LLM');
  }

  return response.json();
}
