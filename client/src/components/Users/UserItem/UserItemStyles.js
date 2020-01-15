import styled from 'styled-components'
import {Theme} from '../../../styles/theme'

export const UserItemStyled = styled.li`
  margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    padding: 1rem;
    &:hover,
    &:active {
      background: ${Theme.colors.secondaryColor};
    }
  }
  &:hover h2,
  &:active h2,
  &:hover h3,
  &:active h3 {
    color: ${Theme.colors.black};
  }
`

export const UserImageStyled = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
`

export const UserInfoStyled = styled.div`
  h2 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    font-weight: normal;
    color: ${Theme.colors.secondaryColor};
  }
  h3 {
    color: ${Theme.colors.secondaryColor};
    margin: 0;
  }
`