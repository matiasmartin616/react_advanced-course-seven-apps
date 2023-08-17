export function ListOfMovies ({ movies }) {
  return (
    <ul className='moviesList'>
      {
          movies.map(movie => (
            <li className='movie' key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.poster} alt={movie.title} />
            </li>
          ))
        }
    </ul>
  )
}

export function NoMoviesResult () {
  return (
    <p> No se encontraron películas</p>
  )
}

function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    <div className='movies'>
      {
        hasMovies
          ? <ListOfMovies movies={movies} />
          : <NoMoviesResult />
       }
    </div>
  )
}

export default Movies
