// 3rd party imports
import {useState, useCallback, useEffect} from 'react'

let logoutTimer

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)

    // generate token expiration that is one hour after current time, unless one already exists
    const tokenExp =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60) // 1000 msec * 60 sec * 60 min
    setTokenExpirationDate(tokenExp)

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExp.toISOString()
      })
    )
  }, [])

  // check local storage for user to auto-login
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      )
    }
  }, [login])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setTokenExpirationDate(null)
    localStorage.removeItem('userData')
  }, [])

  // auto logout user after token expires
  useEffect(()=>{
    if (token && tokenExpirationDate) {
      const remainingTokenTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTokenTime)
    } else {
      clearTimeout(logoutTimer)
    }
  },[token, logout, tokenExpirationDate])

  return {token, login, logout, userId}
}