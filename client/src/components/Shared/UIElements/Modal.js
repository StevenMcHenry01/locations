// 3rd party imports
import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

// My imports
import Backdrop from './Backdrop'

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentStyles,
  children,
  footerStyles,
  footer
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : event => event.preventDefault()}>
        <div className={`modal__content`} style={contentStyles}>{children}</div>
        <footer className={`modal__footer`} style={footerStyles}>{footer}</footer>
      </form>
    </div>
  )
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = props => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={100}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  )
}

export default Modal

// STYLING
