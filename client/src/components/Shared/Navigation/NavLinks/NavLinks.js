// 3rd party imports
import React from 'react'
import { NavUlStyled } from './NavLinksStyles'

// My imports
import NavLinkActiveCheck from './NavLinkActiveCheck'

const NavLinks = () => {
  return (
    <NavUlStyled>
      <NavLinkActiveCheck url='/' exact={true} linkName='All Users' />
      <NavLinkActiveCheck url='/u1/places' startingIndex={4} linkName='My Places' />
      <NavLinkActiveCheck url='/places/new' linkName='Add Place' />
      <NavLinkActiveCheck url='/auth' linkName='Authenticate' />
    </NavUlStyled>
  )
}

export default NavLinks
