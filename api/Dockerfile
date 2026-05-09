# Use Node.js 20 as base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (skip postinstall scripts during install)
RUN npm install --ignore-scripts

# Copy source code
COPY . .

# Ensure proper permissions
RUN chown -R node:node /app

# Switch to node user for security
USER node

# Run build and prisma generate manually
RUN npm run build && npx prisma generate

# Create necessary directories
RUN mkdir -p uploads logs

# Switch back to root for port binding
USER root

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]