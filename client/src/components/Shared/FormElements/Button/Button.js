// 3rd party imports
import React from 'react'

// My imports
import {
  StandardButtonStyled,
  DangerButtonStyled,
  InverseButtonStyled,
  StandardAnchorStyled,
  DangerAnchorStyled,
  InverseAnchorStyled,
  StandardRouteStyled,
  DangerRouteStyled,
  InverseRouteStyled
} from './ButtonStyles'

const Button = ({
  a,
  route,
  href,
  inverse,
  danger,
  children,
  type,
  onClick,
  disabled
}) => {
  if (a) {
    if (danger) {
      return <DangerAnchorStyled href={href}>{children}</DangerAnchorStyled>
    }
    if (inverse) {
      return <InverseAnchorStyled href={href}>{children}</InverseAnchorStyled>
    }
    return <StandardAnchorStyled href={href}>{children}</StandardAnchorStyled>
  }
  if(route) {
    if (danger) {
      return <DangerRouteStyled href={href}>{children}</DangerRouteStyled>
    }
    if (inverse) {
      return <InverseRouteStyled href={href}>{children}</InverseRouteStyled>
    }
    return <StandardRouteStyled href={href}>{children}</StandardRouteStyled>
  }
  if (danger) {
    return (
      <DangerButtonStyled
        href={href}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </DangerButtonStyled>
    )
  }
  if (inverse) {
    return (
      <InverseButtonStyled
        href={href}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </InverseButtonStyled>
    )
  }
  return (
    <StandardButtonStyled
      href={href}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StandardButtonStyled>
  )
}

export default Button
