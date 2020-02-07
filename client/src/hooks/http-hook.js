// 3rd party imports
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, headers = {}) => {
      setIsLoading(true)

      const signal = axios.CancelToken.source()

      try {
        const response = await axios(url, {
          method,
          data,
          headers,
          cancelToken: signal.token
        })

        if (response.status < 200 || response.status > 299) {
          throw new Error(response)
        }
        setIsLoading(false)
        return response
      } catch (err) {
        if (axios.isCancel(err)) {
          setError(err.message)
          setIsLoading(false)
          throw err
        } else {
          setError(err.response.data.message)
          setIsLoading(false)
          throw err
        }
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    const signal = axios.CancelToken.source()
    return () => {
      signal.cancel('Cancelling occured. Oops')
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}
