import { useId } from 'react'
import './filters.css'
import { useFilters } from '../hooks/useFilters'
export function Filters () {
  const { filters, setFilters } = useFilters()

  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Price</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory} value={filters.category}>
          <option value='all'>All</option>
          <option value='home-decoration'>Home decoration</option>
          <option value='laptops'>Laptops</option>
        </select>
      </div>

    </section>
  )
}
