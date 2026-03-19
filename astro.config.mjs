import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://elkulo.github.io',
  base: '/elkulo.github.io',
  integrations: [
    react(),
    sitemap(),
    mdx({
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // SCSS グローバル設定
        },
      },
    },
  },
})
