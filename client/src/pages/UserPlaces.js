// 3rd party imports
import React from 'react'

// My imports
import PlaceList from '../components/Places/PlaceList'

const DUMMY_PLACES = [
  {
    id: '1',
    title: 'Exploratorium',
    description: 'Fun place to go when visiting the city',
    imageUrl: 'https://bayareane.ws/2LV2C0W',
    address: 'Pier 15, The Embarcadero, San Francisco, CA 94111',
    coordinates: {
      lat: 37.7989102,
      lng: -122.4074185
    },
    creator: 'u1'
  },
  {
    id: '2',
    title: 'Coit Tower',
    description: 'Fun place to go when visiting the city',
    imageUrl: 'https://bit.ly/38DhXNp',
    address: '1 Telegraph Hill Blvd, San Francisco, CA 94133',
    coordinates: {
      lat: 37.8023949,
      lng: -122.4058222
    },
    creator: 'u2'
  }
]

const UserPlaces = ({ userId }) => {
  return (
    <PlaceList items={DUMMY_PLACES.filter(place => place.creator === userId)} />
  )
}

export default UserPlaces

// STYLING
