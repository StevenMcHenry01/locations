// 3rd party imports
import React from 'react'

// My imports
import UsersList from '../components/Users/UsersList'

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Steven McHenry',
      image: 'https://bit.ly/2LFtPEA',
      places: 3
    },
    {
      id: 'u2',
      name: 'Tim McHenry',
      image: 'https://bit.ly/2LFtPEA',
      places: 5
    }
  ]

  return (
    <UsersList users={USERS}/>
  )
}

export default Users

// STYLING