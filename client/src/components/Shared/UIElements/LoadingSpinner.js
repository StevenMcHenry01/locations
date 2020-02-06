// 3rd party imports
import React from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingSpinner = ({ asOverlay }) => {
  if (asOverlay) {
    return (
      <LoadingRingOverlayDivStyled>
        <LoadingRingDivStyled></LoadingRingDivStyled>
      </LoadingRingOverlayDivStyled>
    )
  } else {
    return (
      <div>
        <LoadingRingDivStyled></LoadingRingDivStyled>
      </div>
    )
  }
}

export default LoadingSpinner

// STYLING
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const LoadingRingDivStyled = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
  &:after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #510077;
    border-color: #510077 transparent #510077 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`

const LoadingRingOverlayDivStyled = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`
