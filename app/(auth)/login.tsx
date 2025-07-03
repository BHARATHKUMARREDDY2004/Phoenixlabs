import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledInput from '@/components/ControlledInput';
import { useAuthStore } from '@/stores/authStore';
import { showCustomAlert } from '@/components/Alert';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await fetch('https://phoenixlabs-server.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      setAuthData(responseData.token, responseData.user);
      router.replace('/home');
    } catch (error: any) {
      showCustomAlert(
        'Login Failed',
        error.message || 'Something went wrong. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]
      );
    }
  };

  return (
    <View className="flex-1 bg-primary-100 justify-center items-center px-6">
      <Text className="text-5xl font-bold text-black mb-8">PhoenixLabs</Text>
      
      <View className="w-full bg-white p-6 rounded-2xl shadow-md">
        <Text className="text-3xl font-semibold mb-4 text-black">Login</Text>

        <ControlledInput
          control={control}
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email?.message}
        />

        <ControlledInput
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          error={errors.password?.message}
        />

        <Text
          onPress={() => router.push('/forgot-password')}
          className="text-primary-500 text-lg mb-6 pl-1"
        >
          Forgot Password?
        </Text>

        <Button
          title={isSubmitting ? 'Logging in...' : 'Login'}
          onPress={handleSubmit(handleLogin)}
          disabled={isSubmitting}
        />

        <Text className="text-center mt-4 text-black text-lg">
          Don't have an account?{' '}
          <Text
            onPress={() => router.replace('/signup')}
            className="text-primary-500 font-semibold text-lg"
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;