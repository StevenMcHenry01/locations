// 3rd party imports
import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { navigate } from 'hookrouter'

// My imports
import Input from '../components/Shared/FormElements/Input/Input'
import Button from '../components/Shared/FormElements/Button/Button'
import {
  LightFormStyled,
  DarkFormStyled
} from '../components/Shared/FormElements/PlaceFormStyle'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from '../utils/formValidation'
import { useForm } from '../hooks/form-hook'
import { useHttpClient } from '../hooks/http-hook'
import Card from '../components/Shared/UIElements/Card'
import ImageUpload from '../components/Shared/FormElements/ImageUpload'
import { AuthContext } from '../context/auth-context'
import LoadingSpinner from '../components/Shared/UIElements/LoadingSpinner'
import ErrorModal from '../components/Shared/UIElements/ErrorModal'

const Auth = () => {
  // ~ Contexts
  const { mode: theme } = useContext(ThemeContext)
  const FormStyled = theme === 'light' ? LightFormStyled : DarkFormStyled

  const auth = useContext(AuthContext)

  // ~ State
  const [isLoginMode, setIsLoginMode] = useState(true)

  // ~ Hooks
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  )

  // ~ Functions
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid,
        formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode(prevMode => !prevMode)
  }

  const authSubmitHandler = async event => {
    event.preventDefault()

    if (isLoginMode) {
      try {
        const response = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        )

        if (response.status < 200 || response.status > 299) {
          throw new Error(response)
        }
        auth.login(response.data.userId, response.data.token)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        // formData object necessary when sending image file along with json
        const formData = new FormData()
        formData.append('email', formState.inputs.email.value)
        formData.append('name', formState.inputs.name.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)
        const response = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        )

        if (response.status < 200 || response.status > 299) {
          throw new Error(response)
        }
        auth.login(response.dataId, response.data.token)
      } catch (err) {}
    }
    navigate('/')
  }

  // ~ UI
  return (
    <div className='center'>
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 style={{ textAlign: 'center' }}>Login Required</h2>
        <hr />
        <FormStyled
          onSubmit={authSubmitHandler}
          style={{ width: '25rem', boxShadow: 'none' }}
        >
          {!isLoginMode && (
            <Input
              elementProp='input'
              id='name'
              type='text'
              label='Your Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name'
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id='image'
              onInput={inputHandler}
              errorText='Please upload an image to use for your profile'
            />
          )}
          <Input
            id='email'
            elementProp='input'
            type='email'
            label='Email'
            validators={[VALIDATOR_EMAIL(), VALIDATOR_MINLENGTH(5)]}
            errorText='Invalid Email'
            onInput={inputHandler}
          />
          <Input
            id='password'
            type='password'
            elementProp='input'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password (atleast 6 characters)'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Button>
        </FormStyled>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? 'Sign Up' : 'Already have an account?'}
        </Button>
      </Card>
    </div>
  )
}

export default Auth
