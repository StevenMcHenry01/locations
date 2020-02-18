// 3rd party imports
import React, { useState, useCallback } from 'react'
import GlobalStyles from './styles/global'
import theme from 'styled-theming'
import styled, { ThemeProvider } from 'styled-components'
import { useRoutes } from 'hookrouter'

// My imports
import Users from './pages/Users'
import NewPlace from './pages/NewPlace'
import NotFoundPage from './pages/NotFoundPage'
import UserPlaces from './pages/UserPlaces'
import MainNavigation from './components/Shared/Navigation/MainNavigation'
import { Theme } from './styles/theme'
import UpdatePlace from './pages/UpdatePlace'
import Auth from './pages/Auth'
import { AuthContext } from './context/auth-context'

// ROUTES
const loggedInRoutes = {
  '/': () => <Users />,
  '/places/new': () => <NewPlace />,
  '/places/:placeId': ({ placeId }) => <UpdatePlace placeId={placeId} />,
  '/:userId/places': ({ userId }) => <UserPlaces userId={userId} />
}

const loggedOutRoutes = {
  '/': () => <Users />,
  '/:userId/places': ({ userId }) => <UserPlaces userId={userId} />,
  '/auth': () => <Auth />
}

export default function App() {
  const [lightTheme, setLightTheme] = useState(true)
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  let routes

  if (token) {
    routes = loggedInRoutes
  } else {
    routes = loggedOutRoutes
  }

  const routeResult = useRoutes(routes)

  const changeThemeClickHandler = () => {
    setLightTheme(prevTheme => !prevTheme)
  }

  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
  }, [])

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, token, userId, login, logout }}
      >
        <GlobalStyles />
        <AppWrapper>
          <MainNavigation
            lightTheme={lightTheme}
            changeThemeClickHandler={changeThemeClickHandler}
          />
          {lightTheme ? (
            <ThemeProvider theme={{ mode: 'light' }}>
              {token ? (
                <PageWrapper>{routeResult || <NotFoundPage />}</PageWrapper>
              ) : (
                <PageWrapper>{routeResult || <Auth />}</PageWrapper>
              )}
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={{ mode: 'dark' }}>
              {token ? (
                <PageWrapper>{routeResult || <NotFoundPage />}</PageWrapper>
              ) : (
                <PageWrapper>{routeResult || <Auth />}</PageWrapper>
              )}
            </ThemeProvider>
          )}
        </AppWrapper>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

// STYLING

// light and dark themeing
const backgroundColor = theme('mode', {
  light: Theme.colors.white,
  dark: Theme.colors.black
})

const textColor = theme('mode', {
  light: Theme.colors.black,
  dark: Theme.colors.white
})

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`
const PageWrapper = styled.main`
  padding-top: 5rem;
  height: 100%;
  background-color: ${backgroundColor};
  color: ${textColor};
`
