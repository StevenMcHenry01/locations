// 3rd party imports
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

// My imports

const Sidebar = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={300}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <SidebarAsideStyled onClick={onClick}>{children}</SidebarAsideStyled>
    </CSSTransition>
  )

  // used to render sidebar above everything in the DOM
  // mostly for accessibility but good to do :)
  return ReactDOM.createPortal(content, document.getElementById('sidebar-hook'))
}

export default Sidebar

// STYLING
const SidebarAsideStyled = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 60%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0, 0.26);
  display: flex;
  justify-content: center;
`
