import { useEffect } from 'react';
import { SplashScreen, Stack } from "expo-router";
import CustomAlert from '@/components/Alert';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <CustomAlert />
    </>
  );
};

export default RootLayout;