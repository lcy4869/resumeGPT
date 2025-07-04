#!/bin/bash

echo "🚀 ResumeGPT Deployment Script"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/resumeGPT.git"
    exit 1
fi

# Build the application
echo "📦 Building application..."
cd client
npm run build
cd ..

# Check if build was successful
if [ ! -d "client/build" ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
cd client
npm run deploy
cd ..

echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Go to Settings > Pages"
echo "3. Select 'GitHub Actions' as source"
echo "4. Your site will be available at: https://yourusername.github.io/resumeGPT"
echo ""
echo "⚠️  Note: You'll need to deploy the backend separately for AI features to work."
echo "   Recommended: Use Vercel for full-stack deployment" 