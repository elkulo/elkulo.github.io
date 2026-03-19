import React from 'react'
import App from '@/app'
import ProductSingleTemplate from '@/templates/product/product-single.template'

/**
 * Product 詳細ページ
 *
 * @param {object} data - { internalPosts: post }
 * @param {object} pageContext - { previous, next }
 * @return {JSX.Element}
 */
export default function ProductSinglePage({ data, pageContext }) {
  return (
    <App isPageType="ProductSingle">
      <ProductSingleTemplate data={data} pageContext={pageContext} />
    </App>
  )
}
