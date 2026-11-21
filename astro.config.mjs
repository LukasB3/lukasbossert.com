import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Pages that stay out of the sitemap: the 404, and the legal pages, which are noindex (Base.astro).
// Keep in step with routes.legal and routes.privacy in src/i18n.ts.
const unlisted = ['/404', '/legal', '/privacy', '/de/impressum', '/de/datenschutz'];

export default defineConfig({
  site: 'https://lukasbossert.com',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'never',
  },
  // Never inline small scripts either; the CSP allows only external ones.
  vite: { build: { assetsInlineLimit: 0 } },
  // Static site; only src/pages/api/chat.ts opts into on-demand rendering.
  adapter: vercel({ maxDuration: 30 }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de' } },
      filter: (page) => !unlisted.includes(new URL(page).pathname.replace(/\/$/, '')),
    }),
  ],
});
