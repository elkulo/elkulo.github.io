import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { NoSsr, Backdrop } from '@mui/material'
import Loading from '@/components/molecules/loading.compornent'

// ロードスタイル
const StyledBackdrop = styled(Backdrop)`
  background: #111;
  color: #f1f1f1;
  z-index: 100;
`

// フェード
const transition = {
  appear: 0,
  enter: 0,
  exit: 1000,
}

/**
 * App
 *
 * @param  {*} props.children
 * @return {JSX.Element}
 */
const App = ({ children }) => {
  // フェードの状態
  const [fadeOn, setFadeOn] = useState(true)

  // 擬似ロード画面
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.location.pathname === `${__PATH_PREFIX__}/`) {
      const timer = setInterval(() => {
        setProgress(prevProgress => {
          switch (prevProgress) {
            case 100:
              setFadeOn(() => false)
              clearInterval(timer)
              return 100
            case 50:
              return prevProgress + 1
            default:
              return prevProgress + 1
          }
        })
      }, 20)
      return () => {
        clearInterval(timer)
      }
    } else {
      // ホーム以外ではスキップ
      setProgress(() => 100)
      setFadeOn(() => false)
      return
    }
  }, [])

  return (
    <NoSsr>
      {children}
      <StyledBackdrop open={fadeOn} transitionDuration={transition}>
        <Loading value={progress} />
      </StyledBackdrop>
    </NoSsr>
  )
}
export default App
