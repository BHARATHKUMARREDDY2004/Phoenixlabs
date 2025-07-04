import { useEffect, useState } from 'react';
import React, { Component } from 'react';
import { SplashScreen, Stack } from "expo-router";
import { View, Text } from 'react-native';
import CustomAlert from '@/components/Alert';

SplashScreen.preventAutoHideAsync();

const ErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF3B30', marginBottom: 10 }}>
        Something went wrong
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        {error?.message || 'An unexpected error occurred'}
      </Text>
      <Text style={{ fontSize: 12, color: '#666' }}>
        Please restart the app or contact support if the issue persists.
      </Text>
    </View>
  );
};

// Wrap component with error boundary
class AppErrorBoundary extends Component<{ children: React.ReactNode }> {
  state = { hasError: false, error: null as Error | null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App crashed:', error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

const RootLayout = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Add a delay to ensure everything is loaded properly
        await new Promise(resolve => setTimeout(resolve, 1500));
        await SplashScreen.hideAsync();
        setAppReady(true);
      } catch (error) {
        console.error('Error preparing app:', error);
        // Hide splash screen even if there's an error
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    };
    
    prepareApp();
  }, []);

  if (!appReady) {
    return null; // Still showing splash screen
  }

  return (
    <AppErrorBoundary>
      <>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <CustomAlert />
      </>
    </AppErrorBoundary>
  );
};

export default RootLayout;