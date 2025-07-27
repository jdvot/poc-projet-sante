# 🔗 n8n Webhook URLs Configuration

## Overview

This document details the n8n webhook URLs configuration for different environments in the Limitless Health application.

## Webhook URLs

### Production & Staging

- **URL**: `https://jdvot57.app.n8n.cloud/webhook/chat`
- **Environment**: Production and Staging
- **Status**: Active
- **Description**: Main n8n Cloud webhook for processing AI chat requests

### Development (Local)

- **URL**: `http://localhost:5678/webhook/chat`
- **Environment**: Development
- **Status**: Optional (for local n8n testing)
- **Description**: Local n8n instance for development testing

## Configuration

### Environment Variables

```bash
# Production/Staging
N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat

# Development (optional)
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat
```

### Automatic URL Selection

The application automatically selects the appropriate webhook URL based on the environment:

```typescript
// src/app/api/n8n/chat/route.ts
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://jdvot57.app.n8n.cloud/webhook/chat'
    : 'http://localhost:5678/webhook/chat');
```

## Testing

### Test the Webhook

```bash
# Test webhook connectivity
npm run test:n8n

# Or run the script directly
./scripts/test-n8n-webhook.sh
```

### Manual Testing

```bash
# Test with curl
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"message":"Test message","timestamp":"2024-01-15T10:30:00.000Z","sessionId":"test"}' \
  https://jdvot57.app.n8n.cloud/webhook/chat

# Test with file upload
curl -X POST \
  -F "message=Test message" \
  -F "files=@test-document.txt" \
  https://jdvot57.app.n8n.cloud/webhook/chat
```

## Workflow Details

### n8n Cloud Workflow

- **Instance**: n8n Cloud
- **Workflow ID**: `ksAtEV1aCG8yb2AP`
- **Webhook ID**: `7fcf1274-2e93-4611-88d4-ba8beef56f82`
- **Status**: Active

### Workflow Components

1. **Webhook Trigger**: Receives POST requests
2. **Validate Input**: Validates message and file data
3. **Check Files**: Determines if files are present
4. **Process Files**: Analyzes uploaded files
5. **Prepare LLM Context**: Prepares context for Gemini
6. **Basic LLM Chain**: Processes with Google Gemini Pro
7. **Format Response**: Formats the final response
8. **Error Handler**: Handles errors gracefully

## Security

### CORS Configuration

The webhook includes proper CORS headers:

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

## Monitoring

### Health Check

```bash
# Check webhook status
curl -I https://jdvot57.app.n8n.cloud/webhook/chat
```

### Logs

- Access n8n Cloud dashboard for workflow monitoring
- Check execution logs for debugging
- Monitor response times and success rates

## Troubleshooting

### Common Issues

1. **Webhook not accessible**:
   - Verify URL: `https://jdvot57.app.n8n.cloud/webhook/chat`
   - Check network connectivity
   - Verify n8n Cloud instance status

2. **Timeout errors**:
   - Check workflow execution time
   - Verify Gemini API response time
   - Consider workflow optimization

3. **CORS errors**:
   - Verify CORS headers in workflow
   - Check request origin
   - Ensure proper headers in response

### Debug Steps

1. **Test basic connectivity**:

   ```bash
   curl -I https://jdvot57.app.n8n.cloud/webhook/chat
   ```

2. **Test with simple payload**:

   ```bash
   curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"message":"test"}' \
     https://jdvot57.app.n8n.cloud/webhook/chat
   ```

3. **Check n8n Cloud logs**:
   - Access n8n Cloud dashboard
   - Review workflow execution logs
   - Check for error messages

## Migration

### From Local to Cloud

If migrating from local n8n to n8n Cloud:

1. **Update environment variables**:

   ```bash
   N8N_WEBHOOK_URL=https://jdvot57.app.n8n.cloud/webhook/chat
   ```

2. **Test connectivity**:

   ```bash
   npm run test:n8n
   ```

3. **Verify workflow functionality**:
   - Test message processing
   - Test file upload
   - Verify response format

## Support

For issues with the n8n webhook:

1. Check this documentation
2. Run the test script: `npm run test:n8n`
3. Review n8n Cloud logs
4. Contact the development team

## Updates

- **2024-01-15**: Initial configuration with n8n Cloud
- **2024-01-15**: Added test script and documentation
- **2024-01-15**: Configured for production and staging environments
