#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Lifeline Health & Wellness Platform${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"

# Install root dependencies
echo -e "${BLUE}📦 Installing root dependencies...${NC}"
npm install

# Install API dependencies
echo -e "${BLUE}📦 Installing API dependencies...${NC}"
cd api && npm install
cd ..

# Install client dependencies
echo -e "${BLUE}📦 Installing client dependencies...${NC}"
cd client && npm install
cd ..

# Check if PostgreSQL is running
echo -e "${BLUE}🗄️  Checking database connection...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL client not found. Please ensure PostgreSQL is installed and running.${NC}"
    echo -e "${YELLOW}   Update the DATABASE_URL in api/.env with your database connection string.${NC}"
else
    echo -e "${GREEN}✅ PostgreSQL client found${NC}"
fi

# Generate Prisma client and run migrations
echo -e "${BLUE}🔧 Setting up database...${NC}"
cd api
if npm run generate && npm run migrate; then
    echo -e "${GREEN}✅ Database setup completed${NC}"
else
    echo -e "${YELLOW}⚠️  Database setup failed. Please check your DATABASE_URL in api/.env${NC}"
fi
cd ..

echo ""
echo -e "${GREEN}🎉 Setup completed!${NC}"
echo ""
echo -e "${BLUE}To start development:${NC}"
echo -e "  ${YELLOW}npm run dev${NC}         # Start both frontend and backend"
echo -e "  ${YELLOW}npm run dev:api${NC}     # Start backend only"
echo -e "  ${YELLOW}npm run dev:client${NC}  # Start frontend only"
echo ""
echo -e "${BLUE}Access your application:${NC}"
echo -e "  Frontend: ${YELLOW}http://localhost:5173${NC}"
echo -e "  Backend:  ${YELLOW}http://localhost:3000${NC}"
echo -e "  API Docs: ${YELLOW}http://localhost:3000/api${NC}"
echo ""
echo -e "${BLUE}Before starting, make sure to:${NC}"
echo -e "  1. Update ${YELLOW}api/.env${NC} with your database connection"
echo -e "  2. Update JWT secrets in ${YELLOW}api/.env${NC} for production"
echo -e "  3. Configure SMTP settings for email functionality"
echo ""
