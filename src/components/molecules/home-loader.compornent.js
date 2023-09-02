import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { Backdrop } from '@mui/material'
import { Typography, Box, LinearProgress } from '@mui/material'
import { LoadedContext } from '@/story/contexts'

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
  // ロード済み
  const [loadedState, loadedDispatch] = useContext(LoadedContext)

  // フェードの状態
  const [fadeOn, setFadeOn] = useState(true)

  // 擬似ロード画面
  const [progress, setProgress] = useState(loadedState?.is ? 50 : 0)

  // ロード処理.
  useEffect(() => {
    const timer = {
      id: 0,
    }
    // ロード済み判定.
    if (!loadedState?.is) {
      loadedDispatch({ type: 'end' })
    } else {
      /* NOTE: 2回目からはロードをスキップする場合.
      return () => {
        clearInterval(timer.id)
      }
      */
    }

    timer.id = setInterval(() => {
      setProgress(prevProgress => {
        switch (prevProgress) {
          case 100:
            setFadeOn(() => false)
            clearInterval(timer.id)
            return 100
          case 50:
            return prevProgress + 1
          default:
            return prevProgress + 1
        }
      })
    }, 30)
  }, [loadedState, loadedDispatch])

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
