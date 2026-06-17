import { View, ScrollView, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useRequests, deleteRequest } from '../features/requests/request-mock-store';
import { RequestHeader } from '../features/requests/request-detail/RequestHeader';
import { ServiceDetailRenderer } from '../features/requests/request-detail/ServiceDetailRenderer';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/screen';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { requests } = useRequests();
  const request = requests.find(r => r.id === id);

  const handleDelete = () => {
    const title = 'Delete Request';
    const message = 'Are you sure you want to delete this request?\n\nThis action cannot be undone.';

    if (Platform.OS === 'web') {
      if (confirm(`${title}\n\n${message}`)) {
        performDelete();
      }
      return;
    }

    Alert.alert(
      title,
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: performDelete
        },
      ]
    );
  };

  const performDelete = async () => {
    try {
      if (id) {
        await deleteRequest(id);
        router.replace('/(tabs)/requests');
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        alert('Failed to delete request. Please try again.');
      } else {
        Alert.alert('Error', 'Failed to delete request. Please try again.');
      }
    }
  };

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
      <RequestHeader request={request} />
      
      <View className="p-4 gap-6">
        <Card className="p-4 gap-4">
          <Text className="font-bold text-lg">Candidate Info</Text>
          <Field label="Full Name" value={request.candidateName} />
          <Field label="Email" value={request.data.candidate.email} />
          <Field label="Mobile" value={request.data.candidate.mobile} />
        </Card>

        <Card className="p-4 gap-4">
          <Text className="font-bold text-lg">Service Information</Text>
          <ServiceDetailRenderer request={request} />
        </Card>
      </View>

      <View className="p-4 gap-4 flex-row">
        <Button variant="outline" onPress={() => router.back()} className="flex-1">
          <Text>Back</Text>
        </Button>
        <Button onPress={() => router.push(`/requests/${id}/edit`)} className="flex-1">
          <Text>Edit</Text>
        </Button>
        <Button variant="ghost" onPress={handleDelete} className="flex-1 border border-destructive/20">
          <Text className="text-destructive">Delete</Text>
        </Button>
      </View>
    </Screen>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View>
      <Text className="text-muted-foreground text-sm">{label}</Text>
      <Text className="text-base font-semibold">{value}</Text>
    </View>
  );
}
