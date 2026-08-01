// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";

// 3rd-party plugin
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import remarkLinkCard from "remark-link-card-plus";
import { unified } from "@astrojs/markdown-remark";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import swup from "@swup/astro";
import yaml from "@rollup/plugin-yaml";

// user defined plugin
import { remarkModifiedTime } from "./src/scripts/remark-modified-time.mjs";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
    remotePatterns: [
      { protocol: "http", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  integrations: [
    icon(),
    mdx({
      processor: unified({
        remarkPlugins: [
          remarkLinkCard,
          remarkAlert,
          remarkMath,
          remarkModifiedTime,
        ],
        remarkRehype: {
          footnoteLabel: "脚注",
          footnoteLabelTagName: "h1",
        },
        rehypePlugins: [rehypeKatex],
      }),
    }),
    vue(),
    swup({
      containers: ["main", "aside"],
    }),
  ],

  vite: {
    plugins: [tailwindcss(), yaml()],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkLinkCard,
        remarkAlert,
        remarkMath,
        remarkModifiedTime,
      ],
      remarkRehype: {
        footnoteLabel: "脚注",
        footnoteLabelTagName: "h1",
      },
      rehypePlugins: [rehypeKatex],
    }),
  },
});
