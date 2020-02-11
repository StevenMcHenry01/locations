// 3rd party imports
import React from 'react'
import { A } from 'hookrouter'

// My imports
import Avatar from '../../Shared/UIElements/Avatar'
import Card from '../../Shared/UIElements/Card'
import {
  UserItemStyled,
  UserImageStyled,
  UserInfoStyled
} from './UserItemStyles'

const UserItem = ({ user }) => {
  const { id, name, image, places } = user
  return (
    <UserItemStyled>
      <Card style={{ padding: 0 }}>
        <A href={`/${id}/places`}>
          <UserImageStyled>
            <Avatar image={`http://localhost:5000/${image}`} alt={name} />
          </UserImageStyled>
          <UserInfoStyled>
            <h2>{name}</h2>
            <h3>
              {places.length} {places.count === 1 ? 'Place' : 'Places'}
            </h3>
          </UserInfoStyled>
        </A>
      </Card>
    </UserItemStyled>
  )
}

export default UserItem
