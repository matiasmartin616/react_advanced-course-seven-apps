import { useContext } from 'react'
import { CartContext } from '../context/cart'

export function useCart () {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart is not available in this component. Is the provider component set?')
  }

  return context
}
