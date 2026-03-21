import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Backdrop } from '@mui/material'
import { Typography, Box, LinearProgress } from '@mui/material'

// フェード
const transition = {
  appear: 0,
  enter: 0,
  exit: 1000,
}

/**
 * ローリング
 *
 * @return {JSX.Element}
 */
const HomeLoader = () => {
  // フェードの状態
  const [fadeOn, setFadeOn] = useState(true)

  // 擬似ロード画面
  const [progress, setProgress] = useState(0)

  // ロード処理.
  useEffect(() => {
    let timer = 0
    timer = setInterval(() => {
      setProgress(prevProgress => {
        if (100 <= prevProgress) {
          setFadeOn(() => false)
          clearInterval(timer)
          return 100
        }
        return prevProgress + 1
      })
    }, 30)
  }, [])

  // ロードスタイル
  const StyledBackdrop = styled(Backdrop)`
    background: #000;
    color: #f1f1f1;
    z-index: 100;
  `
  const StyledLinearBox = styled(Box)`
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  `
  const StyledLinearProgress = styled(LinearProgress)`
    background: #b7d4d0;

    .MuiLinearProgress-bar {
      background: #33b2a6;
    }
  `

  return (
    <StyledBackdrop open={fadeOn} transitionDuration={transition}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <StyledLinearBox maxWidth={160} ml={1}>
          <StyledLinearProgress variant="determinate" value={progress} />
        </StyledLinearBox>
        <Box minWidth={40} textAlign="right" mr={1}>
          <Typography variant="body2">{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </StyledBackdrop>
  )
}
export default HomeLoader
