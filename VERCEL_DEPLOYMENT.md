# Vercel Deployment Guide for Sunset Septics Site

This document outlines the steps and configuration needed to deploy the Sunset Septics site to Vercel.

## Pre-deployment Checklist

- [x] Build command configured as `npm install && npm run build`
- [x] Output directory set as `dist`
- [x] SPA routing configured with proper redirects
- [x] PWA assets and manifest included
- [x] Three.js models properly included in the build

## Deployment Steps

1. **Create a Vercel Account**
   - Sign up at https://vercel.com/ if you don't already have an account

2. **Connect Your Repository**
   - Connect your GitHub/GitLab/Bitbucket repository to Vercel
   - Select the repository containing the Sunset Septics site

3. **Configure Deployment Settings**
   - Framework Preset: Vite
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist` 
   - Environment Variables: None required for basic deployment

4. **Domain Configuration**
   - After initial deployment, go to "Domains" in the Vercel dashboard
   - Add your custom domain: `sunsetseptics.ca`
   - Follow Vercel's instructions to verify domain ownership
   - Configure DNS settings as instructed by Vercel

5. **Verify Deployment**
   - Check that all routes work properly
   - Verify that the 3D model loads correctly
   - Test navigation and gallery functionality
   - Validate PWA functionality (if intended for use as a PWA)

## Troubleshooting

- If you encounter 404 errors on route navigation, ensure the routes configuration in `vercel.json` is correct
- If static assets don't load, check the path references in your code and make sure they use the correct base path
- For large model loading issues, ensure the Three.js model chunks are properly configured in the build

## Maintenance

- Updates can be deployed automatically by pushing to your main branch
- Test major changes locally before pushing to production
- Monitor performance in the Vercel dashboard 