// 3rd party imports
import React, { useEffect, useState } from 'react'

// My imports
import UsersList from '../components/Users/UsersList'
import ErrorModal from '../components/Shared/UIElements/ErrorModal'
import LoadingSpinner from '../components/Shared/UIElements/LoadingSpinner'
import { useHttpClient } from '../hooks/http-hook'

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest('http://localhost:5000/api/users')

        if (response.status < 200 || response.status > 299) {
          throw new Error(response)
        }

        setLoadedUsers(response.data.users)
      } catch (err) {}
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </>
  )
}

export default Users

// STYLING
