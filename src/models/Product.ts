import { query, QueryResult } from '../config/db';

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
    const result: QueryResult<Product> = await query('SELECT * FROM products');
    return result?.rows ?? [];
  },

  async getById(id: number): Promise<Product | null> {
    const result: QueryResult<Product> = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result?.rows[0] ?? null;
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const result: QueryResult<Product> = await query(
      'INSERT INTO products (name, brand, price, description, image, sizes, colors, category, style) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [product.name, product.brand, product.price, product.description, product.image, product.sizes, product.colors, product.category, product.style]
    );
    if (!result?.rows[0]) throw new Error('Failed to create product');
    return result.rows[0];
  },

  async update(id: number, product: Partial<Product>): Promise<Product | null> {
    const fields = Object.keys(product).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = Object.values(product);
    const result: QueryResult<Product> = await query(
      `UPDATE products SET ${fields} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result?.rows[0] ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const result: QueryResult = await query('DELETE FROM products WHERE id = $1', [id]);
    return (result?.rowCount ?? 0) > 0;
  }
};