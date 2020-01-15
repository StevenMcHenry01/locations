// 3rd party imports
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

// My imports
import {Theme} from '../../../styles/theme'

const Card = ({ children, style }) => {
  const { mode: theme } = useContext(ThemeContext)
  if (theme === 'light') {
    return <LightCardStyled style={style}>{children}</LightCardStyled>
  } else {
    return <DarkCardStyled style={style}>{children}</DarkCardStyled>
  }
}

export default Card

// STYLING
const LightCardStyled = styled.div`
  color: ${Theme.colors.white};
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1.5rem;
  overflow: hidden;
  background: ${Theme.colors.black};
  max-width: 50rem;
`

const DarkCardStyled = styled.div`
  color: ${Theme.colors.black};
  position: relative;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1.5rem;
  overflow: hidden;
  background: ${Theme.colors.white};
  max-width: 50rem;
`
