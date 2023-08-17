import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import './Products.css'
import { useCart } from '../hooks/useCart'

export function Products ({ products }) {
  const { cart, addToCart, removeFromCart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)

          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
              <div>
                <h3>{product.title}</h3>
              </div>
              <div>
                <button style={{ backgroundColor: isProductInCart ? 'darkred' : 'gray' }} onClick={() => { isProductInCart ? removeFromCart(product) : addToCart(product) }}>
                  {isProductInCart
                    ? <RemoveFromCartIcon />
                    : <AddToCartIcon />}
                </button>
                <strong>${product.price}</strong>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
