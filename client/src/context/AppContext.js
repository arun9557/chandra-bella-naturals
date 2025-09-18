import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { productData } from '../data/products';

const AppContext = createContext();

const initialState = {
  products: {
    all: [],
    filtered: [],
    featured: [],
  },
  cart: [],
  currentProduct: null,
  currentQuantity: 1,
  chat: {
    messages: [],
    isOpen: false
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'INIT_PRODUCTS':
      return {
        ...state,
        products: {
          ...state.products,
          all: action.payload.allProducts,
          featured: action.payload.featuredProducts
        }
      };
      
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
      
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item, index) => 
          index === action.payload.index 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((_, index) => index !== action.payload)
      };
      
    case 'SET_CURRENT_PRODUCT':
      return { ...state, currentProduct: action.payload };
      
    case 'SET_QUANTITY':
      return { ...state, currentQuantity: action.payload };
      
    case 'TOGGLE_CHAT':
      return {
        ...state,
        chat: {
          ...state.chat,
          isOpen: !state.chat.isOpen
        }
      };
      
    case 'ADD_MESSAGE':
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, action.payload]
        }
      };
      
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize products on mount
  useEffect(() => {
    const allProducts = [
      ...productData.products.face,
      ...productData.products.lips,
      ...productData.products.skincare,
      ...productData.products.hair,
      ...productData.products.body
    ];
    
    dispatch({
      type: 'INIT_PRODUCTS',
      payload: {
        allProducts,
        featuredProducts: productData.featured
      }
    });
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        parsedCart.forEach(item => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
