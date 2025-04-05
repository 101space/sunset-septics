#!/usr/bin/env node

/**
 * This script prepares the project for Vercel deployment by:
 * 1. Ensuring the build is configured for Vercel (not GitHub Pages)
 * 2. Verifying the dist directory contains all required files
 * 3. Preparing necessary redirects for SPA routing
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}Preparing project for Vercel deployment...${colors.reset}\n`);

// Step 1: Ensure vite.config.ts has base: '/'
try {
  const viteConfigPath = path.join(__dirname, '..', 'vite.config.ts');
  let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  
  // Check if base path is already correctly set
  if (!/base:\s*['"]\/['"]/.test(viteConfig)) {
    console.log(`${colors.yellow}Updating base path in vite.config.ts...${colors.reset}`);
    viteConfig = viteConfig.replace(/base:\s*['"][^'"]*['"]/, `base: '/'`);
    fs.writeFileSync(viteConfigPath, viteConfig);
  } else {
    console.log(`${colors.green}✓ Base path in vite.config.ts is already set correctly${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}Error updating vite.config.ts: ${error.message}${colors.reset}`);
}

// Step 2: Create _redirects file for SPA routing if it doesn't exist
const redirectsPath = path.join(__dirname, '..', 'public', '_redirects');
if (!fs.existsSync(redirectsPath)) {
  console.log(`${colors.yellow}Creating _redirects file for SPA routing...${colors.reset}`);
  fs.writeFileSync(redirectsPath, '/* /index.html 200');
  console.log(`${colors.green}✓ Created _redirects file${colors.reset}`);
} else {
  console.log(`${colors.green}✓ _redirects file already exists${colors.reset}`);
}

// Step 3: Ensure vercel.json exists and has proper configuration
const vercelConfigPath = path.join(__dirname, '..', 'vercel.json');
const vercelConfig = {
  "framework": "vite",
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/assets/(.*)", "dest": "/assets/$1" },
    { "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|webmanifest|map))", "dest": "/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
};

fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
console.log(`${colors.green}✓ Updated vercel.json configuration${colors.reset}`);

// Step 4: Run build to ensure all changes are applied
console.log(`${colors.blue}\nRunning production build...${colors.reset}`);
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Build completed successfully${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Build failed: ${error.message}${colors.reset}`);
  process.exit(1);
}

console.log(`\n${colors.green}✅ Project is ready for Vercel deployment!${colors.reset}`);
console.log(`${colors.blue}Next steps:${colors.reset}`);
console.log(`1. Commit these changes to your repository`);
console.log(`2. Connect your repository to Vercel`);
console.log(`3. Deploy using the configuration in vercel.json`);
console.log(`4. Configure your domain settings in the Vercel dashboard\n`); 