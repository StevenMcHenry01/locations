// 3rd party imports
import React from 'react'
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
import {Theme} from './styles/theme'

// ROUTES
const routes = {
  '/': () => <Users />,
  '/places/new': () => <NewPlace />,
  '/:userId/places': ({userId}) => <UserPlaces userId={userId}/>
}

export default function App() {
  const [lightTheme, setLightTheme] = React.useState(true)
  const routeResult = useRoutes(routes)

  const changeThemeClickHandler = () => {
    setLightTheme(prevTheme => !prevTheme)
  }

  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <GlobalStyles />
      <AppWrapper>
        <MainNavigation
          lightTheme={lightTheme}
          changeThemeClickHandler={changeThemeClickHandler}
        />
        {lightTheme ? (
          <ThemeProvider theme={{ mode: 'light' }}>
            <PageWrapper>{routeResult || <NotFoundPage />}</PageWrapper>
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={{ mode: 'dark' }}>
            <PageWrapper>{routeResult || <NotFoundPage />}</PageWrapper>
          </ThemeProvider>
        )}
      </AppWrapper>
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
