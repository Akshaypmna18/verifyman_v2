import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function SettingsPage() {
  return (
    <>
      <BackHeader title="Settings" onBack={() => {}} />
      <Screen scrollable contentClassName="px-4 py-5">
        <View className="flex-1 items-center justify-center py-20 gap-2">
          <Text className="text-[17px] font-extrabold text-foreground" style={{ letterSpacing: -0.3 }}>
            Coming soon
          </Text>
          <Text className="text-[14px] font-medium text-muted-foreground text-center">
            App preferences, theme and notification settings will be available here.
          </Text>
        </View>
      </Screen>
    </>
  );
}
