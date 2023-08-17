import { createContext, useReducer } from 'react'
import { cartInitialState, cartReducer, CART_ACTIONS } from '../reducers/cart'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product })
  }

  const removeFromCart = product => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: product })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  return {
    state,
    addToCart,
    removeFromCart,
    clearCart
  }
}

export function CartProvider ({ children }) {
  const { state, addToCart, clearCart, removeFromCart } = useCartReducer()
  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      clearCart,
      removeFromCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
