import React from 'react'
import styled from '@emotion/styled'
import { Box, LinearProgress } from '@mui/material'

const StyledBox = styled(Box)`
  width: calc(100% - 12px);
  position: absolute;
  top: 2px;
  left: 6px;
  z-index: 100;
  border-radius: 3px;
  overflow: hidden;
`
const StyledLinearProgress = styled(LinearProgress)`
  height: 3px;
  background: #b7d4d0;

  .MuiLinearProgress-bar {
    background: #33b2a6;
  }
`
/**
 * LinearIndeterminate
 *
 * @return {JSX.Element}
 */
const LinearIndeterminate = () => {
  return (
    <StyledBox>
      <StyledLinearProgress />
    </StyledBox>
  )
}
export default LinearIndeterminate
