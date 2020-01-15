// 3rd party imports
import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import {navigate} from 'hookrouter'

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
import Card from '../components/Shared/UIElements/Card'
import { AuthContext } from '../context/auth-context'

const NewPlace = () => {
  const { mode: theme } = useContext(ThemeContext)
  const auth = useContext(AuthContext)

  const [isLoginMode, setIsLoginMode] = useState(true)

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

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
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
          }
        },
        false
      )
    }
    setIsLoginMode(prevMode => !prevMode)
  }

  const authSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs) //TODO send to backend
    auth.login()
    navigate('/')
  }

  if (theme === 'light') {
    return (
      <div className='center'>
        <Card>
          <h2 style={{ textAlign: 'center' }}>Login Required</h2>
          <hr />
          <AuthLightFormStyled onSubmit={authSubmitHandler}>
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
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText='Please enter a valid password (atleast 5 characters)'
              onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
              {isLoginMode ? 'Login' : 'Sign Up'}
            </Button>
          </AuthLightFormStyled>
          <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? 'Sign Up' : 'Already have an account?'}
          </Button>
        </Card>
      </div>
    )
  }
  return (
    <div className='center'>
      <Card>
        <h2 style={{ textAlign: 'center' }}>Login Required</h2>
        <hr />
        <AuthDarkFormStyled onSubmit={authSubmitHandler}>
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
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid password (atleast 5 characters)'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'Sign Up'}
          </Button>
        </AuthDarkFormStyled>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? 'Sign Up' : 'Already have an account?'}
        </Button>
      </Card>
    </div>
  )
}

export default NewPlace

//STYLING
const AuthLightFormStyled = styled(LightFormStyled)`
  width: 25rem;
  box-shadow: none;
`

const AuthDarkFormStyled = styled(DarkFormStyled)`
  width: 25rem;
  box-shadow: none;
`
