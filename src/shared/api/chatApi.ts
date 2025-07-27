export interface ChatResponse {
  response: string;
}

export async function postChatMessage(
  message: string,
  files: File[]
): Promise<ChatResponse> {
  const formData = new FormData();
  formData.append('message', message);
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch('/api/n8n/chat', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error sending to LLM');
  }

  return response.json();
}
