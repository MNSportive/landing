import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
import { getInventoryData } from '../utils/helpers'

const SHIPPING_THRESHOLD = 100
const FLAT_SHIPPING_COST = 3
const SHIPPING_FEATURE_START_DATE = new Date('2026-01-01')

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, respectStock } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      )

      let adjustedQuantity = quantity
      if (respectStock) {
        const currentInCart =
          existingItemIndex !== -1 ? state.items[existingItemIndex].quantity : 0

        if (currentInCart + adjustedQuantity > product.stock) {
          adjustedQuantity = Math.max(0, product.stock - currentInCart)
          if (adjustedQuantity <= 0) return state
        }
      }

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + adjustedQuantity,
        }
        return {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + adjustedQuantity,
          totalAmount:
            state.totalAmount + product.consumerPrice * adjustedQuantity,
        }
      } else {
        const newItem = {
          id: product.id,
          productName: product.productName,
          price: product.consumerPrice,
          category: product.category,
          quantity: adjustedQuantity,
          weight: product.weight,
        }
        return {
          ...state,
          items: [...state.items, newItem],
          totalQuantity: state.totalQuantity + adjustedQuantity,
          totalAmount:
            state.totalAmount + product.consumerPrice * adjustedQuantity,
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
    case 'UPDATE_QUANTITY': {
      const { productId, newQuantity, respectStock, maxStock } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === productId
      )
      if (existingItemIndex === -1) return state
      const existingItem = state.items[existingItemIndex]
      let adjustedQuantity = newQuantity

      if (respectStock && adjustedQuantity > maxStock) {
        adjustedQuantity = maxStock
      }

      if (adjustedQuantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== productId),
          totalQuantity: state.totalQuantity - existingItem.quantity,
          totalAmount:
            state.totalAmount - existingItem.price * existingItem.quantity,
        }
      }

      const quantityDifference = adjustedQuantity - existingItem.quantity
      const updatedItems = [...state.items]
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: adjustedQuantity,
      }
      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity + quantityDifference,
        totalAmount:
          state.totalAmount + existingItem.price * quantityDifference,
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
  const [inventory, setInventory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [state, dispatch] = useReducer(cartReducer, initialCart)

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await getInventoryData()
        setInventory(data)
      } catch (error) {
        console.error('Error loading inventory data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadInventory()
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const getProductStock = (productId) => {
    const product = inventory.find((p) => p.id === productId)
    return product ? product.stock : 0
  }

  const addToCart = (product, quantity) => {
    // ... (unchanged)
    const currentStock = getProductStock(product.id)
    const currentInCart =
      state.items.find((item) => item.id === product.id)?.quantity || 0
    const wouldExceedStock = currentInCart + quantity > currentStock

    if (wouldExceedStock) {
      const remainingStock = Math.max(0, currentStock - currentInCart)
      if (remainingStock <= 0) {
        alert(`Stock épuisé pour "${product.productName}".`)
        return
      } else if (remainingStock < quantity) {
        alert(`Seulement ${remainingStock} disponibles. Panier ajusté.`)
      }
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product: { ...product, stock: currentStock },
        quantity,
        respectStock: true,
      },
    })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }

  const updateQuantity = (productId, newQuantity) => {
    const currentStock = getProductStock(productId)
    if (newQuantity > currentStock) {
      alert(`Max ${currentStock} unités disponibles.`)
    }
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: {
        productId,
        newQuantity,
        respectStock: true,
        maxStock: currentStock,
      },
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // --- CALCULATE TOTALS WITH DATE CHECK ---
  const subtotal = Math.round(state.totalAmount * 100) / 100

  // 1. Get current date
  const now = new Date()

  // 2. Check if we have passed the start date
  const isShippingFeatureActive = now >= SHIPPING_FEATURE_START_DATE

  // 3. Apply logic ONLY if feature is active
  const shippingCost =
    isShippingFeatureActive && subtotal > 0 && subtotal < SHIPPING_THRESHOLD
      ? FLAT_SHIPPING_COST
      : 0

  const finalTotal = Math.round((subtotal + shippingCost) * 100) / 100

  const value = {
    items: state.items,
    totalQuantity: state.totalQuantity,
    totalAmount: subtotal,
    shippingCost,
    finalTotal,
    shippingThreshold: SHIPPING_THRESHOLD,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoading,
    getProductStock,
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
