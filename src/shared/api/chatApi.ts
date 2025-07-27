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

  const response = await fetch('/api/n8n/chat', {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error sending to LLM');
  }

  return response.json();
}
