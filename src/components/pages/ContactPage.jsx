import React from 'react'
import App from '@/app'
import ContactTemplate from '@/templates/contact/contact.template'

/**
 * Contact ページ
 *
 * @param {object} post - { html: string }
 * @param {object} postContent - frontmatter + attachedSrc
 * @return {JSX.Element}
 */
export default function ContactPage({ post, postContent }) {
  return (
    <App isPageType="Page">
      <ContactTemplate post={post} postContent={postContent} />
    </App>
  )
}
