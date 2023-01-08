import React from 'react'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

/**
 * DummySite
 *
 * @return {JSX.Element}
 */
const DummySite = () => {
  return (
    <Stack spacing={1} sx={{ background: '#eceff1' }}>
      <Skeleton variant="rectangular" height="3rem" />
      <Skeleton variant="rectangular" sx={{ paddingTop: '50%' }} />
      <Grid container wrap="wrap" sx={{ justifyContent: 'center', py: 3 }}>
        <Box sx={{ m: 1 }}>
          <Skeleton variant="text" width={240} />
          <Skeleton variant="circular" width={40} height={40} sx={{ m: 1 }} />
          <Skeleton variant="rectangular" width={240} height={100} />
          <Skeleton width="80%" />
          <Skeleton width="40%" />
        </Box>
        <Box sx={{ m: 1 }}>
          <Skeleton variant="text" width={240} />
          <Skeleton variant="circular" width={40} height={40} sx={{ m: 1 }} />
          <Skeleton variant="rectangular" width={240} height={100} />
          <Skeleton width="80%" />
          <Skeleton width="40%" />
        </Box>
        <Box sx={{ m: 1 }}>
          <Skeleton variant="text" width={240} />
          <Skeleton variant="circular" width={40} height={40} sx={{ m: 1 }} />
          <Skeleton variant="rectangular" width={240} height={100} />
          <Skeleton width="80%" />
          <Skeleton width="40%" />
        </Box>
      </Grid>
      <Skeleton variant="rectangular" height="8rem" />
    </Stack>
  )
}
export default DummySite
