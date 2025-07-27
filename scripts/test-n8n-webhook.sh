#!/bin/bash

# ========================================
# Test n8n Webhook Connectivity
# ========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
N8N_WEBHOOK_URL="https://jdvot57.app.n8n.cloud/webhook/chat"
TEST_MESSAGE="Test message from Limitless Health"
TEST_FILE="test-document.txt"

# Create test file
create_test_file() {
    print_status "Creating test file..."
    cat > "$TEST_FILE" << EOF
Test Document for n8n Webhook

This is a test document to verify the n8n webhook integration.
Date: $(date)
Environment: $NODE_ENV
EOF
    print_success "Test file created: $TEST_FILE"
}

# Test webhook connectivity
test_webhook() {
    print_status "Testing n8n webhook connectivity..."
    print_status "URL: $N8N_WEBHOOK_URL"
    
    # Test with curl
    if command -v curl &> /dev/null; then
        print_status "Using curl to test webhook..."
        
        # Test basic connectivity
        print_status "Testing basic connectivity..."
        if curl -s --connect-timeout 10 "$N8N_WEBHOOK_URL" > /dev/null 2>&1; then
            print_success "Basic connectivity: OK"
        else
            print_error "Basic connectivity: FAILED"
            return 1
        fi
        
        # Test POST request with message
        print_status "Testing POST request with message..."
        response=$(curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "{\"message\":\"$TEST_MESSAGE\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)\",\"sessionId\":\"test-session\"}" \
            --connect-timeout 30 \
            "$N8N_WEBHOOK_URL")
        
        if [ $? -eq 0 ]; then
            print_success "POST request: OK"
            print_status "Response: $response"
        else
            print_error "POST request: FAILED"
            return 1
        fi
        
        # Test POST request with file
        print_status "Testing POST request with file..."
        response=$(curl -s -X POST \
            -F "message=$TEST_MESSAGE" \
            -F "files=@$TEST_FILE" \
            --connect-timeout 30 \
            "$N8N_WEBHOOK_URL")
        
        if [ $? -eq 0 ]; then
            print_success "POST request with file: OK"
            print_status "Response: $response"
        else
            print_error "POST request with file: FAILED"
            return 1
        fi
        
    else
        print_warning "curl not found, skipping webhook tests"
        return 1
    fi
}

# Test Next.js API endpoint
test_nextjs_api() {
    print_status "Testing Next.js API endpoint..."
    
    # Check if Next.js is running
    if curl -s --connect-timeout 5 "http://localhost:3000/api/health" > /dev/null 2>&1; then
        print_success "Next.js server is running"
        
        # Test the n8n chat API
        print_status "Testing /api/n8n/chat endpoint..."
        response=$(curl -s -X POST \
            -F "message=$TEST_MESSAGE" \
            -F "files=@$TEST_FILE" \
            --connect-timeout 30 \
            "http://localhost:3000/api/n8n/chat")
        
        if [ $? -eq 0 ]; then
            print_success "Next.js API test: OK"
            print_status "Response: $response"
        else
            print_error "Next.js API test: FAILED"
            return 1
        fi
    else
        print_warning "Next.js server not running on localhost:3000"
        print_status "Start the server with: npm run dev"
        return 1
    fi
}

# Cleanup
cleanup() {
    print_status "Cleaning up..."
    if [ -f "$TEST_FILE" ]; then
        rm "$TEST_FILE"
        print_success "Test file removed"
    fi
}

# Main execution
main() {
    print_status "Starting n8n webhook connectivity test..."
    print_status "Environment: ${NODE_ENV:-development}"
    
    # Create test file
    create_test_file
    
    # Test webhook directly
    if test_webhook; then
        print_success "n8n webhook test completed successfully"
    else
        print_error "n8n webhook test failed"
    fi
    
    # Test Next.js API
    if test_nextjs_api; then
        print_success "Next.js API test completed successfully"
    else
        print_warning "Next.js API test failed or skipped"
    fi
    
    # Cleanup
    cleanup
    
    print_status "Test completed"
}

# Handle script interruption
trap cleanup EXIT

# Run main function
main "$@" 