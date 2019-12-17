// 3rd party imports
import React from "react"
import styled from "styled-components"

// My imports
import {Theme} from '../../../styles/theme'

const Card = ({ children, style }) => {
  return <CardStyled style={style}>{children}</CardStyled>
}

export default Card

// STYLING
const CardStyled = styled.div`
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: ${Theme.colors.white};
`
