import { executeQuery } from '../services/api';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  sizes: number[];
  colors: string[];
  category: string;
  style: string;
}

export const ProductModel = {
  async getAll(): Promise<Product[]> {
    return await executeQuery<Product[]>('/products');
  },
  
  async getById(id: number): Promise<Product> {
    return await executeQuery<Product>(`/products/${id}`);
  }
  // Resto de métodos actualizados para usar la API
};