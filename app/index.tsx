import { Redirect } from 'expo-router';
import '../global.css';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  let token = null;
  try {
    token = useAuthStore((state) => state.token);
  } catch (err) {
    console.error('Error accessing auth store:', err);
    setError('Failed to access authentication data');
  }

  useEffect(() => {
    const initApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        console.error('Error in app initialization:', err);
        setError('App initialization failed');
        setIsLoading(false);
      }
    };
    
    initApp();
  }, []);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-red-500 text-lg font-bold mb-2">Error</Text>
        <Text className="text-center">{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-100">
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return token ? <Redirect href="/(tabs)/home" /> : <Redirect href="/(auth)/onboarding" />;
}