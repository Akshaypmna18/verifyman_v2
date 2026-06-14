import '@/global.css';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useColorScheme as useSystemColorScheme, View } from 'react-native';
import { PortalHost } from '@rn-primitives/portal';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();
  const colorScheme = systemColorScheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme, setColorScheme]);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
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
