# 🤖 n8n Integration - AI Chat with File Upload

## Overview

This document describes the integration between the Limitless Health application and n8n for processing messages and files via a LLM (Large Language Model).

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Next.js API   │    │      n8n        │
│   (React)       │───▶│   Route         │───▶│   Workflow      │
│                 │    │   /api/n8n/chat │    │   + LLM         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Configuration

### Environment Variables

Add these variables to your `.env.local` file:

```bash
# n8n webhook URL
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat

# n8n API key (optional)
N8N_API_KEY=your-n8n-api-key
```

### n8n Configuration

1. **Create a webhook in n8n**:
   - Open n8n
   - Create a new workflow
   - Add a "Webhook" node
   - Configure the URL: `/webhook/chat`
   - Method: `POST`

2. **Expected payload structure**:

```json
{
  "message": "Your user message",
  "files": [
    {
      "name": "document.pdf",
      "size": 1024000,
      "type": "application/pdf",
      "content": "base64_encoded_content"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z",
  "sessionId": "user_session_id"
}
```

3. **Expected response structure**:

```json
{
  "response": "LLM response",
  "processingTime": 1500,
  "fileAnalysis": [
    {
      "fileName": "document.pdf",
      "summary": "File analysis summary"
    }
  ]
}
```

## Recommended n8n Workflow

### Workflow Steps

1. **Webhook Trigger**: Receive data
2. **File Processing**: Process uploaded files
3. **LLM Integration**: Call LLM (OpenAI, Claude, etc.)
4. **Response Formatting**: Format response
5. **Webhook Response**: Return response

### Example n8n Workflow

```javascript
// 1. Webhook Trigger
const webhookData = $input.all()[0].json;

// 2. Process files
const files = webhookData.files || [];
const fileContents = files.map((file) => ({
  name: file.name,
  content: Buffer.from(file.content, 'base64').toString('utf-8'),
}));

// 3. Prepare context for LLM
const context = `
User message: ${webhookData.message}

Analyzed files:
${fileContents.map((file) => `- ${file.name}: ${file.content.substring(0, 500)}...`).join('\n')}
`;

// 4. Call LLM (example with OpenAI)
const llmResponse = await $http.post({
  url: 'https://api.openai.com/v1/chat/completions',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI assistant specialized in analyzing medical and health documents.',
      },
      {
        role: 'user',
        content: context,
      },
    ],
    max_tokens: 1000,
  },
});

// 5. Format response
const response = {
  response: llmResponse.data.choices[0].message.content,
  processingTime: Date.now() - webhookData.timestamp,
  fileAnalysis: files.map((file) => ({
    fileName: file.name,
    summary: `File ${file.name} analyzed successfully`,
  })),
};

return response;
```

## Features

### File Upload

- **Supported types**: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG
- **Maximum size**: Configurable (default: 10MB)
- **Encoding**: Base64 for secure transmission

### Error Handling

- **Timeout**: 30 seconds default
- **Retry logic**: 3 attempts on failure
- **Fallback**: Mock response in development mode

### Security

- **Validation**: File type verification
- **Sanitization**: User input cleaning
- **Rate limiting**: Request limitation per session

## Usage

### In Frontend

```typescript
import { useChatStore } from '@/shared/stores/chatStore';

const { sendMessageToN8n } = useChatStore();

// Send message with file
await sendMessageToN8n('Analyze this document', [file]);
```

### Integration Testing

1. **Development mode**: Automatic simulated responses
2. **Production mode**: Real n8n connection
3. **Unit tests**: API call mocking

## Monitoring

### Logs

- **Frontend**: Browser console for client errors
- **Backend**: Next.js logs for API errors
- **n8n**: Workflow logs for debugging

### Metrics

- **Response time**: Automatically measured
- **Success rate**: Error tracking
- **Usage**: Request count per session

## Troubleshooting

### Common Issues

1. **Webhook not accessible**:
   - Check n8n URL
   - Test network connectivity
   - Verify environment variables

2. **Files not processed**:
   - Check supported file types
   - Control file size
   - Verify base64 encoding

3. **Slow responses**:
   - Optimize n8n workflow
   - Check LLM performance
   - Consider caching

### Debug

```bash
# Check n8n logs
docker logs n8n-container

# Test API directly
curl -X POST http://localhost:3000/api/n8n/chat \
  -F "message=test" \
  -F "files=@document.pdf
```

## Future Enhancements

- [ ] Support for more file types
- [ ] Response streaming
- [ ] Conversation history
- [ ] Multi-LLM integration
- [ ] Smart caching
- [ ] Advanced analytics
