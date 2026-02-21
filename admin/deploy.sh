#!/bin/bash

# Admin Panel Build & Deploy Script for Hostinger VPS
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh production

set -e  # Exit on error

ENV=${1:-production}
ADMIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Starting Admin Panel Deployment"
echo "Environment: $ENV"
echo "Admin Directory: $ADMIN_DIR"
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 2: Build the project
echo "🔨 Building project..."
npm run build
echo "✅ Build completed"
echo ""

# Step 3: Check dist folder
if [ ! -d "$ADMIN_DIR/dist" ]; then
    echo "❌ Error: dist folder not found!"
    exit 1
fi

echo "📊 Build Summary:"
echo "   - Dist folder size: $(du -sh dist | cut -f1)"
echo "   - Files count: $(find dist -type f | wc -l)"
echo ""

echo "✅ Build successful!"
echo ""
echo "📤 Next Steps:"
echo "1. Upload dist/ contents to your VPS:"
echo "   rsync -avz dist/ user@your-vps-ip:/home/user/htdocs/admin.yourdomain.com/"
echo ""
echo "2. Or use SFTP client (FileZilla, Cyberduck) to upload files"
echo ""
echo "3. Ensure NGINX is configured with SPA routing"
echo "4. Visit https://admin.yourdomain.com to verify"
