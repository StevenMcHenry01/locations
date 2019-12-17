import React from 'react'
import { A, usePath } from 'hookrouter'
import { Theme } from '../../../../styles/theme'

const NavLinkActiveCheck = ({ url, linkName, exact }) => {
  const currentPath = usePath()

  if (exact) {
    return (
      <li>
        {currentPath === url ? (
          <A style={{ color: Theme.colors.black }} href={url}>
            {linkName}
          </A>
        ) : (
          <A href={url}>{linkName}</A>
        )}
      </li>
    )
  } else {
    return (
      <li>
        {currentPath.includes(url) ? (
          <A style={{ color: Theme.colors.black }} href={url}>
            {linkName}
          </A>
        ) : (
          <A href={url}>{linkName}</A>
        )}
      </li>
    )
  }
}

export default NavLinkActiveCheck
