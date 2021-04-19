import React, { useState, useEffect } from "react"
import MetaSEO from "components/meta-seo"
import styled from "@emotion/styled"
import {
  NoSsr,
  Backdrop,
  Typography,
  Box,
  LinearProgress,
} from "@material-ui/core"

// ロードスタイル
const StyledBackdrop = styled(Backdrop)`
  background: #111;
  color: #f1f1f1;
`

// フェード
const transition = {
  appear: 0,
  enter: 300,
  exit: 1000,
}

// ローリングバー
const LinearProgressWithLabel = (props) => {
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
const PreLoaded = ({ children }) => {
  // フェードの状態
  const [fadeOn, setFadeOn] = useState(true)

  // ローディングの状態
  const [isLoaded, setLoaded] = useState(false)
  const removeModal = () => {
    // DOM更新
    setLoaded(() => true)
    setFadeOn(() => false)
  }

  // 擬似ロード画面
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (window.location.pathname === `${__PATH_PREFIX__}/`) {
      // ロード中
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            removeModal()
            clearInterval(timer)
            return 100
          }
          return prevProgress + 1
        })
      }, 30)
      return () => {
        clearInterval(timer)
      }
    } else {
      // ホーム以外ではスキップ
      setProgress(() => 100)
      removeModal()
      return
    }
  }, [])

  // SSRは対象外
  return (
    <NoSsr>
      <MetaSEO />
      {isLoaded && children}
      <StyledBackdrop open={fadeOn} transitionDuration={transition}>
        <LinearProgressWithLabel value={progress} />
      </StyledBackdrop>
    </NoSsr>
  )
}
export default PreLoaded
