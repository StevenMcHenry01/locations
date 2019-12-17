// 3rd party imports
import React from "react"
import styled from "styled-components"

// My imports

const Avatar = ({ style, image, alt, width }) => {
  return (
    <DivStyled>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </DivStyled>
  )
}

export default Avatar

// STYLING
const DivStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
