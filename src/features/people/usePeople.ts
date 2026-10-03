import { useEffect, useState } from 'react'
import { getPeople } from './peopleApi'
import type { PeopleResponse } from '@/types/swapi'

interface PeopleError {
  url: string
  message: string
}

export function usePeople(initialUrl: string) {
  const [url, setUrl] = useState(initialUrl)
  const [retryKey, setRetryKey] = useState(0)
  const [data, setData] = useState<PeopleResponse | null>(null)
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null)
  const [requestError, setRequestError] = useState<PeopleError | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    getPeople(url, controller.signal)
      .then((response) => {
        if (!active) return
        setData(response)
        setLoadedUrl(url)
        setRequestError(null)
      })
      .catch((error: unknown) => {
        if (!active) return
        if (error instanceof DOMException && error.name === 'AbortError') return
        setRequestError({
          url,
          message: error instanceof Error ? error.message : 'Unable to load data.',
        })
        setLoadedUrl(url)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [url, retryKey])

  const loading = loadedUrl !== url && requestError?.url !== url
  const error = requestError?.url === url ? requestError.message : null

  const next = () => {
    if (data?.next) setUrl(data.next)
  }

  const previous = () => {
    if (data?.previous) setUrl(data.previous)
  }

  const retry = () => {
    setRequestError(null)
    setLoadedUrl(null)
    setRetryKey((value) => value + 1)
  }

  return { data, loading, error, next, previous, retry }
}
