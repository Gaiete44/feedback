// app/_context/CartContext.tsx
'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, MenuItem } from '@/app/_types/menu';

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
      }
      
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const contextValue: CartContextType = {
    items: state.items,
    total: state.total,
    addToCart: (item: MenuItem) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeFromCart: (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' })
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};