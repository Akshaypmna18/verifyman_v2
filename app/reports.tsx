import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function ReportsPage() {
  return (
    <>
      <BackHeader title="Reports" onBack={() => {}} />
      <Screen scrollable contentClassName="px-4 py-5">
        <View className="flex-1 items-center justify-center py-20 gap-2">
          <Text className="text-[17px] font-extrabold text-foreground" style={{ letterSpacing: -0.3 }}>
            Coming soon
          </Text>
          <Text className="text-[14px] font-medium text-muted-foreground text-center">
            Full report viewer with check-by-check breakdown will be available here.
          </Text>
        </View>
      </Screen>
    </>
  );
}
