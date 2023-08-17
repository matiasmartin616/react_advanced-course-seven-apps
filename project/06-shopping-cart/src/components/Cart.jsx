import './Cart.css'

import { useEffect, useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart'
import { localStorageActions } from '../services/localStorageService'

function CartItem ({ id, thumbnail, title, quantity, addToCart }) {
  return (
    <li key={id}>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - $22
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}
export function Cart () {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()
  useEffect(() => {
    localStorageActions.set('cart', cart)
  }, [cart])
  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {
            cart && cart.map((product) => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                {...product}
              />
            )
            )
          }

        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
