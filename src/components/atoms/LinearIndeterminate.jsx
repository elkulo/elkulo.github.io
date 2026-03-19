import React from 'react'
import styled from '@emotion/styled'
import { Box, LinearProgress } from '@mui/material'

const StyledDropback = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.1);
`

const StyledLinear = styled(Box)`
  position: absolute;
  top: calc(50% - 2px);
  left: 1rem;
  width: calc(100% - 2rem);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
`
const StyledLinearProgress = styled(LinearProgress)`
  height: 3px;
  background: #fff;

  .MuiLinearProgress-bar {
    background: #26a69a;
  }
`
/**
 * LinearIndeterminate
 *
 * @return {JSX.Element}
 */
const LinearIndeterminate = () => {
  return (
    <StyledDropback>
      <StyledLinear>
        <StyledLinearProgress />
      </StyledLinear>
    </StyledDropback>
  )
}
export default LinearIndeterminate
