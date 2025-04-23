import { Pool, QueryResult as PgQueryResult } from 'pg';
import { executeQuery } from '../services/api';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export type QueryResult<T> = PgQueryResult<T>;

export const query = async <T = any>(text: string, params: any[] = []): Promise<PgQueryResult<T>> => {
  try {
    const start = Date.now();
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

type ApiResponse<T = any> = {
  data: T | null;
  status: number;
  message?: string;
  error?: string;
};

export const apiRequest = async <T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const result = await executeQuery<T>(endpoint, method, data);
    return {
      data: result,
      status: 200,
      message: 'Success'
    };
  } catch (error: any) {
    console.error('API request failed:', error.message);
    return {
      data: null,
      status: error.status || 500,
      error: error.message || 'An unexpected error occurred'
    };
  }
};

export type { ApiResponse };
export { pool };