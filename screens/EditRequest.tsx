import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useRequests } from '../features/requests/request-mock-store';
import { RequestWizard } from '../features/requests/RequestWizard';
import { Screen } from '@/components/screen';
import { BackHeader } from '@/components/PageHeader';

export default function EditRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { requests } = useRequests();
  const request = requests.find(r => r.id === id);

  if (!request) {
    return (
      <Screen contentClassName="items-center justify-center p-6">
        <Text>Request not found.</Text>
        <Button onPress={() => router.back()} className="mt-4">
          <Text>Go Back</Text>
        </Button>
      </Screen>
    );
  }

  return (
    <>
      <BackHeader title="Edit Request" onBack={() => router.back()} />
      <Screen scrollable contentClassName="flex-1">
        <View className="px-4 py-6 flex-1">
          <RequestWizard existingRequest={request} />
        </View>
      </Screen>
    </>
  );
}
