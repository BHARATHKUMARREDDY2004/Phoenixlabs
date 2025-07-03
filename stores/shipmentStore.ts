import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShipmentState } from '@/types/type';


export const useShipmentStore = create<ShipmentState>()(
  persist(
    (set) => ({
      shipments: [],
      setShipments: (shipments) => set({ shipments }),
    }),
    {
      name: 'shipment-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);