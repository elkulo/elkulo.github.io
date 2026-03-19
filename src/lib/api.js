import md5 from 'md5'

/**
 * APIのURLを生成する（generate-key.js の ESM 版）
 *
 * @param {string} API_URL
 * @param {string} API_KEY
 * @param {string} API_SALT
 * @returns {string}
 */
export function getApiUrl(API_URL, API_KEY, API_SALT) {
  if (!API_URL) return ''
  const now = new Date()
  const format = n => (n < 10 ? '0' + n : n.toString())
  const year = now.getFullYear().toString()
  const month = format(now.getMonth() + 1)
  const day = format(now.getDate())
  const hour = format(now.getHours())
  const min = format(now.getMinutes())

  if (API_SALT) {
    return `${API_URL}?key=${md5(year + month + day + hour + min + API_KEY + API_SALT)}`
  }
  return `${API_URL}?key=${API_KEY}`
}

/**
 * API から投稿データを取得し、Astro 用に変換する
 *
 * @returns {Promise<{allPost: {edges: Array}, allCategory: {distinct: Array}}>}
 */
export async function fetchPosts() {
  const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api'
  const API_KEY = import.meta.env.API_KEY || ''
  const API_SALT = import.meta.env.API_SALT || ''

  const url = getApiUrl(API_URL, API_KEY, API_SALT)

  let posts = []
  try {
    const res = await fetch(url)
    if (res.ok) {
      const json = await res.json()
      posts = json.data || []
    }
  } catch (e) {
    console.warn('API fetch failed, using empty data:', e.message)
  }

  // post_id と post_slug を付与
  const postsWithFields = posts.map(post => ({
    ...post,
    fields: {
      post_id: String(post.id).padStart(3, '0'),
      post_slug: md5(String(post.id)),
    },
  }))

  // id の降順でソート
  const sorted = [...postsWithFields].sort((a, b) => b.id - a.id)

  // カテゴリーを集約
  const allCategories = [...new Set(posts.flatMap(p => p.category || []))]

  return {
    allPost: {
      edges: sorted.map(node => ({ node })),
    },
    allCategory: {
      distinct: allCategories,
    },
    posts: sorted,
  }
}
