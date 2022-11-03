import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Backdrop } from '@mui/material'
import { Box, LinearProgress } from '@mui/material'

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
const Loading2 = () => {
  // フェードの状態
  const [fadeOn, setFadeOn] = useState(true)

  // 擬似ロード画面
  const [progress, setProgress] = useState(20)

  // ロード処理.
  useEffect(() => {
    let timer = 0

    timer = setInterval(() => {
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
    }, 2)
  }, [])

  // ロードスタイル
  const StyledBackdrop = styled(Backdrop)`
    background: none;
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
      </Box>
    </StyledBackdrop>
  )
}
export default Loading2
