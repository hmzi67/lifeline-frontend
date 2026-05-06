# Docker Setup for Lifeline Application

This guide explains how to deploy the Lifeline application using Docker.

## 🚀 Quick Start

### 1. Prerequisites
- Docker installed on your VPS
- Docker Compose installed
- Ports 3000, 5173, 5174, and 5432 available

### 2. Build and Start Services

```bash
# Clone the repository (if not already done)
git clone https://github.com/your-repo/lifeline-frontend.git
cd lifeline-frontend

# Build and start all services
docker-compose up -d --build
```

### 3. Access Services
- **Client**: `http://localhost:5173`
- **Admin**: `http://localhost:5174`
- **API**: `http://localhost:3000`
- **PostgreSQL**: `localhost:5432`

## 📁 Project Structure

```
lifeline-frontend/
├── api/                  # Node.js API service
│   ├── Dockerfile        # API Dockerfile
│   └── ...
├── client/               # React client application
│   ├── Dockerfile        # Client Dockerfile
│   └── ...
├── admin/                # React admin panel
│   ├── Dockerfile        # Admin Dockerfile
│   └── ...
├── docker-compose.yml    # Docker Compose configuration
└── .dockerignore         # Files to ignore in Docker builds
```

## 🐳 Services

### PostgreSQL
- **Image**: `postgres:15-alpine`
- **Port**: 5432
- **Database**: lifeline
- **User**: postgres
- **Password**: root
- **Volume**: postgres_data (persistent storage)

### API Service
- **Build**: Node.js 18
- **Port**: 3000
- **Environment**: All API environment variables
- **Volumes**: 
  - `./api/uploads` for file uploads
  - `./api/logs` for application logs
- **Depends on**: PostgreSQL

### Client Service
- **Build**: Vite + Nginx
- **Port**: 5173
- **Environment**: `VITE_API_URL=http://api:3000/api/`
- **Nginx**: Serves static files with SPA routing

### Admin Service
- **Build**: Vite + Nginx
- **Port**: 5174
- **Environment**: `VITE_API_URL=http://api:3000/api/`
- **Nginx**: Serves static files with SPA routing

## 🔧 Configuration

### Environment Variables

The `docker-compose.yml` file contains all necessary environment variables. For production, you should:

1. Create a `.env.production` file
2. Update sensitive credentials
3. Reference it in your deployment

### Custom Domains

To use custom domains, update the `nginx.conf` files in both `client/` and `admin/` directories:

```nginx
server {
    listen 80;
    server_name yourdomain.com;  # Change this
    # ... rest of config
}
```

## 🛠️ Common Commands

### Build and start services
```bash
docker-compose up -d --build
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### View specific service logs
```bash
docker-compose logs -f api
```

### Rebuild specific service
```bash
docker-compose build api
docker-compose up -d api
```

### Run database migrations
```bash
docker-compose exec api npm run migrate
```

### Access PostgreSQL
```bash
docker-compose exec postgres psql -U postgres -d lifeline
```

## 📦 Deployment Checklist

- [ ] Install Docker and Docker Compose on VPS
- [ ] Clone repository
- [ ] Update environment variables in docker-compose.yml
- [ ] Build and start services
- [ ] Run database migrations
- [ ] Set up reverse proxy (Nginx/Apache) for domains
- [ ] Configure SSL certificates
- [ ] Test all services

## 🔒 Security Notes

1. **Database Credentials**: Change the default PostgreSQL password
2. **API Secrets**: Update JWT secrets, Stripe keys, etc.
3. **CORS**: Update CORS origins for production domains
4. **SSL**: Use HTTPS in production with reverse proxy

## 🚀 Production Deployment

For production deployment:

1. **Use a reverse proxy** (Nginx, Traefik) for SSL termination
2. **Set up proper domains** and DNS records
3. **Configure HTTPS** with Let's Encrypt
4. **Monitor services** with Docker logging and monitoring tools

## 📝 Notes

- The client and admin services use Nginx to serve static files
- API service connects to PostgreSQL using Docker internal networking
- All services are on the same `lifeline_network` for internal communication
- PostgreSQL data is persisted using Docker volumes