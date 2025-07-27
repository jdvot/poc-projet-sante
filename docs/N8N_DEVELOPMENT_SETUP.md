# n8n Development Setup Guide

## 🔧 Quick Setup for AI Chat Development

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ for local development
- Git for version control

### 1. Environment Configuration

Create or update your `.env.local` file:

```bash
# n8n Configuration
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat
N8N_API_KEY=your_n8n_api_key_here

# Development mode
NODE_ENV=development
```

### 2. Start n8n with Docker

```bash
# Start n8n service
docker-compose up n8n

# Or start in background
docker-compose up -d n8n
```

### 3. Test n8n Connection

```bash
# Run the connection test script
./scripts/test-n8n-connection.sh
```

### 4. Import n8n Workflow

1. Open n8n at `http://localhost:5678`
2. Import the workflow from `n8n-workflow-ai-chat.json`
3. Activate the workflow
4. Copy the webhook URL and update your `.env.local`

### 5. Verify Setup

1. Start your Next.js development server:

   ```bash
   npm run dev
   ```

2. Navigate to the AI Chat page
3. Send a test message
4. Check that you receive a proper AI response (not a simulated one)

## 🚨 Troubleshooting

### Common Issues

#### 1. "fetch failed" Error

- **Cause**: n8n service is not running
- **Solution**: Start n8n with `docker-compose up n8n`

#### 2. "n8n service unavailable" Error

- **Cause**: Wrong webhook URL or workflow not active
- **Solution**:
  - Check webhook URL in n8n
  - Ensure workflow is activated
  - Verify environment variables

#### 3. Timeout Errors

- **Cause**: n8n is taking too long to respond
- **Solution**:
  - Check n8n logs for errors
  - Verify AI service configuration in n8n
  - Increase timeout if needed

### Debug Commands

```bash
# Check n8n logs
docker-compose logs n8n

# Test webhook directly
curl -X POST http://localhost:5678/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","files":[],"sessionId":"test"}'

# Check environment variables
echo $N8N_WEBHOOK_URL
echo $N8N_API_KEY
```

## 📋 Development Workflow

### 1. Local Development

```bash
# Terminal 1: Start n8n
docker-compose up n8n

# Terminal 2: Start Next.js
npm run dev

# Terminal 3: Test connection
./scripts/test-n8n-connection.sh
```

### 2. Testing Changes

1. Make changes to your code
2. Test in the AI Chat interface
3. Check browser console for errors
4. Verify n8n logs for issues

### 3. Production Deployment

1. Set up n8n Cloud or self-hosted n8n
2. Update environment variables
3. Deploy your Next.js application
4. Test the production webhook

## 🔗 Useful Links

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Cloud Setup](https://cloud.n8n.io/)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 📝 Notes

- The AI Chat feature works in development mode with simulated responses when n8n is not available
- Always test with real n8n before deploying to production
- Keep your n8n API keys secure and never commit them to version control
- Monitor n8n logs for any issues during development
