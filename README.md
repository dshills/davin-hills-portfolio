# Davin Hills Portfolio

Personal portfolio site built with React + Vite.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel (Recommended)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repo
5. Vercel auto-detects Vite — just click Deploy
6. Done! You'll get a URL like `your-project.vercel.app`

### Add Custom Domain (Optional)
In Vercel dashboard → Settings → Domains → Add your domain

## Deploy to Netlify (Alternative)

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "Add new site" → "Import from Git"
4. Select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click Deploy

## Project Structure

```
portfolio-site/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx        # React entry point
│   └── Portfolio.jsx   # Main portfolio component
├── index.html          # HTML template
├── package.json
├── vite.config.js
└── README.md
```
