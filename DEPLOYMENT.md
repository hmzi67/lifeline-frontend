# Deployment Guide

This guide covers deploying the Lifeline Health & Wellness Platform to production.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │────│   (Express.js)  │────│   (PostgreSQL)  │
│   Port: 80/443  │    │   Port: 3000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Deploy Options

### Option 1: Vercel (Frontend) + Railway (Backend + DB)

**Frontend (Vercel):**

1. Connect your GitHub repo to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Add environment variables:
   - `VITE_API_URL=https://your-api-domain.railway.app/api`

**Backend + Database (Railway):**

1. Create new Railway project
2. Add PostgreSQL service
3. Add Node.js service from GitHub
4. Set start command: `cd api && npm start`
5. Configure environment variables (see below)

### Option 2: DigitalOcean App Platform

1. Create new app from GitHub repo
2. Configure components:
   - **Web Service (Frontend):** Build: `cd client && npm run build`, Serve: `client/dist`
   - **Web Service (Backend):** Build: `cd api && npm run build`, Run: `cd api && npm start`
   - **Database:** PostgreSQL managed database

### Option 3: AWS (ECS + RDS)

1. **Frontend:** Deploy to S3 + CloudFront
2. **Backend:** ECS with Fargate
3. **Database:** RDS PostgreSQL

## 🔧 Environment Variables

### Backend (.env)

```bash
# Production Environment
NODE_ENV=production

# Server
PORT=3000
HOST=0.0.0.0

# Database (from your provider)
DATABASE_URL="postgresql://user:pass@host:5432/dbname?schema=public"

# JWT - GENERATE SECURE KEYS!
JWT_SECRET=your-super-secure-64-character-jwt-secret-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secure-64-character-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# CORS
CORS_ORIGIN=https://your-frontend-domain.com

# Email (Production SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Encryption
BCRYPT_ROUNDS=12

# Logging
LOG_LEVEL=warn
LOG_FILE=logs/app.log
```

### Frontend (.env)

```bash
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=Lifeline Health & Wellness
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🔐 Security Checklist

### Backend Security

- [ ] Generate secure JWT secrets (64+ characters)
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers (Helmet)
- [ ] Use environment variables for secrets
- [ ] Enable database SSL
- [ ] Set up monitoring and logging
- [ ] Configure proper firewall rules

### Frontend Security

- [ ] Enable HTTPS
- [ ] Configure CSP headers
- [ ] Minimize bundle size
- [ ] Use environment variables for API URLs
- [ ] Enable error monitoring (Sentry)

## 📊 Monitoring & Logging

### Recommended Services

- **Error Monitoring:** Sentry
- **Application Monitoring:** New Relic / DataDog
- **Uptime Monitoring:** Pingdom / UptimeRobot
- **Log Management:** LogRocket / Papertrail

### Health Checks

The API includes health check endpoints:

- `GET /health` - Service health
- `GET /api/health/database` - Database connectivity

## 🗄️ Database

### Migration Strategy

1. **Development to Staging:**

   ```bash
   npm run migrate
   ```

2. **Staging to Production:**
   ```bash
   # Always backup first!
   pg_dump $DATABASE_URL > backup.sql
   npm run migrate
   ```

### Backup Strategy

```bash
# Daily backups
pg_dump $DATABASE_URL | gzip > backup-$(date +%Y%m%d).sql.gz

# Weekly full backup
pg_dump $DATABASE_URL > weekly-backup-$(date +%Y%m%d).sql
```

## 🚀 Deployment Scripts

### GitHub Actions Workflow

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd client && npm ci && npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd api && npm ci && npm run build
      # Deploy to your backend service
```

### Manual Deployment

```bash
# Build backend
cd api
npm run build

# Build frontend
cd ../client
npm run build

# Deploy backend (example for Railway)
railway up

# Deploy frontend (example for Vercel)
vercel --prod
```

## 🔧 Performance Optimization

### Backend

- Enable gzip compression
- Use database connection pooling
- Implement caching (Redis)
- Optimize database queries
- Use CDN for static files

### Frontend

- Enable code splitting
- Optimize images
- Use lazy loading
- Enable service worker (PWA)
- Minimize bundle size

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database server is running
   - Check firewall rules

2. **CORS Errors**
   - Verify CORS_ORIGIN matches frontend URL
   - Check protocol (http vs https)

3. **JWT Errors**
   - Ensure JWT secrets are set
   - Check token expiration
   - Verify token format

4. **File Upload Issues**
   - Check upload directory permissions
   - Verify MAX_FILE_SIZE setting
   - Check disk space

### Debugging Commands

```bash
# Check logs
tail -f api/logs/app.log

# Test database connection
cd api && npm run studio

# Check environment variables
cd api && node -e "require('dotenv').config(); console.log(process.env)"

# Test API health
curl https://your-api-domain.com/health
```

## 📞 Support

For deployment issues:

1. Check the logs first
2. Verify environment variables
3. Test database connectivity
4. Check service status
5. Contact the development team

Remember to always test in a staging environment before deploying to production!
