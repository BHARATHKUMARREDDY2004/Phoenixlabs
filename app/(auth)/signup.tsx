import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledInput from '@/components/ControlledInput';
import Button from '@/components/Button';
import { useAuthStore } from '@/stores/authStore';

const signupSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignUp = () => {
  const router = useRouter();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignUp = async (data: SignupFormData) => {
    try {
      const response = await fetch('https://phoenixlabs-server.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      setAuthData(responseData.token, responseData.user);
      router.replace('/home');
    } catch (error: any) {
      alert(error.message || 'Something went wrong');
    }
  };

  return (
    <View className="flex-1 bg-primary-100 justify-center items-center px-6">
      <Text className="text-5xl font-bold text-black mb-8">PhoenixLabs</Text>
      <View className="w-full bg-white p-6 rounded-2xl shadow-md">
        <Text className="text-3xl font-semibold mb-4 text-black">Create{"\n"}Account</Text>

        <ControlledInput
          control={control}
          name="fullName"
          placeholder="Full Name"
          error={errors.fullName?.message}
        />

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

        <ControlledInput
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
          error={errors.confirmPassword?.message}
        />

        <Button
          title={isSubmitting ? 'Signing up...' : 'Sign Up'}
          onPress={handleSubmit(handleSignUp)}
          disabled={isSubmitting}
        />

        <Text className="text-center mt-4 text-black text-lg">
          Already have an account?{' '}
          <Text
            onPress={() => router.replace('/login')}
            className="text-primary-500 font-semibold text-lg"
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;