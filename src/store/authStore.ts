import { create } from 'zustand';
import { createUser, getUserByEmail, validatePassword } from '../models/User';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

type SetState = (fn: Partial<AuthStore> | ((state: AuthStore) => Partial<AuthStore>)) => void;

export const useAuthStore = create<AuthStore>((set: SetState) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const isValid = await validatePassword(user, password);
      if (!isValid) {
        throw new Error('Contraseña incorrecta');
      }

      set({
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        isAuthenticated: true
      });
    } catch (error) {
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
      }

      const newUser = await createUser(email, password, name);
      set({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        },
        isAuthenticated: true
      });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));