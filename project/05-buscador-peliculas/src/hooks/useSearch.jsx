import { useState, useEffect, useRef } from 'react'

function useSearch () {
  const [search, updateSearch] = useState()
  const [error, setError] = useState()
  const isFirstInput = useRef(true)

  useEffect(() => {
    let errorMessage = ''

    if (isFirstInput.current) {
      errorMessage = ''
      setError(errorMessage)
      isFirstInput.current = (!search)
      return
    }

    if (!search) {
      errorMessage = 'El campo no puede estar vacío'
      setError(errorMessage)
      return
    }

    if (search.match(/^d+$/)) {
      errorMessage = 'No puede estar vacío'
      setError(errorMessage)
      return
    }

    if (search.length < 3) {
      errorMessage = 'La búsqueda no puede tener menos de tres carácteres'
      setError(errorMessage)
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error, setError }
}

export default useSearch
