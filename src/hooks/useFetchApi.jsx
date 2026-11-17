import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetchApi(baseUrl, endpoint = '') {
  const [ret, setRet] = useState(null)
  const [loading, setLoading] = useState(Boolean(baseUrl))
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!baseUrl) return

    const controller = new AbortController()
    const fullUrl = endpoint ? `${baseUrl}${endpoint}` : baseUrl

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(false)
      setRet(null)

      try {
        const response = await axios.get(fullUrl, {
          signal: controller.signal
        })

        setRet(response.data)
      } catch (err) {
        if (
          err.name !== 'CanceledError' &&
          err.name !== 'AbortError' &&
          !controller.signal.aborted
        ) {
          console.error('Erro ao consultar API:', err)
          setError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, 0)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [baseUrl, endpoint])

  return {
    loading: baseUrl ? loading : false,
    error: baseUrl ? error : true,
    ret: baseUrl ? ret : null
  }
}
