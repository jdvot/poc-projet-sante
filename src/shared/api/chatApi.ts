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
      // Remove Content-Type header to let the browser set it automatically for FormData
      // This ensures the correct multipart/form-data boundary is set
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error sending to LLM');
  }

  return response.json();
}
