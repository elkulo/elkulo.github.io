import React from 'react'
import App from '@/app'
import ProductTemplate from '@/templates/product/product-index.template'

/**
 * Product 一覧ページ
 *
 * @param {object} data - { allPost, allCategory }
 * @param {string} title - ページタイトル
 * @param {string} isProductType - "index" | "category" | "tag"
 * @return {JSX.Element}
 */
export default function ProductPage({ data, title, isProductType }) {
  return (
    <App isPageType="Product">
      <ProductTemplate data={data} title={title} isProductType={isProductType} />
    </App>
  )
}
