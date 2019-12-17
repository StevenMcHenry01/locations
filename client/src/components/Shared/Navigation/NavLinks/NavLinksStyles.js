import styled from 'styled-components'
import {Theme} from '../../../../styles/theme'

export const NavUlStyled = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    margin: 1rem;
    @media (min-width: 768px) {
      margin: 0 0 0.5rem;
    }
  }
  a {
    border: 1px solid transparent;
    color: ${Theme.colors.black};
    text-decoration: none;
    padding: 0.5rem;
    &:hover,
    &:active {
      color: ${Theme.colors.black};
    }
    @media (min-width: 768px) {
      color: white;
      text-decoration: none;
    }
  }
  button {
    cursor: pointer;
    border: 1px solid ${Theme.colors.black};
    color: ${Theme.colors.black};
    background: transparent;
    padding: 0.5rem;
    font: inherit;
    &:focus {
      outline: none;
    }
    &:hover,
    &:active {
      background: ${Theme.colors.black};
      color: white;
      @media (min-width: 768px) {
        background: #f8df00;
        color: ${Theme.colors.black};
      }
    }
    @media (min-width: 768px) {
      border: 1px solid white;
      color: white;
      background: transparent;
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`