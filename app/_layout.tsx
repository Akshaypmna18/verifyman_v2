import '@/global.css';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { NAV_THEME, THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const primaryColor = THEME[colorScheme ?? 'light'].primary;
  const tabBarColor = THEME[colorScheme ?? 'light'].card;

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <NativeTabs tintColor={primaryColor} backgroundColor={tabBarColor}>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="requests">
          <NativeTabs.Trigger.Icon sf="checkmark.square.fill" md="check_box" />
          <NativeTabs.Trigger.Label>Requests</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="services">
          <NativeTabs.Trigger.Icon sf="square.grid.2x2.fill" md="apps" />
          <NativeTabs.Trigger.Label>Services</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="alerts">
          <NativeTabs.Trigger.Icon sf="bell.fill" md="notifications" />
          <NativeTabs.Trigger.Label>Alerts</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
          <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
      <PortalHost />
    </ThemeProvider>
  );
}
