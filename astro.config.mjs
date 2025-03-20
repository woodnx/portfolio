// @ts-check
import { defineConfig } from 'astro/config';

// 3rd-party plugin
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// user defined plugin
import { remarkModifiedTime } from './src/scripts/remark-modified-time.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkPlugins: [remarkModifiedTime],
    remarkRehype: {
      footnoteLabel: '脚注',
      footnoteLabelTagName: 'h1',
    },
  },
});