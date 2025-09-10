# 🚀 NoDaysIdle Blog - Deployment Guide

This guide covers deploying the NoDaysIdle Blog to Netlify with full CI/CD, PocketBase backend, and admin dashboard.

## 📋 Prerequisites

- Node.js 20+ installed
- Git repository set up
- Netlify account
- PocketBase instance (optional, can use included setup)

## 🛠️ Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up PocketBase (Backend)

#### Option A: Use Local PocketBase (Development)
```bash
# Start PocketBase server
./pocketbase serve --dir pb_data

# In another terminal, set up the database
node setup-pocketbase.js

# Import blog content
node import-content.js
```

#### Option B: Deploy PocketBase to Netlify
```bash
# Create a new Netlify site for PocketBase
# Follow PocketBase deployment docs for Netlify
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
POCKETBASE_URL=http://127.0.0.1:8090
SITE_URL=https://your-site.netlify.app
```

## 🌐 Netlify Deployment

### Method 1: Using the Deployment Script

```bash
# Make sure you're logged in to Netlify CLI
netlify login

# Run the deployment script
./deploy.sh
```

### Method 2: Manual Netlify Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   ```bash
   npx netlify-cli deploy --prod --dir=dist
   ```

3. **Set up continuous deployment:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Connect your GitHub repository
   - Set build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
     - **Node version:** `20`

### Method 3: Drag & Drop (Simple)

1. Build the project: `npm run build`
2. Go to [Netlify.com](https://netlify.com)
3. Drag the entire `dist` folder to the deployment area

## ⚙️ Configuration

### Netlify Environment Variables

In your Netlify dashboard, add these environment variables:

```
POCKETBASE_URL=https://your-pocketbase-instance.netlify.app
NODE_VERSION=20
```

### Custom Domain Setup

1. Go to **Site settings > Domain management**
2. Add your custom domain
3. Configure DNS records as instructed

## 🔐 Admin Dashboard Setup

### First-Time Setup

1. **Access the admin dashboard:**
   ```
   https://your-site.netlify.app/admin
   ```

2. **Default credentials:**
   - Email: `admin@nodaysidle.com`
   - Password: `admin123`

3. **Change the default password immediately!**

### Admin Features

- ✅ Create, edit, and delete blog posts
- ✅ Multi-language content management
- ✅ Publishing workflow (draft → published → scheduled)
- ✅ SEO metadata management
- ✅ User management
- ✅ Site settings

## 📊 PocketBase Backend

### Database Schema

The blog uses these PocketBase collections:

- **blog_posts**: Main content collection
- **admin_users**: Admin user management
- **settings**: Site configuration

### API Endpoints

- `GET /api/collections/blog_posts/records` - Get published posts
- `POST /api/collections/blog_posts/records` - Create post (admin only)
- `PATCH /api/collections/blog_posts/records/:id` - Update post (admin only)

## 🔍 SEO & Performance

### Automatic Features

- ✅ Sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt configuration
- ✅ Structured data (JSON-LD)
- ✅ Meta tags for social sharing
- ✅ Language alternates (hreflang)
- ✅ Open Graph and Twitter Cards

### Performance Optimizations

- ✅ Static site generation
- ✅ Image optimization
- ✅ CSS minification
- ✅ JavaScript bundling
- ✅ CDN delivery via Netlify

## 🌍 Multi-Language Support

### Supported Languages

- 🇺🇸 English (`en`)
- 🇮🇹 Italian (`it`)
- 🇸🇮 Slovenian (`sl`)

### URL Structure

```
/                    # Homepage (detects language)
/?lang=en            # English homepage
/?lang=it            # Italian homepage
/blog/post-slug?lang=en  # English blog post
```

## 🔧 Troubleshooting

### Common Issues

1. **Build fails:**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules dist
   npm install
   npm run build
   ```

2. **PocketBase connection issues:**
   - Check `POCKETBASE_URL` environment variable
   - Ensure PocketBase server is running
   - Verify CORS settings in PocketBase

3. **Admin login not working:**
   - Check browser console for errors
   - Verify PocketBase admin user exists
   - Clear browser cache and cookies

4. **Language switching not working:**
   - Check URL parameters
   - Verify blog posts exist in all languages
   - Check browser network tab for failed requests

### Logs and Debugging

```bash
# View build logs in Netlify dashboard
# Check browser developer tools
# Use Netlify CLI for local debugging
netlify dev
```

## 🚀 Production Checklist

- [ ] Custom domain configured
- [ ] HTTPS enabled (automatic on Netlify)
- [ ] Environment variables set
- [ ] Admin password changed
- [ ] SEO meta tags verified
- [ ] Social media sharing tested
- [ ] Mobile responsiveness confirmed
- [ ] Performance tested (Lighthouse)
- [ ] Backup strategy in place

## 📞 Support

For issues or questions:

1. Check the [Astro documentation](https://docs.astro.build)
2. Review [PocketBase docs](https://pocketbase.io/docs)
3. Check [Netlify documentation](https://docs.netlify.com)
4. Open an issue in the project repository

## 🎯 Success Metrics

Monitor these after deployment:

- Page load speed (< 3 seconds)
- SEO performance (search rankings)
- User engagement (time on page)
- Admin dashboard usage
- Error rates and uptime

---

**🎉 Your NoDaysIdle Blog is now ready for the world!**