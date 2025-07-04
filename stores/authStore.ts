import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from '@/types/type';

// Create a more resilient storage implementation
const safeStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.warn('Error reading from AsyncStorage:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.warn('Error writing to AsyncStorage:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.warn('Error removing from AsyncStorage:', error);
    }
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuthData: (token, user) => set({ token, user }),
      clearAuthData: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => safeStorage),
      // Add options to make persistence more robust
      partialize: (state) => ({
        token: state.token,
        user: state.user
      }),
      onRehydrateStorage: () => (state) => {
        console.log('State hydration complete');
        if (!state) {
          console.warn('Failed to rehydrate state from storage');
        }
      }
    }
  )
);

