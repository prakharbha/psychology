'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

export interface CartItem {
  productId: string;
  productSlug: string;
  productName: string;
  packSize: 100 | 500;
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, packSize: 100 | 500) => void;
  updateQuantity: (productId: string, packSize: 100 | 500, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const abandonedCartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abandonedCartNotificationSentRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(items));
      
      // Abandoned cart tracking disabled - no user info available until checkout
      // TODO: Implement abandoned cart with user info collection
      // Clear any existing timer
      if (abandonedCartTimerRef.current) {
        clearTimeout(abandonedCartTimerRef.current);
        abandonedCartTimerRef.current = null;
      }
    }
    
    // Cleanup timer on unmount
    return () => {
      if (abandonedCartTimerRef.current) {
        clearTimeout(abandonedCartTimerRef.current);
      }
    };
  }, [items, isMounted]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productId === item.productId && i.packSize === item.packSize
      );

      if (existingItem) {
        return prevItems.map((i) =>
          i.productId === item.productId && i.packSize === item.packSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, packSize: 100 | 500) => {
    setItems((prevItems) =>
      prevItems.filter((i) => !(i.productId === productId && i.packSize === packSize))
    );
  };

  const updateQuantity = (productId: string, packSize: 100 | 500, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, packSize);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((i) =>
        i.productId === productId && i.packSize === packSize
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    // Clear abandoned cart timer when cart is cleared
    if (abandonedCartTimerRef.current) {
      clearTimeout(abandonedCartTimerRef.current);
      abandonedCartTimerRef.current = null;
    }
    abandonedCartNotificationSentRef.current = false;
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

