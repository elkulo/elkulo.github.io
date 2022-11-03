import React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

/**
 * LinearIndeterminate
 *
 * @return {JSX.Element}
 */
const LinearIndeterminate = () => {
  return (
    <Box
      sx={{
        width: 'calc(100% - 12px)',
        position: 'absolute',
        top: '2px',
        left: '6px',
      }}
    >
      <LinearProgress color="secondary" />
    </Box>
  )
}
export default LinearIndeterminate
