import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useShipmentStore } from '@/stores/shipmentStore';
import { useAuthStore } from '@/stores/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <View className="bg-white p-4 rounded-xl mb-4 border border-neutral-200 shadow-sm">
      <View className="flex-row justify-between mb-2">
        <Text className="text-base font-semibold text-neutral-800">
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text
          className={`text-sm font-semibold ${
            item.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'
          }`}
        >
          {item.status}
        </Text>
      </View>
      <Text className="text-sm text-neutral-600">Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 px-4 py-6">
      <Text className="mb-4 text-2xl font-semibold text-primary-800">
        Shipment History
      </Text>

      <FlatList
        data={shipments}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-neutral-500 text-base">No shipment history found</Text>
          </View>
        }
        contentContainerStyle={shipments.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default ShipmentHistory;
