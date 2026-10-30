import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://denglinzhe.com',
  output: 'static',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true }
  }
});
