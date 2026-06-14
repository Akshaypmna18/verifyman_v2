import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Appearance, View } from 'react-native';
import { PortalHost } from '@rn-primitives/portal';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const toScheme = (s: string | null | undefined) =>
      s === 'dark' ? 'dark' : 'light';
    setColorScheme(toScheme(Appearance.getColorScheme()));
    const sub = Appearance.addChangeListener(({ colorScheme: next }) => {
      setColorScheme(toScheme(next));
    });
    return () => sub.remove();
  }, []);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
    <View className={`flex-1${colorScheme === 'dark' ? ' dark' : ''}`}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="alerts" />
        <Stack.Screen name="new-request" options={{ headerShown: false }} />
        <Stack.Screen name="request/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="reports" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </View>
    </ThemeProvider>
  );
}
