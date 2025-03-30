import React, { createContext, useContext, useReducer, useEffect } from 'react'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      )

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }

        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + quantity,
          totalAmount: state.totalAmount + product.consumerPrice * quantity,
        }
      } else {
        const newItem = {
          id: product.id,
          productName: product.productName,
          price: product.consumerPrice,
          category: product.category,
          quantity,
          weight: product.weight,
        }

        return {
          ...state,
          items: [...state.items, newItem],
          totalQuantity: state.totalQuantity + quantity,
          totalAmount: state.totalAmount + product.consumerPrice * quantity,
        }
      }
    }

    case 'REMOVE_ITEM': {
      const { productId } = action.payload
      const existingItem = state.items.find((item) => item.id === productId)

      if (!existingItem) return state

      if (existingItem.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== productId),
          totalQuantity: state.totalQuantity - 1,
          totalAmount: state.totalAmount - existingItem.price,
        }
      } else {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalQuantity: state.totalQuantity - 1,
          totalAmount: state.totalAmount - existingItem.price,
        }
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const savedCart = localStorage.getItem('cart')
  const initialCart = savedCart ? JSON.parse(savedCart) : initialState

  const [state, dispatch] = useReducer(cartReducer, initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const addToCart = (product, quantity) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity },
    })
  }

  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { productId },
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value = {
    items: state.items,
    totalQuantity: state.totalQuantity,
    totalAmount: state.totalAmount,
    addToCart,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
