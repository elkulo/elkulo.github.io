import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { NoSsr, Typography, Box, LinearProgress } from "@material-ui/core"

// ロードスタイル
const useStyles = makeStyles(() => ({
  root: {
    display: `grid`,
    justifyItems: `center`,
    alignItems: `center`,
    color: `#333`,
    background: `#fff`,
    width: `100vw`,
    height: document.documentElement.style.getPropertyValue("--maxvh")
      ? document.documentElement.style.getPropertyValue("--maxvh")
      : `100vh`,
  },
  buffer: {
    background: `#ddd`,
    height: `2px`,
  },
  progress: {
    background: `#000`,
    height: `2px`,
  },
}))

// ローリングバー
const LinearProgressWithLabel = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box width="100%" maxWidth={350} ml={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={40} textAlign="right" mr={1}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

// ロード中
const PreLoaded = ({ children }) => {
  const classes = useStyles()

  // ローディングの状態
  const [isLoaded, setLoaded] = useState(false)
  const removeModal = () => {
    // DOM更新
    setLoaded(() => true)
  }

  // 擬似ロード画面
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setTimeout(() => removeModal(), 1000)
          clearInterval(timer)
          return 100
        }
        return prevProgress + 1
      })
    }, 30)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // SSRは対象外
  if (isLoaded) {
    return <NoSsr>{children}</NoSsr>
  } else {
    return (
      <NoSsr>
        <div className={classes.root}>
          <LinearProgressWithLabel
            value={progress}
            classes={{
              determinate: classes.buffer,
              bar: classes.progress,
            }}
          />
        </div>
      </NoSsr>
    )
  }
}
export default PreLoaded
