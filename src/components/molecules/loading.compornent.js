import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { Backdrop } from '@mui/material'
import { Typography, Box, LinearProgress } from '@mui/material'
import { LoadedContext } from '@/story/contexts'

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
 * ローリング
 *
 * @param  {*} props
 * @return {JSX.Element}
 */
const Loading = () => {
  // ロード済み
  const [loadedState, loadedDispatch] = useContext(LoadedContext)

  // フェードの状態
  const [fadeOn, setFadeOn] = useState(loadedState?.is ? false : true)

  // 擬似ロード画面
  const [progress, setProgress] = useState(loadedState?.is ? 100 : 0)

  // ロード処理.
  useEffect(() => {
    let timer = 0

    // ロード済み判定.
    if (loadedState?.is) {
      return () => {
        clearInterval(timer)
      }
    }

    // 未ロードの場合.
    loadedDispatch({ type: 'end' })

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
    }, 20)
  }, [loadedState, loadedDispatch])

  return (
    <StyledBackdrop open={fadeOn} transitionDuration={transition}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box width="100%" maxWidth={160} ml={1}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box minWidth={40} textAlign="right" mr={1}>
          <Typography variant="body2">{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    </StyledBackdrop>
  )
}
export default Loading
