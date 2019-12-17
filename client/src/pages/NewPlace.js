// 3rd party imports
import React from 'react'
import styled from 'styled-components'

// My imports
import Input from '../components/Shared/FormElements/Input'

const NewPlace = () => {
  return (
    <NewPlaceFormStyled>
      <Input
        elementProp='input'
        type='text'
        label='Title'
        errorText='Please enter a valid title'
      />
    </NewPlaceFormStyled>
  )
}

export default NewPlace

// STYLING
const NewPlaceFormStyled = styled.form`
  list-style: none;
  margin: 1rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: white;
`
