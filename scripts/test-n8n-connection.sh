#!/bin/bash

# Test n8n Connection Script
# This script helps diagnose n8n connectivity issues (Local & Cloud)

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

echo "🔍 Testing n8n Connection..."
echo "================================"

# Check environment variables
echo "📋 Environment Variables:"
echo "N8N_WEBHOOK_URL: ${N8N_WEBHOOK_URL:-'Not set'}"
echo "N8N_API_KEY: ${N8N_API_KEY:-'Not set'}"
echo "NODE_ENV: ${NODE_ENV:-'Not set'}"
echo "NEXT_PUBLIC_N8N_WEBHOOK_URL: ${NEXT_PUBLIC_N8N_WEBHOOK_URL:-'Not set'}"
echo ""

# Default URLs
DEFAULT_PROD_URL="https://jdvot57.app.n8n.cloud/webhook/chat"
DEFAULT_DEV_URL="http://localhost:5678/webhook/chat"

# Determine which URL to test
if [ -n "$N8N_WEBHOOK_URL" ]; then
    TEST_URL="$N8N_WEBHOOK_URL"
    echo "🎯 Testing configured URL: $TEST_URL"
elif [ -n "$NEXT_PUBLIC_N8N_WEBHOOK_URL" ]; then
    TEST_URL="$NEXT_PUBLIC_N8N_WEBHOOK_URL"
    echo "🎯 Testing public n8n Cloud URL: $TEST_URL"
elif [ "$NODE_ENV" = "production" ]; then
    TEST_URL="$DEFAULT_PROD_URL"
    echo "🎯 Testing production URL: $TEST_URL"
else
    TEST_URL="$DEFAULT_DEV_URL"
    echo "🎯 Testing development URL: $TEST_URL"
fi

echo ""

# Test connectivity
echo "🌐 Testing connectivity..."

# Test if the URL is reachable
if curl -s --connect-timeout 5 --max-time 10 "$TEST_URL" > /dev/null 2>&1; then
    echo "✅ URL is reachable"
else
    echo "❌ URL is not reachable"
    echo "   This could mean:"
    echo "   - n8n is not running"
    echo "   - Wrong URL configuration"
    echo "   - Network connectivity issues"
fi

echo ""

# Test webhook endpoint
echo "🔗 Testing webhook endpoint..."
TEST_PAYLOAD='{"message":"test","files":[],"timestamp":"2024-01-01T00:00:00.000Z","sessionId":"test-session"}'

RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d "$TEST_PAYLOAD" \
    "$TEST_URL")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

echo "HTTP Status: $HTTP_CODE"

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Webhook is working correctly"
    echo "Response: $RESPONSE_BODY"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "❌ Webhook endpoint not found"
    echo "   Check if the webhook URL is correct"
elif [ "$HTTP_CODE" = "000" ]; then
    echo "❌ Connection failed"
    echo "   n8n service is not running or not accessible"
else
    echo "⚠️  Unexpected response: $HTTP_CODE"
    echo "Response: $RESPONSE_BODY"
fi

echo ""
echo "🔧 Troubleshooting Tips:"
if [[ "$TEST_URL" == *"cloud.n8n.io"* ]]; then
    echo "🌐 n8n Cloud detected:"
    echo "1. Check n8n Cloud dashboard: https://cloud.n8n.io/"
    echo "2. Verify workflow is activated"
    echo "3. Check webhook URL in workflow"
    echo "4. Verify API key if authentication is enabled"
    echo "5. Check execution logs in n8n Cloud"
else
    echo "🏠 Local n8n detected:"
    echo "1. If using Docker: docker-compose up n8n"
    echo "2. If using local n8n: n8n start"
    echo "3. Check n8n logs for errors"
    echo "4. Verify webhook URL in n8n workflow"
    echo "5. Ensure workflow is active"
fi
echo ""
echo "📚 For more help, check the documentation:"
echo "   - n8n Cloud: https://cloud.n8n.io/"
echo "   - n8n setup: https://docs.n8n.io/hosting/"
echo "   - webhook configuration: https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webhook/" 