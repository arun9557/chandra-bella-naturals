#!/bin/bash

# Deployment script for The Chandra Bella Naturals Frontend

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🌐 You can now deploy the contents of the 'dist' directory to your hosting service"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "🎉 Deployment preparation complete!"
