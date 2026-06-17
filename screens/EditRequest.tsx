import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useRequests } from '../features/requests/request-mock-store';
import { RequestWizard } from '../features/requests/RequestWizard';
import { Screen } from '@/components/screen';

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
    <Screen scrollable>
      <View className="p-4">
        <Text className="text-xl font-bold mb-4">Edit Request</Text>
        <RequestWizard existingRequest={request} />
      </View>
    </Screen>
  );
}
