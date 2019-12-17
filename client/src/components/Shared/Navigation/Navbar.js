import React from "react"
import { A } from "hookrouter"
import styled from "styled-components"

const Navbar = ({ changeThemeClickHandler, lightTheme }) => {
  return (
    <NavStyled>
      <TitleStyled href='/'>Site Title</TitleStyled>
      <ul>
        <li>
          <A href='/'>Users</A>
        </li>
        <ButtonStyled onClick={changeThemeClickHandler}>
          {lightTheme ? "🔦" : "💡"}
        </ButtonStyled>
      </ul>
    </NavStyled>
  )
}

export default Navbar

// STYLING

const NavStyled = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  box-shadow: 0 8px 6px -6px #999;
  z-index: 2;
  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    li,
    button {
      margin-right: 3rem;
      a {
        color: blue;
      }
    }
  }
`

const TitleStyled = styled(A)`
  margin-left: 3rem;
`

const ButtonStyled = styled.button`
  border: none;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`
