import React from 'react'
import App from '@/app'
import AboutTemplate from '@/templates/about/about.template'

/**
 * About ページ
 *
 * @param {object} post - { html: string }
 * @param {object} postContent - frontmatter + attachedSrc
 * @return {JSX.Element}
 */
export default function AboutPage({ post, postContent }) {
  return (
    <App isPageType="Page">
      <AboutTemplate post={post} postContent={postContent} />
    </App>
  )
}
