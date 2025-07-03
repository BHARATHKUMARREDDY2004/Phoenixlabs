import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

const AuthLayout = () => {
  const { token } = useAuthStore();
  
  if (token) {
    return <Redirect href="/(tabs)/home" />;
  }
  
  return <Redirect href="/(auth)/login" />;
};

export default AuthLayout;