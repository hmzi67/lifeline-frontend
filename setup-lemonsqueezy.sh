#!/bin/bash

# Lemon Squeezy Integration Setup Script
# This script helps you set up the Lemon Squeezy payment integration

echo "🍋 Lemon Squeezy Integration Setup"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -d "api" ] || [ ! -d "client" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
echo "No new dependencies needed! Using existing packages."
echo ""

echo "🗄️  Step 2: Running database migration..."
cd api

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found in api directory"
    echo "Please create one based on .env.example"
    exit 1
fi

# Run Prisma migration
echo "Running: npx prisma migrate dev --name add_lemonsqueezy_fields"
npx prisma migrate dev --name add_lemonsqueezy_fields

if [ $? -eq 0 ]; then
    echo "✅ Database migration completed successfully"
else
    echo "❌ Migration failed. Please check the error messages above."
    exit 1
fi

# Generate Prisma client
echo ""
echo "Generating Prisma client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated successfully"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

cd ..

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Add Lemon Squeezy environment variables to api/.env:"
echo "   - LEMONSQUEEZY_API_KEY"
echo "   - LEMONSQUEEZY_STORE_ID"
echo "   - LEMONSQUEEZY_WEBHOOK_SECRET"
echo "   - LEMONSQUEEZY_VARIANT_ID"
echo ""
echo "2. Restart your development servers:"
echo "   cd api && npm run dev"
echo "   cd client && npm run dev"
echo ""
echo "3. Set up webhook in Lemon Squeezy dashboard:"
echo "   URL: http://your-domain/api/webhooks/lemonsqueezy"
echo "   Events: order_created, subscription_created, subscription_updated, subscription_cancelled"
echo ""
echo "4. For local testing, use ngrok:"
echo "   ngrok http 3000"
echo ""
echo "📖 Read LEMONSQUEEZY_INTEGRATION.md for detailed instructions"
echo ""
