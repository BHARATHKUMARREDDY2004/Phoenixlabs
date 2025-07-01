// app/index.tsx
import { Redirect } from 'expo-router';
import 'expo-router/entry';
import '../global.css';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // Simulate checking token
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-100">
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return token ? <Redirect href="/(tabs)/home" /> : <Redirect href="/(auth)/onboarding" />;
}