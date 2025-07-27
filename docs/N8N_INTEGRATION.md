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
# n8n webhook URL (Cloud n8n)
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat

# n8n API key (optional)
N8N_API_KEY=your-n8n-api-key
```

### n8n Cloud Configuration

The application is configured to use **n8n Cloud** with the following URLs:

- **Test/Staging**: `https://jdvot57.app.n8n.cloud/webhook/chat`
- **Production**: `https://jdvot57.app.n8n.cloud/webhook/chat`

### Environment-Specific Configuration

The application automatically selects the appropriate n8n webhook URL based on the environment:

```typescript
// Production & Staging: Use n8n Cloud
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://jdvot57.app.n8n.cloud/webhook/chat'
    : 'http://localhost:5678/webhook/chat');
```

### n8n Workflow Configuration

1. **Webhook URL**: The workflow is accessible at `/webhook/chat`
2. **Method**: `POST`
3. **Authentication**: Optional API key support
4. **CORS**: Configured for cross-origin requests

### Expected Payload Structure

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

### Expected Response Structure

```json
{
  "response": "LLM response from Gemini",
  "processingTime": 1500,
  "fileAnalysis": [
    {
      "fileName": "document.pdf",
      "summary": "File analysis summary"
    }
  ],
  "model": "gemini-pro",
  "hasFiles": true,
  "fileCount": 1,
  "contentType": "document"
}
```

## n8n Workflow Details

### Workflow Components

1. **Webhook Trigger**: Receives data from the application
2. **Validate Input**: Validates message and file data
3. **Check Files**: Determines if files are present
4. **Process Files**: Analyzes uploaded files (images, PDFs, documents)
5. **Prepare LLM Context**: Prepares context for the LLM
6. **Basic LLM Chain**: Processes the request with Gemini
7. **Format Response**: Formats the final response
8. **Error Handler**: Handles errors gracefully

### LLM Integration

- **Model**: Google Gemini Pro
- **Context**: Medical assistant specialized in health analysis
- **File Support**: Images, PDFs, documents, text files
- **Response Format**: Professional, clear, and helpful medical advice

### File Processing Capabilities

- **Images**: Visual analysis and anomaly detection
- **PDFs**: Text extraction and medical document analysis
- **Documents**: Content analysis and insights
- **Text Files**: Direct content processing

## Usage

### In Frontend

```typescript
import { useChatStore } from '@/shared/stores/chatStore';

const { sendMessageToN8n } = useChatStore();

// Send message with file
await sendMessageToN8n('Analyze this document', [file]);
```

### API Endpoint

```typescript
// POST /api/n8n/chat
const response = await fetch('/api/n8n/chat', {
  method: 'POST',
  body: formData, // FormData with message and files
});
```

### Integration Testing

1. **Development mode**: Automatic simulated responses
2. **Production mode**: Real n8n Cloud connection
3. **Unit tests**: API call mocking

## Monitoring

### Logs

- **Frontend**: Browser console for client errors
- **Backend**: Next.js logs for API errors
- **n8n Cloud**: Workflow logs for debugging

### Metrics

- **Response time**: Automatically measured
- **Success rate**: Error tracking
- **Usage**: Request count per session

## Troubleshooting

### Common Issues

1. **Webhook not accessible**:
   - Check n8n Cloud URL: `https://jdvot57.app.n8n.cloud/webhook/chat`
   - Test network connectivity
   - Verify environment variables

2. **Files not processed**:
   - Check supported file types
   - Control file size
   - Verify base64 encoding

3. **Slow responses**:
   - Optimize n8n workflow
   - Check Gemini performance
   - Consider caching

### Debug

```bash
# Test API directly
curl -X POST http://localhost:3000/api/n8n/chat \
  -F "message=test" \
  -F "files=@document.pdf"

# Check n8n Cloud logs
# Access n8n Cloud dashboard for workflow monitoring
```

## Security

### CORS Configuration

The n8n workflow includes proper CORS headers:

```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Session-Id"
}
```

### Authentication

- Optional API key support via `N8N_API_KEY`
- Session-based tracking via `X-Session-Id` header
- Input validation and sanitization

## Future Enhancements

- [ ] Support for more file types
- [ ] Response streaming
- [ ] Conversation history
- [ ] Multi-LLM integration
- [ ] Smart caching
- [ ] Advanced analytics
- [ ] Rate limiting
- [ ] Enhanced security features
