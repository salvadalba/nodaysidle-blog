#!/bin/bash

# NoDaysIdle Blog - Netlify Deployment Script
# This script helps deploy the blog to Netlify

set -e

echo "🚀 Starting NoDaysIdle Blog deployment to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed. Please install it first:"
    echo "npm install -g netlify-cli"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "astro.config.mjs" ]; then
    echo "❌ This script must be run from the blog root directory"
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."

# Check if this is a new site or existing
if [ -f ".netlify/state.json" ]; then
    echo "📤 Deploying to existing Netlify site..."
    netlify deploy --prod --dir=dist
else
    echo "🆕 Creating new Netlify site..."
    netlify deploy --prod --dir=dist

    echo "🔗 To set up continuous deployment:"
    echo "1. Go to https://app.netlify.com"
    echo "2. Find your site and go to Site settings > Build & deploy"
    echo "3. Set Repository to your GitHub repo"
    echo "4. Set Build command to: npm run build"
    echo "5. Set Publish directory to: dist"
    echo "6. Add environment variables if needed"
fi

echo "✅ Deployment complete!"
echo "🎉 Your blog is now live on Netlify!"
echo ""
echo "Next steps:"
echo "1. Set up your custom domain in Netlify dashboard"
echo "2. Configure environment variables for PocketBase"
echo "3. Set up continuous deployment from your Git repository"
echo "4. Test the admin dashboard at /admin"
echo ""
echo "Admin credentials:"
echo "URL: https://your-site.netlify.app/admin"
echo "Email: admin@nodaysidle.com"
echo "Password: admin123 (change this immediately!)"