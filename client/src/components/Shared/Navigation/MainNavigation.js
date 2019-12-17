// 3rd party imports
import React, { useState } from 'react'
import styled from 'styled-components'
import { A } from 'hookrouter'

// My imports
import MainHeader from './MainHeader'
import NavLinks from './NavLinks/NavLinks'
import SideBar from './Sidebar'
import Backdrop from '../UIElements/Backdrop'

const MainNavigation = ({ lightTheme, changeThemeClickHandler }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const openSidebarHandler = () => {
    setSidebarIsOpen(true)
  }

  const closeSidebarHandler = () => {
    setSidebarIsOpen(false)
  }

  return (
    <>
      {sidebarIsOpen && <Backdrop onClick={closeSidebarHandler} />}
      <SideBar show={sidebarIsOpen} onClick={closeSidebarHandler}>
        <nav>
          <NavLinks />
        </nav>
      </SideBar>
      <MainHeader>
        <HamburgerButtonStyled onClick={openSidebarHandler}>
          <span />
          <span />
          <span />
        </HamburgerButtonStyled>
        <TitleH1Styled>
          <A href='/'>Locations</A>
        </TitleH1Styled>
        <DivStyled>
          <NavStyled>
            <NavLinks />
          </NavStyled>
          <ButtonStyled onClick={changeThemeClickHandler}>
            {lightTheme ? '☾' : '☀︎'}
          </ButtonStyled>
        </DivStyled>
      </MainHeader>
    </>
  )
}

export default MainNavigation

// STYLING
const HamburgerButtonStyled = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;
  span {
    display: block;
    width: 3rem;
    height: 2.5px;
    background: white;
  }
  @media (min-width: 768px) {
    display: none;
  }
`

const TitleH1Styled = styled.h1`
  color: white;
  a {
    text-decoration: none;
    color: white;
  }
`

const NavStyled = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`

const ButtonStyled = styled.button`
  border: none;
  outline: none;
  font-size: 2rem;
  margin-left: 1.5rem;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`

const DivStyled = styled.div`
  display: flex;
  flex-direction: row;
`
