import { localStorageActions as localStorage } from '../services/localStorageService'
export const cartInitialState = localStorage.get('cart') || []

export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART ',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

const updateLocalStorage = state => { localStorage.set('cart', state) }

// state is a item product
export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        // una forma de sumar uno en la cantidad sería usando structuredClone
        const newCart = structuredClone(state)
        newCart[productInCartIndex].quantity += 1
        return newCart
      }

      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]
    }
    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    }

    case CART_ACTIONS.CLEAR_CART: {
      return cartInitialState
    }

    default: {
      return state
    }
  }
}
