import rss from '@astrojs/rss'
import { fetchPosts } from '@/lib/api'

export async function GET(context) {
  const { posts } = await fetchPosts()
  const base =
    context.site?.href || 'https://elkulo.github.io/'

  return rss({
    title: 'el.kulo',
    description: 'ポートフォリオ',
    site: base,
    items: posts.map(post => ({
      title: post.title || 'No title',
      pubDate: new Date(post.date.replace(/\./g, '-')),
      description: post.content || '',
      link: `${base}product/${post.fields.post_slug}`,
    })),
  })
}
