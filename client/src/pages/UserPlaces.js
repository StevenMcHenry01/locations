// 3rd party imports
import React, { useEffect, useState } from 'react'

// My imports
import PlaceList from '../components/Places/PlaceList'
import { useHttpClient } from '../hooks/http-hook'
import ErrorModal from '../components/Shared/UIElements/ErrorModal'
import LoadingSpinner from '../components/Shared/UIElements/LoadingSpinner'

const UserPlaces = ({ userId }) => {
  const [loadedPlaces, setLoadedPlaces] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        )

        if (response.status < 200 || response.status > 299) {
          throw new Error(response)
        }
        setLoadedPlaces(response.data.places)
      } catch (err) {}
    }
    fetchPlaces()
  }, [sendRequest, userId])

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    )
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          items={loadedPlaces}
          onDeletePlace={placeDeletedHandler}
        />
      )}
    </>
  )
}

export default UserPlaces

// STYLING
