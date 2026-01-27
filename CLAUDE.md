# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev            # Start Vite dev server with hot reload
npm run build          # Fetch data from Medium/GitHub + production build
npm run preview        # Preview production build locally
npm run fetch-data     # Manually refresh all external data
npm run fetch-articles # Manually refresh articles from Medium RSS
npm run fetch-repos    # Manually refresh repos from GitHub API
```

No test or lint commands are configured.

## Architecture

This is a React 18 + Vite 5 portfolio website with a **single-component architecture**. All UI logic, styling, and data live in `src/Portfolio.jsx` (~800 lines).

### Key Patterns

- **CSS-in-JS**: Styles are embedded in a `<style>` tag within Portfolio.jsx using CSS custom properties
- **Data-driven sections**: Content (projects, articles, experience) is defined as hardcoded arrays at the top of Portfolio.jsx and rendered via `.map()`
- **Interactive effects**: Custom cursor orb, smooth scroll navigation, fade-slide-up animations, scroll pulse indicator

### File Overview

- `src/Portfolio.jsx` - Main component containing all UI, styles, and data
- `src/main.jsx` - React entry point (mounts to #root)
- `index.html` - HTML template with SEO meta tags
- `vite.config.js` - Minimal Vite config with React plugin

### Content Data Locations

- `openSourceProjects` - **Dynamic**: Fetched from GitHub API at build time via `scripts/fetch-repos.mjs`, stored in `src/data/repos.json`. Configure featured repos and exclusions in the script.
- `articles` - **Dynamic**: Fetched from Medium RSS at build time via `scripts/fetch-articles.mjs`, stored in `src/data/articles.json`
- `experience` - Hardcoded in Portfolio.jsx, edit to update career history

### Styling

- Color scheme: Dark theme with gold accent (`#d4a853`)
- CSS custom properties defined in `:root` selector
- Responsive breakpoints: 1024px (tablet), 768px (mobile)
- Fonts: Playfair Display (headings), JetBrains Mono (code), Sora (body)

## Deployment

Vercel recommended (auto-detects Vite). Alternative: Netlify with build command `npm run build` and publish directory `dist/`.
