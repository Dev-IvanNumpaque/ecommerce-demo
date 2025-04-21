import { create } from 'zustand';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type FavoritesStore = {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

type SetState = (fn: Partial<FavoritesStore> | ((state: FavoritesStore) => Partial<FavoritesStore>)) => void;
type GetState = () => FavoritesStore;

export const useFavoritesStore = create<FavoritesStore>((set: SetState, get: GetState) => ({
  favorites: [],
  addFavorite: (product: Product) => {
    const favorites = get().favorites;
    if (!favorites.some((p) => p.id === product.id)) {
      set({ favorites: [...favorites, product] });
    }
  },
  removeFavorite: (id: number) => {
    set({ favorites: get().favorites.filter((product) => product.id !== id) });
  },
  isFavorite: (id: number) => {
    return get().favorites.some((product) => product.id === id);
  },
}));