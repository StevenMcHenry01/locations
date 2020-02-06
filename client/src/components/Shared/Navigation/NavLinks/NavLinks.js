// 3rd party imports
import React, { useContext } from 'react'
import { NavUlStyled } from './NavLinksStyles'
import {navigate} from 'hookrouter'

// My imports
import NavLinkActiveCheck from './NavLinkActiveCheck'
import { AuthContext } from '../../../../context/auth-context'
import Button from '../../FormElements/Button/Button'

const NavLinks = () => {
  const auth = useContext(AuthContext)

  const logoutHandler = () => {
    auth.logout()
    navigate('/auth')
  }

  return (
    <NavUlStyled>
      <NavLinkActiveCheck url='/' exact={true} linkName='All Users' />
      {auth.isLoggedIn && (
        <NavLinkActiveCheck
          url={`/${auth.userId}/places`}
          linkName='My Places'
        />
      )}
      {auth.isLoggedIn && (
        <NavLinkActiveCheck url='/places/new' linkName='Add Place' />
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={logoutHandler}>Logout</Button>
        </li>
      )}
      {!auth.isLoggedIn && (
        <NavLinkActiveCheck url='/auth' linkName='Authenticate' />
      )}
    </NavUlStyled>
  )
}

export default NavLinks
