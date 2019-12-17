// 3rd party imports
import React from 'react'
import styled from 'styled-components'

// My imports
import UserItem from './UserItem/UserItem'
import Card from '../Shared/UIElements/Card'

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    )
  }

  return (
    <UserListStyled>
      {users.map(user => {
        return <UserItem key={user.id} user={user} />
      })}
    </UserListStyled>
  )
}

export default UsersList

// STYLING
const UserListStyled = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
