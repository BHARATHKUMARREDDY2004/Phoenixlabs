import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BookingState } from "@/types/type";

// Storage methods for zustand using AsyncStorage
const zustandStorage = {
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  }
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),
      getBookingsByStatus: (status) =>
        get().bookings.filter((b) => b.status === status),
      clearCompletedBookings: () =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.status !== "completed"),
        })),
      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        })),
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
