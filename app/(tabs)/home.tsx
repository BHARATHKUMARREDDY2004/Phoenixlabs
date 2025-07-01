// app/dashboard.tsx
import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/Button';

const Dashboard = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearAuthData = useAuthStore((state) => state.clearAuthData);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://phoenixlabs-server.onrender.com/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
      } catch (error) {
        console.error(error);
      }
    };


    fetchDashboardData();
    
  }, [token]);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

    const handleLogout = () => {
    clearAuthData();
    router.replace('/login');
  };

  return (
    <ScrollView className="flex-1 bg-neutral-50 p-6">
      <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <Text className="text-2xl font-bold text-neutral-800 mb-4">Dashboard</Text>
        
        <View className="mb-4">
          <Text className="text-neutral-500 text-sm">Full Name</Text>
          <Text className="text-neutral-800 text-lg">{user.fullName}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-neutral-500 text-sm">Patient ID</Text>
          <Text className="text-neutral-800 text-lg">{user.patientId}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-neutral-500 text-sm">Current Plan</Text>
          <Text className="text-neutral-800 text-lg">{user.currentPlan}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-neutral-500 text-sm">Next Delivery Date</Text>
          <Text className="text-neutral-800 text-lg">
            {new Date(user.nextDeliveryDate).toLocaleDateString()}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-neutral-500 text-sm">Remaining Medication</Text>
          <Text className="text-neutral-800 text-lg">{user.remainingMedication} days</Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <View>
            <Text className="text-neutral-500 text-sm">Status</Text>
            <Text
              className={`text-lg ${
                user.status === 'active' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Text>
          </View>
          <View>
            <Text className="text-neutral-500 text-sm">Billing</Text>
            <Text
              className={`text-lg ${
                user.billingStatus === 'OK' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {user.billingStatus}
            </Text>
          </View>
        </View>
      </View>


      <Button title="View Shipment History" onPress={() => router.push('/history')} />
      <Button title="Logout"  onPress={handleLogout} className="mt-4" />
    </ScrollView>
  );
};

export default Dashboard;