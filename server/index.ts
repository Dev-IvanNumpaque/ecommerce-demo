import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';

dotenv.config();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.VITE_DB_USER,
  host: process.env.VITE_DB_HOST,
  database: process.env.VITE_DB_NAME,
  password: process.env.VITE_DB_PASSWORD,
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  ssl: process.env.VITE_DB_SSL === 'true' ? { 
    rejectUnauthorized: false 
  } : false
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});

// Rutas de autenticación
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const userCheck = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    
    // Generar hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insertar el nuevo usuario
    const result = await pool.query(
      'INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario por email
    const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const user = result.rows[0];
    
    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Eliminar la contraseña del objeto de respuesta
    const { password: _, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Bienvenido a la API de E-commerce',
    versión: '1.0.0',
    endpoints: {
      productos: '/api/products',
      producto: '/api/products/:id',
      clientes: '/api/customers',
      órdenes: '/api/orders',
      registro: '/api/auth/register',
      login: '/api/auth/login'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});