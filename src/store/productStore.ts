import { create } from 'zustand';
import { Product, ProductModel } from '../models/Product';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: number) => Promise<Product | null>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Iniciando fetchProducts...');
      const products = await ProductModel.getAll();
      console.log('Productos obtenidos:', products);
      if (!products || products.length === 0) {
        console.log('No se encontraron productos');
        set({ error: 'No se encontraron productos en la base de datos', loading: false });
        return;
      }
      set({ products, loading: false });
    } catch (error) {
      console.error('Error en fetchProducts:', error);
      set({ error: `Error al cargar los productos: ${error instanceof Error ? error.message : 'Error desconocido'}`, loading: false });
    }
  },

  getProductById: async (id: number) => {
    try {
      return await ProductModel.getById(id);
    } catch (error) {
      set({ error: 'Error al obtener el producto' });
      return null;
    }
  },

  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await ProductModel.create(product);
      set((state) => ({
        products: [...state.products, newProduct],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al añadir el producto', loading: false });
    }
  },

  updateProduct: async (id, product) => {
    set({ loading: true, error: null });
    try {
      const updatedProduct = await ProductModel.update(id, product);
      if (updatedProduct) {
        set((state) => ({
          products: state.products.map((p) => p.id === id ? updatedProduct : p),
          loading: false
        }));
      }
    } catch (error) {
      set({ error: 'Error al actualizar el producto', loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const success = await ProductModel.delete(id);
      if (success) {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          loading: false
        }));
      }
    } catch (error) {
      set({ error: 'Error al eliminar el producto', loading: false });
    }
  }
}));