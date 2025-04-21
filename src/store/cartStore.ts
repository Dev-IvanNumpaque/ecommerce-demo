import { create } from 'zustand';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item: CartItem) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (id: number) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  updateQuantity: (id: number, quantity: number) => {
    if (quantity < 1) return;
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  total: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));