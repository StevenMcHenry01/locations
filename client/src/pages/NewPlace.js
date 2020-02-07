// 3rd party imports
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

// My imports
import Input from '../components/Shared/FormElements/Input/Input'
import Button from '../components/Shared/FormElements/Button/Button'
import {
  LightFormStyled,
  DarkFormStyled
} from '../components/Shared/FormElements/PlaceFormStyle'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../utils/formValidation'
import { useForm } from '../hooks/form-hook'

const NewPlace = () => {
  const { mode: theme } = useContext(ThemeContext)
  const FormStyled = theme === 'light' ? LightFormStyled : DarkFormStyled

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const placeSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs) //TODO send to backend
  }

    return (
      <FormStyled onSubmit={placeSubmitHandler}>
        <Input
          id='title'
          elementProp='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Title is required'
          onInput={inputHandler}
        />
        <Input
          id='description'
          elementProp='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (atleast 5 characters)'
          onInput={inputHandler}
        />
        <Input
          id='address'
          elementProp='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Address is required'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Add Place
        </Button>
      </FormStyled>
    )
  
}

export default NewPlace
