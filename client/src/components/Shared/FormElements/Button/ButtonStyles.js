import styled from 'styled-components'
import {Theme} from '../../../../styles/theme'
import {A} from 'hookrouter'

export const StandardButtonStyled = styled.button`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${Theme.colors.primaryColor};
  border-radius: 4px;
  background: ${Theme.colors.primaryColor};
  color: white;
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;
  &:focus {
    outline: none;
  }
  &:hover, &:active {
    background: ${Theme.colors.primaryColorLight};
  border-color: ${Theme.colors.primaryColorLight};
  }
  &:disabled, &:hover:disabled, &:active:disabled {
    background: #ccc;
  color: #979797;
  border-color: #ccc;
  cursor: not-allowed;
  }
`

export const InverseButtonStyled = styled(StandardButtonStyled)`
background: transparent;
  color: ${Theme.colors.primaryColor};
  &:hover, &:active {
    color: white;
  background: ${Theme.colors.primaryColor};
  }

`

export const DangerButtonStyled = styled(StandardButtonStyled)`
background: #830000;
  border-color: #830000;
  &:hover, &:active {
    background: #f34343;
  border-color: #f34343;
  }
`

export const StandardAnchorStyled = styled.a`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${Theme.colors.primaryColor};
  border-radius: 4px;
  background: ${Theme.colors.primaryColor};
  color: white;
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;
  &:focus {
    outline: none;
  }
  &:hover, &:active {
    background: ${Theme.colors.primaryColorLight};
  border-color: ${Theme.colors.primaryColorLight};
  }
  &:disabled, &:hover:disabled, &:active:disabled {
    background: #ccc;
  color: #979797;
  border-color: #ccc;
  cursor: not-allowed;
  }
`

export const InverseAnchorStyled = styled(StandardAnchorStyled)`
background: transparent;
  color: ${Theme.colors.primaryColor};
  &:hover, &:active {
    color: white;
  background: ${Theme.colors.primaryColor};
  }

`

export const DangerAnchorStyled = styled(StandardAnchorStyled)`
background: #830000;
  border-color: #830000;
  &:hover, &:active {
    background: #f34343;
  border-color: #f34343;
  }
`

export const StandardRouteStyled = styled(A)`
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${Theme.colors.primaryColor};
  border-radius: 4px;
  background: ${Theme.colors.primaryColor};
  color: white;
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;
  &:focus {
    outline: none;
  }
  &:hover, &:active {
    background: ${Theme.colors.primaryColorLight};
  border-color: ${Theme.colors.primaryColorLight};
  }
  &:disabled, &:hover:disabled, &:active:disabled {
    background: #ccc;
  color: #979797;
  border-color: #ccc;
  cursor: not-allowed;
  }
`

export const InverseRouteStyled = styled(StandardRouteStyled)`
background: transparent;
  color: ${Theme.colors.primaryColor};
  &:hover, &:active {
    color: white;
  background: ${Theme.colors.primaryColor};
  }

`

export const DangerRouteStyled = styled(StandardRouteStyled)`
background: #830000;
  border-color: #830000;
  &:hover, &:active {
    background: #f34343;
  border-color: #f34343;
  }
`