import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

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
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
});
