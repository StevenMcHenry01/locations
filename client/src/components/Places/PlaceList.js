// 3rd party imports
import React from 'react'
import styled from 'styled-components'

// My imports
import PlaceItem from './PlaceItem'
import Card from '../Shared/UIElements/Card'
import Button from '../Shared/FormElements/Button/Button'

const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0) {
    return (
      <DivStyled>
        <Card>
          <h2>No places found for user.</h2>
          <Button route href='/places/new'>
            Share Place
          </Button>
        </Card>
      </DivStyled>
    )
  }

  return (
    <UlStyled>
      {items.map(place => (
        <PlaceItem key={place.id} place={place} onDelete={onDeletePlace}/>
      ))}
    </UlStyled>
  )
}

export default PlaceList

// STYLING
const UlStyled = styled.ul`
  list-style: none;
  margin: 1rem auto;
  padding: 0;
  width: 90%;
  max-width: 40rem;
`

const DivStyled = styled.div`
  padding: 0;
  margin: 1rem auto;
  width: 90%;
  max-width: 40rem;
`
