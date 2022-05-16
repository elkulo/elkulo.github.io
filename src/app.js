import React, { useState, useEffect } from "react"
import Head from "@/components/meta/head"
import styled from "@emotion/styled"
import { NoSsr, Backdrop, Typography, Box, LinearProgress } from "@mui/material"

// ロードスタイル
const StyledBackdrop = styled(Backdrop)`
  background: #111;
  color: #f1f1f1;
  z-index: 100;
`

// フェード
const transition = {
  appear: 0,
  enter: 300,
  exit: 1000,
}

// ローリングバー
const LinearProgressWithLabel = props => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box width="100%" maxWidth={160} ml={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={40} textAlign="right" mr={1}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

// ロード中
const App = ({ children }) => {
  // フェードの状態
  const [fadeOn, setFadeOn] = useState(true)

  // ローディングの状態
  const [isLoaded, setLoaded] = useState(false)

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
              setLoaded(() => true)
              return prevProgress + 1
            default:
              return prevProgress + 1
          }
        })
      }, 30)
      return () => {
        clearInterval(timer)
      }
    } else {
      // ホーム以外ではスキップ
      setProgress(() => 100)
      setLoaded(() => true)
      setFadeOn(() => false)
      return
    }
  }, [])

  // SSRは対象外
  return (
    <NoSsr>
      <Head />
      {isLoaded && children}
      <StyledBackdrop open={fadeOn} transitionDuration={transition}>
        <LinearProgressWithLabel value={progress} />
      </StyledBackdrop>
    </NoSsr>
  )
}
export default App
