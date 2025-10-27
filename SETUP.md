# Setup Instructions for Vercel Deployment

## Prerequisites
- Vercel account (free tier works)
- Your assets folder with: pfp.png, Owner.png, crown.png, icon.png, premium.png, song.mp3

## File Structure
```
namics/
├── index.html          (your biolink page)
├── package.json        (dependencies)
├── api/
│   └── views.js        (serverless function)
└── assets/
    ├── pfp.png
    ├── Owner.png
    ├── crown.png
    ├── icon.png
    ├── premium.png
    └── song.mp3
```

## Deployment Steps

### 1. Install Vercel CLI (optional, for local testing)
```bash
npm install -g vercel
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
cd namics
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the project
5. Click "Deploy"

### 3. Set up Upstash Redis (for view counter)

1. Go to your Vercel project dashboard
2. Click on the "Storage" tab
3. Under "Marketplace Database Providers", find **Upstash**
4. Click "Create" next to Upstash
5. Choose "Redis" from the options
6. Follow the setup prompts (free tier available)
7. Vercel will automatically connect and inject the environment variables

**Important:** Upstash environment variables are automatically injected by Vercel. No additional configuration needed!

### 4. Verify Deployment

1. Visit your Vercel URL (e.g., https://namics.vercel.app)
2. The page should load with your profile
3. View counter should increment on each visit
4. Music should auto-play (or play on first click)

## Troubleshooting

### Views not incrementing?
- Check that Upstash Redis is created and linked to your project
- Go to Vercel dashboard → Settings → Environment Variables
- Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are present
- Check the Vercel logs in the dashboard
- Verify the API endpoint is accessible at: `https://your-domain.vercel.app/api/views`

### Music not playing?
- Browsers block autoplay by default - click anywhere on the page
- Ensure `song.mp3` is in the `assets/` folder
- Check browser console for errors

### Assets not loading?
- Ensure all files are in the `assets/` folder
- File names are case-sensitive on Vercel
- Check the browser console for 404 errors

## Local Development

To test locally:
```bash
cd namics
vercel dev
```

This will:
- Run the serverless functions locally
- Serve the index.html
- Connect to your Upstash Redis (if configured)

Open http://localhost:3000 to test!

## Free Tier Limits

**Vercel Free Tier:**
- Unlimited deployments
- 100GB bandwidth/month

**Upstash Redis Free Tier:**
- 10,000 commands/day
- 256MB storage
- Global replication

This is more than enough for a personal biolink page!
