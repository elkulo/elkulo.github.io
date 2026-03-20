import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import { fileURLToPath, pathToFileURL } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Vite 7 + Sass modern API: @/ → src/ のカスタムインポーター
const sassAliasImporter = {
  findFileUrl(url) {
    if (!url.startsWith('@/')) return null
    return pathToFileURL(path.resolve(__dirname, 'src', url.slice(2)))
  },
}

export default defineConfig({
  site: 'https://elkulo.github.io',
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
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      modules: {
        // Gatsby の webpack と同様に kebab-case → camelCase 変換を有効化
        // 例: .split-layout → styles.splitLayout
        localsConvention: 'camelCase',
      },
      preprocessorOptions: {
        scss: {
          importers: [sassAliasImporter],
        },
      },
    },
  },
})
