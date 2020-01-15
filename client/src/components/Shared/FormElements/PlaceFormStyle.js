import styled from 'styled-components'
import {Theme} from '../../../styles/theme'

export const LightFormStyled = styled.form`
color: ${Theme.colors.white};
  list-style: none;
  margin: 1rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: ${Theme.colors.black};
`

export const DarkFormStyled = styled.form`
color: ${Theme.colors.black};
  list-style: none;
  margin: 1rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: ${Theme.colors.white};
`