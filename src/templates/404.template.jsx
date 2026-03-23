import { styled } from '@mui/material/styles'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import bg404 from '@/assets/images/background/bg-404.jpg?url'
import { baseUrl } from '@/utils/url'

const Wrap = styled('div')({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  textAlign: 'right',
  background: `url(${bg404}) center / cover no-repeat`,
  color: '#fff',
})

const Inner = styled('div')({
  padding: '0 2rem 2rem 0',
})

const Title = styled('h1')({
  fontSize: 'clamp(7rem, 15vw, 10rem)',
  fontWeight: 700,
  lineHeight: 1,
  margin: 0,
})

const Message = styled('p')({
  fontSize: 'clamp(1.125rem, 3vw, 2rem)',
  margin: '1rem 0 2rem',
})

const BackLink = styled('a')({
  position: 'relative',
  zIndex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3275rem',
  color: '#fff !important',
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.5)',
  padding: '0.3275rem 1rem',
  borderRadius: '2rem',
  transition: 'background 0.2s',
  fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',

  '&:hover': {
    background: 'rgba(255,255,255,0.2)',
  },
})

/**
 * 404 ページ
 *
 * @return {JSX.Element}
 */
export default function NotFoundPage() {
  const base = baseUrl()
  return (
    <Wrap>
      <Inner>
        <BackLink href={base}>
          <KeyboardBackspaceIcon />
          ホームへ戻る
        </BackLink>
        <Title>404</Title>
        <Message>ページが見つかりません</Message>
      </Inner>
    </Wrap>
  )
}
