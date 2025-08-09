// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

// 3rd-party plugin
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// user defined plugin
import { remarkModifiedTime } from './src/scripts/remark-modified-time.mjs';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  integrations: [icon(), expressiveCode({
    plugins: [
      pluginLineNumbers(),
    ],
    styleOverrides: {
      frames: {
        shadowColor: '#FFF',
      },
    },
  }), mdx()],

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