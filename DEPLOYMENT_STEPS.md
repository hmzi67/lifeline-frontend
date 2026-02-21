# Admin Panel Deployment Steps

## On Your Mac (Local Machine)

### 1. Build All Projects
```bash
cd /Users/Projects/Code\ HUnts/LifeLine/lifeline-frontend

# Build API
cd api && npm run build && cd ..

# Build Client
cd client && npm run build && cd ..

# Build Admin
cd admin && npm run build && cd ..
```

### 2. Upload to VPS
```bash
cd /Users/Projects/Code\ HUnts/LifeLine/lifeline-frontend

# Upload everything (or use git pull on VPS)
rsync -avz --progress --exclude 'node_modules' --exclude '.git' \
  ./ root@srv916341.jcloud-ver-jpc.ik-server.com:/home/makelifeline/htdocs/www.makelifeline.com/
```

---

## On VPS (SSH into server)

### 3. Update NGINX Configuration
```bash
# Create NGINX config for admin
nano /etc/nginx/sites-available/admin-panel.makelifeline.com
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name admin-panel.makelifeline.com;
    
    location / {
        proxy_pass http://localhost:5174;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. Enable Site & Reload NGINX
```bash
# Enable the site
ln -s /etc/nginx/sites-available/admin-panel.makelifeline.com /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Reload NGINX
systemctl reload nginx
```

### 5. Setup SSL Certificate
```bash
certbot --nginx -d admin-panel.makelifeline.com
```

### 6. Update DNS
Go to your domain registrar and add:
- **Type**: A Record
- **Host**: admin-panel
- **Value**: Your VPS IP
- **TTL**: Automatic

### 7. Restart PM2 Apps
```bash
cd /home/makelifeline/htdocs/www.makelifeline.com

# Stop all apps
pm2 stop all

# Delete old processes
pm2 delete all

# Start with new config
pm2 start ecosystem.config.cjs

# Save PM2 config
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 8. Check Status
```bash
# Check PM2 apps
pm2 status

# Check logs
pm2 logs lifeline-admin

# Check if ports are listening
netstat -tlnp | grep -E '5000|5173|5174'
```

---

## Verify Deployment

1. **API**: https://api.makelifeline.com (or your API endpoint)
2. **Client**: https://www.makelifeline.com
3. **Admin**: https://admin-panel.makelifeline.com

---

## Update CORS on API

Make sure your API `.env` includes:
```env
CORS_ORIGIN=https://www.makelifeline.com,https://admin-panel.makelifeline.com
```

Then restart API:
```bash
pm2 restart lifeline-api
```

---

## Troubleshooting

### Admin not loading?
```bash
# Check PM2 status
pm2 status

# Check admin logs
pm2 logs lifeline-admin --lines 50

# Restart admin
pm2 restart lifeline-admin
```

### NGINX errors?
```bash
# Check NGINX status
systemctl status nginx

# Check error logs
tail -f /var/log/nginx/error.log

# Test config
nginx -t
```

### SSL issues?
```bash
# Renew certificate
certbot renew

# Force renew
certbot renew --force-renewal
```
