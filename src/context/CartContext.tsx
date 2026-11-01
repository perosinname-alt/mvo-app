import { createContext, ReactNode, useContext, useState } from "react";

export type CartItem = {
  id: string; // product _id (backend-ka)
  name: string;
  price: number;
  quantity: number;
  companyId: string;
};

type NewCartProduct = {
  id: string;
  name: string;
  price: number;
  companyId: string;
};

type CartContextType = {
  items: CartItem[];
  companyId: string | null;
  // Waxay soo celisaa false haddii alaabtu tahay shirkad kale (cart-ka lama beddelin)
  addToCart: (item: NewCartProduct) => boolean;
  // Cart-ka tirtir oo ku bilow alaabtan cusub
  startNewCart: (item: NewCartProduct) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const companyId = items.length > 0 ? items[0].companyId : null;

  function addToCart(product: NewCartProduct): boolean {
    if (companyId && companyId !== product.companyId) {
      return false;
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    return true;
  }

  function startNewCart(product: NewCartProduct) {
    setItems([{ ...product, quantity: 1 }]);
  }

  function removeFromCart(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function increaseQuantity(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  }

  function decreaseQuantity(id: string) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        companyId,
        addToCart,
        startNewCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
