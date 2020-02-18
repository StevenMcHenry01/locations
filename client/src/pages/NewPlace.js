// 3rd party imports
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { navigate } from 'hookrouter'

// My imports
import Input from '../components/Shared/FormElements/Input/Input'
import Button from '../components/Shared/FormElements/Button/Button'
import {
  LightFormStyled,
  DarkFormStyled
} from '../components/Shared/FormElements/PlaceFormStyle'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../utils/formValidation'
import { useForm } from '../hooks/form-hook'
import ImageUpload from '../components/Shared/FormElements/ImageUpload'
import { useHttpClient } from '../hooks/http-hook'
import { AuthContext } from '../context/auth-context'
import LoadingSpinner from '../components/Shared/UIElements/LoadingSpinner'
import ErrorModal from '../components/Shared/UIElements/ErrorModal'

const NewPlace = () => {
  const { mode: theme } = useContext(ThemeContext)
  const FormStyled = theme === 'light' ? LightFormStyled : DarkFormStyled

  const auth = useContext(AuthContext)

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

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
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  )

  const placeSubmitHandler = async event => {
    event.preventDefault()
    try {
      // formData object necessary when sending image file along with json
      const formData = new FormData()
      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('address', formState.inputs.address.value)
      formData.append('creator', auth.userId)
      formData.append('image', formState.inputs.image.value)

      const response = await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token
        }
      )

      if (response.status < 200 || response.status > 299) {
        throw new Error(response)
      }
      navigate('/')
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <FormStyled onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id='image'
          onInput={inputHandler}
          errorText='Please upload an image for your location'
        />
        <Button type='submit' disabled={!formState.isValid}>
          Add Place
        </Button>
      </FormStyled>
    </>
  )
}

export default NewPlace
