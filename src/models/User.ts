import { query } from '../config/db';
import bcrypt from 'bcrypt';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
}

/**
 * Obtiene un usuario por su correo electrónico
 * @param email Correo electrónico del usuario
 * @returns Usuario encontrado o null si no existe
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await query('SELECT * FROM customers WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0] as User;
  } catch (error) {
    console.error('Error al buscar usuario por email:', error);
    throw error;
  }
};

/**
 * Valida la contraseña de un usuario
 * @param user Usuario a validar
 * @param password Contraseña a verificar
 * @returns true si la contraseña es válida, false en caso contrario
 */
export const validatePassword = async (user: User, password: string): Promise<boolean> => {
  try {
    if (!user.password) {
      return false;
    }
    
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.error('Error al validar contraseña:', error);
    throw error;
  }
};

/**
 * Crea un nuevo usuario en la base de datos
 * @param email Correo electrónico del usuario
 * @param password Contraseña del usuario
 * @param name Nombre del usuario
 * @returns Usuario creado
 */
export const createUser = async (email: string, password: string, name: string): Promise<User> => {
  try {
    // Generar hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insertar el nuevo usuario en la base de datos
    const result = await query(
      'INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    
    return result.rows[0] as User;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};