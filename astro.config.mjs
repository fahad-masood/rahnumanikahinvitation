import { defineConfig } from 'astro/config';

// Static hosts supply their production origin during the build. No host is guessed.
const deploymentUrl = process.env.SITE_URL
  || process.env.URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export default defineConfig({
  site: deploymentUrl,
  output: 'static',
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
