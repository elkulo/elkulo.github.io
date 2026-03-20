/**
 * import.meta.env.BASE_URL を取得（末尾スラッシュ保証）
 *
 * Vite/Astro の BASE_URL は設定によって末尾スラッシュが
 * 付かない場合があるため、常に末尾スラッシュを補完する。
 *
 * @returns {string} e.g. '/'
 */
export function baseUrl() {
  const base = import.meta.env.BASE_URL || '/'
  return base.endsWith('/') ? base : `${base}/`
}
