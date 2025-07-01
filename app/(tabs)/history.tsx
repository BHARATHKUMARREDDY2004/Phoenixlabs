// app/shipments.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useShipmentStore } from '@/stores/shipmentStore';
import { useAuthStore } from '@/stores/authStore';



const ShipmentHistory = () => {
  const router = useRouter();
  const shipments = useShipmentStore((state) => state.shipments);
  const setShipments = useShipmentStore((state) => state.setShipments);
  const token = useAuthStore((state) => state.token);

  React.useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }


        // Fetch shipment history
        const fetchShipments = async () => {
          try {
            const response = await fetch('https://phoenixlabs-server.onrender.com/api/shipments', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            if (response.ok) {
              setShipments(data);
            } else {
              throw new Error('Failed to fetch shipments');
            }
          } catch (error) {
            console.error(error);
          }
        };
    fetchShipments();
  }, [token]);

  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-white p-4 rounded-lg mb-2 shadow-sm">
      <View className="flex-row justify-between mb-2">
        <Text className="text-neutral-800 font-medium">
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text
          className={`font-medium ${
            item.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'
          }`}
        >
          {item.status}
        </Text>
      </View>
      <Text className="text-neutral-500">Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-neutral-50 p-4">
      <Text className="text-2xl font-bold text-neutral-800 mb-4">Shipment History</Text>
      
      <FlatList
        data={shipments}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center">
            <Text className="text-neutral-500">No shipment history found</Text>
          </View>
        }
        contentContainerStyle={shipments.length === 0 ? { flex: 1 } : null}
      />
    </View>
  );
};

export default ShipmentHistory;