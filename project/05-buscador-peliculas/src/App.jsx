import { useEffect, useState, useRef, useCallback } from 'react'
import './App.css'
import Movies from './components/movies'
import { useMovies } from './hooks/useMovies'
import useSearch from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const { search, updateSearch, error, setError } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies: sortedMovies, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(({ search }) => {
      getMovies({ search })
    }, 500)
    , [getMovies])

  const handleClick = (event) => {
    event.preventDefault()

    getMovies({ search })
    /* const fields = Object.fromEntries(new FormData(event.target))
    const { query } = fields */
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    setError(null)
    debouncedGetMovies({ search: newSearch })
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form' onSubmit={handleClick}>
          <input onChange={handleChange} name='query' type='text' placeholder='Avengers, Stars Wars' />
          <input type='checkbox' onChange={handleSort} name='sort' checked={sort} />
          <button type='submit'>Submit</button>
        </form>
        {error && <p style={{ color: 'red', fontSize: 'small' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={sortedMovies} />
      </main>
    </div>
  )
}

export default App
