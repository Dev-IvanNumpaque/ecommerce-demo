import { Pool, QueryResult, QueryResultRow } from 'pg';

const requiredEnvVars = [
  'VITE_DB_USER',
  'VITE_DB_HOST',
  'VITE_DB_NAME',
  'VITE_DB_PASSWORD',
  'VITE_DB_PORT'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Variable de entorno requerida ${varName} no está definida`);
  }
});

const pool = new Pool({
  user: process.env.VITE_DB_USER,
  host: process.env.VITE_DB_HOST,
  database: process.env.VITE_DB_NAME,
  password: process.env.VITE_DB_PASSWORD,
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Error en el cliente inactivo:', err);
  // En lugar de cerrar la aplicación, intentamos reconectar
  setTimeout(() => {
    console.log('Intentando reconectar al pool...');
    pool.connect().catch(connectErr => {
      console.error('Error al reconectar:', connectErr);
    });
  }, RETRY_DELAY);
});

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

export const query = async <T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> => {
  let retries = 0;
  let result;

  while (retries < MAX_RETRIES) {
    try {
      const client = await pool.connect();
      try {
        result = await client.query<T>(text, params);
        return result;
      } finally {
        client.release();
      }
    } catch (err) {
      retries++;
      if (retries === MAX_RETRIES) throw err;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Max retries reached');
}

export type { QueryResult };
export default pool;