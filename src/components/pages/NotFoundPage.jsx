import React from 'react'
import { styled } from '@mui/material/styles'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import App from '@/app'
import bg404 from '@/assets/images/background/bg-404.jpg?url'
import { baseUrl } from '@/utils/url'

const Wrap = styled('div')({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `url(${bg404}) center / cover no-repeat`,
  color: '#fff',
  textAlign: 'center',
})

const Inner = styled('div')({
  padding: '2rem',
})

const Title = styled('h1')({
  fontSize: 'clamp(4rem, 15vw, 10rem)',
  fontWeight: 700,
  lineHeight: 1,
  margin: 0,
})

const Message = styled('p')({
  fontSize: '1.25rem',
  margin: '1rem 0 2rem',
})

const BackLink = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#fff',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.6)',
  padding: '0.5rem 1.25rem',
  borderRadius: '2rem',
  transition: 'background 0.2s',
  '&:hover': {
    background: 'rgba(255,255,255,0.15)',
  },
})

/**
 * 404 ページ
 *
 * @return {JSX.Element}
 */
function NotFound() {
  const base = baseUrl()
  return (
    <Wrap>
      <Inner>
        <Title>404</Title>
        <Message>ページが見つかりません</Message>
        <BackLink href={base}>
          <KeyboardBackspaceIcon />
          ホームへ戻る
        </BackLink>
      </Inner>
    </Wrap>
  )
}

export default function NotFoundPage() {
  return (
    <App isPageType="404">
      <NotFound />
    </App>
  )
}
