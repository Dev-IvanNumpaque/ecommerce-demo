import { query, QueryResult } from '../config/db';
import bcrypt from 'bcrypt';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (email: string, password: string, name: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result: QueryResult<User> = await query(
    'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
    [email, hashedPassword, name]
  );
  if (!result?.rows[0]) throw new Error('Failed to create user');
  return result.rows[0];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result: QueryResult<User> = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result?.rows[0] ?? null;
};

export const validatePassword = async (user: User, password: string): Promise<boolean> => {
  return await bcrypt.compare(password, user.password);
};