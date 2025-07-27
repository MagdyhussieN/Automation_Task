#!/bin/bash

echo "🧪 Running Todo Manager Backend Tests"
echo "====================================="

# Set test environment
export NODE_ENV=test

# Run tests
echo "Running unit tests..."
npm test

# Check if tests passed
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Some tests failed!"
    exit 1
fi 