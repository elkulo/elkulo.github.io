import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Backdrop } from '@mui/material'
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
  const isHome =
    window.location.pathname === `${__PATH_PREFIX__}/` ? true : false

  // フェードの状態
  const [fadeOn, setFadeOn] = useState(isHome ? true : false)

  // 擬似ロード画面
  const [progress, setProgress] = useState(isHome ? 0 : 100)

  useEffect(() => {
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
  }, [])

  return (
    <>
      {children}
      <StyledBackdrop open={fadeOn} transitionDuration={transition}>
        <Loading value={progress} />
      </StyledBackdrop>
    </>
  )
}
export default App
