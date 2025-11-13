# Fokal Static Marketing Site

Beautiful static HTML marketing site for Fokal - AI Brand Intelligence platform.

## Overview

This is a standalone static site featuring:
- Modern glassmorphism design
- Mobile-responsive layouts
- DM Sans typography
- Dark theme with proper contrast
- Zero JavaScript dependencies (except for FAQ accordion)

## Pages

### Marketing Pages
- `/` - Homepage with hero, mission, features, pricing, FAQ
- `/about` - About page with team and company info
- `/features` - Features overview
- `/pricing` - Pricing plans
- `/blog` - Blog listing
- `/companies` - Company directory

### Legal Pages
- `/privacy-policy` - Privacy policy (Australian Privacy Act compliant)
- `/terms-and-conditions` - Terms hub page
- `/terms-of-use` - Website terms of use
- `/customer-agreement` - Customer subscription agreement

### Company Profiles
- `/companies/stake/` - Stake company profile
- `/companies/superhero/` - Superhero company profile

## Deployment

### Render

This site is configured for Render static site deployment:

1. Create new Static Site on Render
2. Connect to this GitHub repository
3. Render will automatically use `render.yaml` configuration
4. Set custom domain to `fokal.com`

The `render.yaml` file includes:
- Static site configuration
- Security headers
- Clean URL rewrites (no .html extensions)

### Alternative: Netlify

Can also deploy to Netlify:
1. Connect repository to Netlify
2. Build command: (none needed)
3. Publish directory: `./`
4. The `_redirects` file handles clean URLs

## Local Development

Serve the site locally:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Design System

### Colors
- Background Dark: `#0E0E10`
- Card Background: `rgba(17, 24, 32, 0.8)`
- Card Border: `rgba(255, 255, 255, 0.06)`
- Text Primary: `#E5E9F0`
- Text Secondary: `#C6CDD8`
- Accent Blue: `#4AC0FF`

### Typography
- Font: DM Sans (Google Fonts)
- Weights: 400, 500, 600, 700, 800

### Effects
- Glassmorphism: `backdrop-filter: blur(20px)`
- Smooth transitions
- Hover animations
- Gradient buttons

## File Structure

```
fokal-static-site/
├── index.html                    # Homepage
├── about.html                    # About page
├── features.html                 # Features page
├── pricing.html                  # Pricing page
├── blog.html                     # Blog listing
├── companies.html                # Companies directory
├── privacy-policy.html           # Privacy policy
├── terms-and-conditions.html     # Terms hub
├── terms-of-use.html             # Website terms
├── customer-agreement.html       # Customer agreement
├── companies/                    # Company profiles
│   ├── stake/
│   │   └── index.html
│   └── superhero/
│       └── index.html
├── *.svg                         # Logo and icon files
├── *.png                         # Image assets
├── render.yaml                   # Render deployment config
├── _redirects                    # Netlify redirect rules
└── README.md                     # This file
```

## Assets

All logos and images are included:
- `fokal-wordmark-icon.svg` - Main logo
- `favicon.png` - Site favicon
- Gap visualization images
- Company logos

## Updates

To update content:
1. Edit HTML files directly
2. Commit and push to GitHub
3. Render/Netlify auto-deploys

## Connection to React App

This static site serves public marketing pages.

The main React application (dashboard, auth, features) runs separately at:
- Repository: `snoopify-insights-22`
- Deployed on: Lovable
- Domain: TBD (could be `app.fokal.com`)

## Notes

- All pages are self-contained HTML (no build step needed)
- CSS is inline in `<style>` tags for simplicity
- FAQ accordion uses vanilla JavaScript
- Google Sign-In buttons now redirect to `app.fokal.com`
- Backend API: `backend.fokal.com`
- Auth handled by React app at `app.fokal.com`

## License

Proprietary - Altair Innovations Pty Ltd © 2025
