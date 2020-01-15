// 3rd party imports
import React, { useEffect, useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'

// My imports
import { DUMMY_PLACES } from './UserPlaces'
import Input from '../components/Shared/FormElements/Input/Input'
import Button from '../components/Shared/FormElements/Button/Button'
import {
  LightFormStyled as UpdateLightPlaceFormStyled,
  DarkFormStyled as UpdateDarkPlaceFormStyled
} from '../components/Shared/FormElements/PlaceFormStyle'
import { useForm } from '../hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../utils/formValidation'
import Card from '../components/Shared/UIElements/Card'

const UpdatePlace = ({ placeId }) => {
  const { mode: theme } = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true)
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

  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId)

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      )
    }
    setIsLoading(false)
  }, [setFormData, identifiedPlace])

  const placeUpdateSubmitHandler = event => {
    event.preventDefault()
    console.log(formState.inputs) //TODO send to backend
  }

  if (!identifiedPlace) {
    return (
      <div className="center">


      
      <Card>
        <h2>Could not find place :(</h2>
      </Card>
      </div>
    )
  }

  if (isLoading) {
    return <h2>Loading Place</h2>
  }

  if (theme === 'light') {
    return (
      <UpdateLightPlaceFormStyled onSubmit={placeUpdateSubmitHandler}>
        <Input
          id='title'
          elementProp='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title'
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValidity={formState.inputs.title.isValid}
        />
        <Input
          id='description'
          elementProp='textarea'
          type='text'
          label='Description'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description(Minimum of 5 characters)'
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValidity={formState.inputs.description.isValid}
        />
        <Button type='submit' disabled={!formState.isValid}>
          Update Place
        </Button>
      </UpdateLightPlaceFormStyled>
    )
  }

  return (
    <UpdateDarkPlaceFormStyled onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        elementProp='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValidity={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        elementProp='textarea'
        type='text'
        label='Description'
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description(Minimum of 5 characters)'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValidity={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        Update Place
      </Button>
    </UpdateDarkPlaceFormStyled>
  )
}

export default UpdatePlace

// STYLING
