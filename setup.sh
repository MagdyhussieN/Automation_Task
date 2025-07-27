#!/bin/bash

echo "🚀 Setting up Todo Manager Full Stack Application..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend: cd backend && npm run dev"
echo "2. Frontend: cd frontend && npm run dev"
echo ""
echo "Or use the root script: npm run dev"
echo ""
echo "Demo credentials:"
echo "Email: user@example.com"
echo "Password: password" 