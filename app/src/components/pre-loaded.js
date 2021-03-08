import React, { useState, useEffect } from "react"
import Backdrop from "@material-ui/core/Backdrop"
import { makeStyles } from "@material-ui/core/styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

// モーダル背景
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: `#333`,
    background: `#fff`,
  },
  root: {
    width: `100%`,
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

// モーダルフェード設定
const transition = {
  appear: 0, // マウント直後
  enter: 0, // 表示中
  exit: 600, // close後
}

// ローリングバー
const LinearProgressWithLabel = (props) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="100%" maxWidth={350} mr={1} ml={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
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
  const [isModalOpen, setOpen] = useState(true)
  const removeModal = () => {
    setOpen(false)
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

  return (
    <>
      <div variant="outlined">{children}</div>
      <Backdrop
        className={classes.backdrop}
        open={isModalOpen}
        transitionDuration={transition}
      >
        <div className={classes.root}>
          <LinearProgressWithLabel
            value={progress}
            classes={{
              determinate: classes.buffer,
              bar: classes.progress,
            }}
          />
        </div>
      </Backdrop>
    </>
  )
}
export default PreLoaded
