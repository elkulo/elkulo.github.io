import React from 'react'
import { Typography, Box, LinearProgress } from '@mui/material'

/**
 * ローリング
 *
 * @param  {*} props
 * @return {JSX.Element}
 */
const Loading = props => {
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
export default Loading
