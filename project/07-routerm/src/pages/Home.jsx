import { Link } from '../Link'

export default function HomePage () {
  return (
    <>
      <h1>Home page</h1>
      <p>Esta pagina es la inicial</p>
      <Link to='./about'>Ir a sobre nosotros</Link>
    </>
  )
}
