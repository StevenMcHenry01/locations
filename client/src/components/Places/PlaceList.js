// 3rd party imports
import React from 'react'
import styled from 'styled-components'

// My imports
import PlaceItem from './PlaceItem'
import Card from '../Shared/UIElements/Card'

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div>
        <Card>
          <h2>No places found for user.</h2>
          <button>Share Place</button>
        </Card>
      </div>
    )
  }

  return (
    <UlStyled>
      {items.map(place => (
        <PlaceItem key={place.id} place={place} />
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
