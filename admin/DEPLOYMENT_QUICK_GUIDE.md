# Quick Deployment Reference

## 🎯 One-Time Setup

### 1. Update .env file
```bash
cd admin
nano .env
# Change: VITE_API_URL=https://api.yourdomain.com/api
```

### 2. Build the project
```bash
cd admin
npm install
npm run build
```

### 3. CloudPanel - Create Site
- Domain: `admin.yourdomain.com`
- Type: Static HTML
- Root: `/home/user/htdocs/admin.yourdomain.com`

### 4. DNS Configuration
Add A Record:
- Host: `admin`
- Type: A
- Value: `[Your VPS IP]`

### 5. Upload Files
```bash
# Option 1: rsync
rsync -avz dist/ user@vps-ip:/home/user/htdocs/admin.yourdomain.com/

# Option 2: scp
scp -r dist/* user@vps-ip:/home/user/htdocs/admin.yourdomain.com/

# Option 3: Use FileZilla/Cyberduck (GUI)
```

### 6. NGINX Configuration
Add to CloudPanel → Sites → Vhost:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 7. SSL Certificate
CloudPanel → Sites → SSL/TLS → Let's Encrypt → Create

---

## 🔄 Future Updates (Quick)

```bash
cd admin
git pull
npm install
npm run build
rsync -avz dist/ user@vps-ip:/home/user/htdocs/admin.yourdomain.com/
```

---

## ✅ Quick Test

1. Visit: `https://admin.yourdomain.com`
2. Check browser console (F12)
3. Test login
4. Verify API calls work

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| 404 on refresh | Add NGINX `try_files` rule |
| CORS error | Check API CORS settings |
| API not connecting | Verify VITE_API_URL in .env |
| CSS not loading | Check file permissions: `chmod -R 755` |

---

## 📂 Directory Structure on VPS

```
/home/user/htdocs/admin.yourdomain.com/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [other static files]
```

---

## 🔐 NGINX Full Example

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name admin.yourdomain.com;
    
    # SSL configuration (added by Let's Encrypt)
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /home/user/htdocs/admin.yourdomain.com;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

---

## 📋 Pre-Deployment Checklist

- [ ] `.env` updated with production API URL
- [ ] `npm install` completed
- [ ] `npm run build` successful
- [ ] DNS A record created
- [ ] Site created in CloudPanel
- [ ] Files uploaded to VPS
- [ ] NGINX configured with SPA routing
- [ ] SSL certificate installed
- [ ] API CORS includes admin subdomain
- [ ] Tested on browser

---

## 📞 Important Files

- **Main client**: `/client` → `www.yourdomain.com`
- **Admin panel**: `/admin` → `admin.yourdomain.com`
- **API**: `/api` → `api.yourdomain.com`

All three are separate deployments!
