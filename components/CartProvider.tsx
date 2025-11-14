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
      
      // Track abandoned cart
      // Clear any existing timer
      if (abandonedCartTimerRef.current) {
        clearTimeout(abandonedCartTimerRef.current);
        abandonedCartTimerRef.current = null;
      }
      
      // Reset notification flag when cart changes
      abandonedCartNotificationSentRef.current = false;
      
      // If cart has items, set a timer to check for abandoned cart (30 minutes)
      if (items.length > 0) {
        abandonedCartTimerRef.current = setTimeout(() => {
          // Check if cart still has items (not checked out)
          const currentCart = localStorage.getItem('cart');
          const checkoutInitiated = localStorage.getItem('checkout_initiated');
          
          // Don't send notification if checkout was initiated
          if (checkoutInitiated === 'true') {
            localStorage.removeItem('checkout_initiated');
            return;
          }
          
          if (currentCart) {
            try {
              const cartItems = JSON.parse(currentCart);
              if (cartItems.length > 0 && !abandonedCartNotificationSentRef.current) {
                abandonedCartNotificationSentRef.current = true;
                
                // Calculate cart total
                const total = cartItems.reduce((sum: number, item: CartItem) => 
                  sum + (item.price * item.quantity), 0
                );
                
                // Send abandoned cart notification
                fetch('/api/telegram/notify-abandoned-cart', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    items: cartItems,
                    total: total,
                    itemCount: cartItems.reduce((count: number, item: CartItem) => count + item.quantity, 0),
                  }),
                }).catch(err => {
                  console.error('Failed to send abandoned cart notification:', err);
                });
              }
            } catch (error) {
              console.error('Error checking abandoned cart:', error);
            }
          }
        }, 30 * 60 * 1000); // 30 minutes
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

