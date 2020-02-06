// 3rd party imports
import React, { useEffect, useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { navigate } from 'hookrouter'

// My imports
import Input from '../components/Shared/FormElements/Input/Input'
import Button from '../components/Shared/FormElements/Button/Button'
import {
  LightFormStyled as UpdateLightPlaceFormStyled,
  DarkFormStyled as UpdateDarkPlaceFormStyled
} from '../components/Shared/FormElements/PlaceFormStyle'
import { useForm } from '../hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../utils/formValidation'
import { useHttpClient } from '../hooks/http-hook'
import { AuthContext } from '../context/auth-context'
import Card from '../components/Shared/UIElements/Card'
import LoadingSpinner from '../components/Shared/UIElements/LoadingSpinner'
import ErrorModal from '../components/Shared/UIElements/ErrorModal'

const UpdatePlace = ({ placeId }) => {
  const auth = useContext(AuthContext)
  const { mode: theme } = useContext(ThemeContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPlace, setLoadedPlace] = useState()

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  )

  console.log(auth)
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        )

        // if (row new Error(response)
        // }esponse.status < 200 || response.status > 299) {
        //   thr

        setLoadedPlace(response.data.place)

        setFormData(
          {
            title: {
              value: response.data.place.title,
              isValid: true
            },
            description: {
              value: response.data.place.description,
              isValid: true
            }
          },
          true
        )
      } catch (err) {}
    }
    fetchPlace()
  }, [sendRequest, placeId, setFormData])

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault()
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
      )
      navigate(`/${auth.userId}/places`)
    } catch (err) {}
  }

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place :(</h2>
        </Card>
      </div>
    )
  }

  if (theme === 'light') {
    return (
      <>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedPlace && (
          <UpdateLightPlaceFormStyled onSubmit={placeUpdateSubmitHandler}>
            <Input
              id='title'
              elementProp='input'
              type='text'
              label='Title'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid title'
              onInput={inputHandler}
              initialValue={loadedPlace.title}
              initialValidity={true}
            />
            <Input
              id='description'
              elementProp='textarea'
              type='text'
              label='Description'
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              errorText='Please enter a valid description(Minimum of 5 characters)'
              onInput={inputHandler}
              initialValue={loadedPlace.description}
              initialValidity={true}
            />
            <Button type='submit' disabled={!formState.isValid}>
              Update Place
            </Button>
          </UpdateLightPlaceFormStyled>
        )}
      </>
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <UpdateDarkPlaceFormStyled onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            elementProp='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title'
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValidity={true}
          />
          <Input
            id='description'
            elementProp='textarea'
            type='text'
            label='Description'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description(Minimum of 5 characters)'
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValidity={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            Update Place
          </Button>
        </UpdateDarkPlaceFormStyled>
      )}
    </>
  )
}

export default UpdatePlace

// STYLING
