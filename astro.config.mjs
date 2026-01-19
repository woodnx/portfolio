// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

// 3rd-party plugin
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import remarkLinkCard from 'remark-link-card';
import { remarkAlert } from 'remark-github-blockquote-alert';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// user defined plugin
import { remarkModifiedTime } from './src/scripts/remark-modified-time.mjs';

import mdx from '@astrojs/mdx';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    icon(), 
    expressiveCode({
      plugins: [
        pluginLineNumbers(),
      ],
      styleOverrides: {
        frames: {
          shadowColor: '#FFF',
        },
      },
    }), 
    mdx({
      remarkPlugins: [
        remarkLinkCard,
        remarkAlert,
        remarkMath,
      ],
      rehypePlugins: [rehypeKatex],
    }), 
    vue(),
  ],

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