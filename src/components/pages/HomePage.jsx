import React from 'react'
import App from '@/app'
import HomeTemplate from '@/templates/home/home.template'

/**
 * Home ページ
 *
 * @return {JSX.Element}
 */
export default function HomePage() {
  const location =
    typeof window !== 'undefined' ? window.location : { pathname: '/' }
  return (
    <App isPageType="Home">
      <HomeTemplate location={location} />
    </App>
  )
}
