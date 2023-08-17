import { useFilters } from '../hooks/useFilters'
import { Cart } from './Cart'
import { Filters } from './Filters'

export function Header () {
  const { setFilters } = useFilters()
  return (
    <>
      <Cart />
      <h1>React Shop</h1>
      <Filters onChange={setFilters} />
    </>
  )
}
