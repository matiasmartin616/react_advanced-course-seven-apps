import { Link } from '../Link'

export default function SearchPage ({ routeParams }) {
  return (
    <div>
      <h1>Buscador</h1>
      <h2>Tu busqueda es {routeParams.query}</h2>
      <Link to='./'>Ir a home</Link>
    </div>
  )
}
