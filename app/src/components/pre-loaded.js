import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  NoSsr,
  Backdrop,
  Typography,
  Box,
  LinearProgress,
} from "@material-ui/core"

// ロードスタイル
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#f1f1f1",
  },
  buffer: {
    background: `#555`,
    height: `2px`,
  },
  progress: {
    background: `#fff`,
    height: `2px`,
  },
}))

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
  const classes = useStyles()

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
      }, 20)
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
      {isLoaded && <>{children}</>}
      {window.location.pathname === `${__PATH_PREFIX__}/` && (
        <Backdrop
          className={classes.backdrop}
          open={fadeOn}
          transitionDuration={transition}
        >
          <LinearProgressWithLabel
            value={progress}
            classes={{
              determinate: classes.buffer,
              bar: classes.progress,
            }}
          />
        </Backdrop>
      )}
    </NoSsr>
  )
}
export default PreLoaded
