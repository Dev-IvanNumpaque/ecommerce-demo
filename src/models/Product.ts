import { apiRequest } from '../config/db';

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
    const response = await apiRequest<Product[]>('/products', 'GET');
    return response.data ?? [];
  },

  async getById(id: number): Promise<Product | null> {
    const response = await apiRequest<Product>(`/products/${id}`, 'GET');
    return response.data ?? null;
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await apiRequest<Product>('/products', 'POST', product);
    if (!response.data) throw new Error('Failed to create product');
    return response.data;
  },

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    const response = await apiRequest<Product>(`/products/${id}`, 'PUT', product);
    return response.data ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const response = await apiRequest<{ success: boolean }>(`/products/${id}`, 'DELETE');
    return response.data ?? false;
  }
};