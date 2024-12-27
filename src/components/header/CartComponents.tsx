'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  bottleType: string;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  total: 0,
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => [...prev, item]);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(() => 
    items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  const contextValue = useMemo(() => ({
    items,
    addItem,
    removeItem,
    total,
    clearCart
  }), [items, addItem, removeItem, total, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

const CartDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = React.memo(({ isOpen, onClose }) => {
  const { items, removeItem, total } = useContext(CartContext);
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-[#2D1A4A] rounded-lg shadow-xl overflow-hidden z-50">
      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-[#FAFAFA] text-center py-4">Cosul tau este gol</p>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-2 hover:bg-[#4A2B7A] rounded-lg transition-colors duration-200 mb-2"
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-16 h-16 object-contain bg-[#2D1A4A] rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="text-[#FAFAFA] font-faculty text-sm">{item.title}</h3>
                    <p className="text-[#FAFAFA] opacity-75 text-xs font-montserrat">
                      {item.size} | {item.bottleType}
                    </p>
                    <p className="text-[#FAFAFA] font-faculty">{item.price} RON</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-[#FAFAFA]/10 mt-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#FAFAFA] font-faculty">Total:</span>
                <span className="text-[#FAFAFA] font-faculty text-lg">{total} RON</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#9F1E07] text-[#FAFAFA] py-2 rounded font-faculty hover:bg-[#FAFAFA] hover:text-[#9F1E07] transition-colors duration-200"
              >
                Finalizeaza Comanda
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

CartDropdown.displayName = 'CartDropdown';

export const CartIcon: React.FC = React.memo(() => {
  const { items } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <div className="relative">
      <button 
        className="group p-2 mr-4 relative"
        aria-label="Shopping Cart"
        onClick={handleToggle}
      >
        <ShoppingCart className="w-6 h-6 stroke-[#FAFAFA] absolute transition-opacity duration-300 group-hover:opacity-0" />
        <ShoppingCart className="w-6 h-6 stroke-[url(#cart-gradient)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="cart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047A6E" />
              <stop offset="50%" stopColor="#047A6E" />
              <stop offset="100%" stopColor="#9F1E07" />
            </linearGradient>
          </defs>
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#9F1E07] text-[#FAFAFA] text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>
      <CartDropdown isOpen={isOpen} onClose={handleClose} />
    </div>
  );
});

CartIcon.displayName = 'CartIcon';

export const useCart = () => useContext(CartContext);