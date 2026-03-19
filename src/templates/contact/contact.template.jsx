import React from 'react'
import styles from './contact.module.scss'
import Wrap from '@/components/atoms/Wrap'
import MailIcon from '@mui/icons-material/Send'

const formUrl = 'https://elkulo.me/forms/elkulo-io/post'

/**
 * コンタクトのテンプレート
 *
 * @param  {object} post
 * @param  {object} postContent
 * @return {JSX.Element}
 */
const ContactTemplate = ({ post, postContent }) => {
  return (
    <article className="contact">
      <div className={styles.container}>
        <Wrap>
          <div className={styles.primary}>
            <header className={styles.primary__header}>
              <h1 className={styles.primary__header__title}>
                {postContent.title}
              </h1>
            </header>
            <div className={styles.primary__content}>
              <p>{postContent.description}</p>
              <p>
                <a href={formUrl} rel="noopener noreferrer" className="button">
                  <MailIcon className={styles.icon} />
                  メールフォームへ移動
                </a>
              </p>
            </div>
            <div className={styles.primary__bg}>
              {postContent.attachedSrc && (
                <img
                  src={postContent.attachedSrc}
                  alt={postContent.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
            </div>
          </div>
          <div className={styles.secondary}>
            <section
              className={styles.secondary__content}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </Wrap>
      </div>
    </article>
  )
}

export default ContactTemplate
