# Lifeline Admin Panel - Deployment Guide

## Overview
This is a standalone admin panel application, separated from the main client app for deployment on `admin.yourdomain.com` subdomain.

## 📁 Project Structure
```
/admin
├── src/
│   ├── components/admin/   # Admin components
│   ├── hooks/              # Shared hooks
│   ├── lib/                # Utilities
│   ├── services/           # API services
│   ├── store/              # State management
│   ├── config/             # Configuration
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
├── vite.config.ts
└── .env
```

## 🚀 Step-by-Step Deployment on Hostinger VPS with CloudPanel

### Step 1: Update Environment Variables
1. Edit `/admin/.env` file
2. Update `VITE_API_URL` with your actual API URL:
   ```env
   VITE_API_URL=https://api.yourdomain.com/api
   ```

### Step 2: Install Dependencies & Build
```bash
cd /Users/Projects/Code\ HUnts/LifeLine/lifeline-frontend/admin
npm install
npm run build
```
This creates a `dist` folder with production-ready files.

### Step 3: Prepare for VPS Upload
The `dist` folder contains:
- `index.html` (entry point)
- `assets/` (JS, CSS, images)
- All compiled production files

### Step 4: CloudPanel Setup on Hostinger VPS

#### A. Access CloudPanel
1. Log into your Hostinger VPS
2. Open CloudPanel (usually at `https://your-vps-ip:8443`)
3. Login with your credentials

#### B. Create New Site
1. In CloudPanel Dashboard → **Sites** → **Add Site**
2. Fill in details:
   - **Domain Name**: `admin.yourdomain.com`
   - **Site Type**: Static HTML or Node.js (choose Static HTML for built files)
   - **PHP Version**: Not needed (it's a React app)
3. Click **Create**

#### C. Configure DNS Records
1. Go to your domain registrar (e.g., Namecheap, GoDaddy)
2. Add an A record:
   - **Host**: `admin`
   - **Type**: A
   - **Value**: Your VPS IP address
   - **TTL**: Automatic or 300
3. Wait for DNS propagation (5-30 minutes)

#### D. Upload Files to VPS
Option 1 - Using SFTP (Recommended):
1. Use FileZilla or Cyberduck
2. Connect to your VPS:
   - Host: Your VPS IP
   - Username: CloudPanel user
   - Port: 22
   - Protocol: SFTP
3. Navigate to: `/home/[cloudpanel-user]/htdocs/admin.yourdomain.com/`
4. Upload ALL contents from `dist/` folder (not the folder itself)

Option 2 - Using Terminal/SSH:
```bash
# From your local machine
scp -r dist/* user@your-vps-ip:/home/[cloudpanel-user]/htdocs/admin.yourdomain.com/

# Or use rsync
rsync -avz dist/ user@your-vps-ip:/home/[cloudpanel-user]/htdocs/admin.yourdomain.com/
```

#### E. Configure Web Server (Important!)
Since this is a Single Page Application (SPA), you need to configure URL rewrites.

**For NGINX (CloudPanel default):**
1. In CloudPanel → Sites → Click your admin site
2. Go to **Vhost** tab
3. Add this configuration inside the `server` block:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Complete example:
```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    root /home/[user]/htdocs/admin.yourdomain.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. Save and reload NGINX:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### F. Setup SSL Certificate (HTTPS)
1. In CloudPanel → Sites → Your admin site
2. Click **SSL/TLS** tab
3. Select **Let's Encrypt**
4. Click **Create Certificate**
5. Wait for certificate generation (1-2 minutes)
6. Enable **Force HTTPS** option

### Step 5: Update Backend API Configuration

Your backend already has the admin subdomain added to CORS. Verify your API `.env` file:

```env
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,https://www.makelifeline.com,https://makelifeline.com,https://admin.makelifeline.com
```

### Step 6: Test Your Deployment

1. Visit `https://admin.yourdomain.com`
2. Check browser console for any errors
3. Test API connectivity
4. Verify login functionality
5. Check all admin features

## 🔄 Future Updates

When you make changes to the admin panel:

```bash
# 1. Navigate to admin folder
cd /Users/Projects/Code\ HUnts/LifeLine/lifeline-frontend/admin

# 2. Pull latest changes
git pull

# 3. Install any new dependencies
npm install

# 4. Build
npm run build

# 5. Upload to VPS (replace with your details)
rsync -avz dist/ user@your-vps-ip:/home/[cloudpanel-user]/htdocs/admin.yourdomain.com/
```

## 📋 Deployment Checklist

- [ ] Update `.env` with production API URL
- [ ] Run `npm install` in admin folder
- [ ] Run `npm run build` successfully
- [ ] Create DNS A record for admin subdomain
- [ ] Create site in CloudPanel
- [ ] Upload dist files via SFTP/SSH
- [ ] Configure NGINX with SPA routing
- [ ] Install SSL certificate
- [ ] Verify CORS settings in API
- [ ] Test admin panel functionality
- [ ] Test API calls from admin panel

## 🛠 Troubleshooting

### Issue: "404 Not Found" on page refresh
**Solution**: Ensure NGINX has `try_files $uri $uri/ /index.html;` configured

### Issue: "CORS Error" in browser console
**Solution**: 
1. Check API CORS middleware includes `https://admin.yourdomain.com`
2. Restart your API server after changes

### Issue: "Can't connect to API"
**Solution**: 
1. Verify `VITE_API_URL` in `.env` is correct
2. Rebuild the app after changing `.env`
3. Ensure API server is running and accessible

### Issue: CSS/JS files not loading
**Solution**: 
1. Check file permissions: `chmod -R 755 /home/[user]/htdocs/admin.yourdomain.com/`
2. Verify all files uploaded correctly from dist folder

## 📊 Performance Optimization

For production:
1. Enable gzip compression in NGINX (shown above)
2. Configure browser caching
3. Use CDN for static assets (optional)
4. Monitor with tools like Google Lighthouse

## 🔒 Security Notes

1. **Restrict Admin Access**: Consider IP whitelisting for admin panel
2. **Authentication**: Ensure strong authentication on backend
3. **HTTPS Only**: Always use SSL certificate
4. **Regular Updates**: Keep dependencies updated

## 📞 Support

- API Backend: Update CORS in `/api/src/middleware/cors.ts`
- Admin Frontend: `/admin` folder
- Client Frontend: `/client` folder (separate deployment)

---

**Note**: Replace `yourdomain.com` with your actual domain throughout this guide.
