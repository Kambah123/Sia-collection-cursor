import React, { createContext, useReducer, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Actions - moved to separate constant to avoid react-refresh warning
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || []
      };
    
    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: []
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sia_cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sia_cart', JSON.stringify(state));
  }, [state]);

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        originalPrice: product.price,
        image: product.image,
        brand: product.brand,
        sku: product.sku,
        quantity
      }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: productId }
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Cart Calculations
  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getShippingCost = (location = 'dhaka') => {
    // Inside Dhaka: ৳100, Outside Dhaka: ৳200
    return location.toLowerCase() === 'dhaka' ? 100 : 200;
  };

  const getCODCharge = (total, location = 'dhaka') => {
    // 1% COD charge for outside Dhaka
    if (location.toLowerCase() !== 'dhaka') {
      return Math.round(total * 0.01);
    }
    return 0;
  };

  const getOrderTotal = (location = 'dhaka', paymentMethod = 'card') => {
    const subtotal = getCartTotal();
    const shipping = getShippingCost(location);
    const codCharge = paymentMethod === 'cod' ? getCODCharge(subtotal, location) : 0;
    
    return {
      subtotal,
      shipping,
      codCharge,
      total: subtotal + shipping + codCharge
    };
  };

  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getShippingCost,
    getCODCharge,
    getOrderTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

