import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, Order } from '../types';
import { INITIAL_PRODUCTS, MOCK_ORDERS } from '../constants';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  orders: any[];
  isAdmin: boolean;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  toggleWishlist: (productId: number) => void;
  wishlist: number[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<any[]>(MOCK_ORDERS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load state from local storage on mount (mock persistence)
  useEffect(() => {
    const savedCart = localStorage.getItem('biggie_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('biggie_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const clearCart = () => setCart([]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const loginAdmin = (password: string) => {
    if (password === '12345') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => setIsAdmin(false);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <ShopContext.Provider value={{
      products, cart, orders, isAdmin,
      addToCart, removeFromCart, clearCart,
      addProduct, deleteProduct, loginAdmin, logoutAdmin,
      toggleWishlist, wishlist
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
};