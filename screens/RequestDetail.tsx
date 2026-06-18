import { View, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useRequests, deleteRequest } from '../features/requests/request-mock-store';
import { RequestHeader } from '../features/requests/request-detail/RequestHeader';
import { ServiceDetailRenderer } from '../features/requests/request-detail/ServiceDetailRenderer';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/screen';
import { BackHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/ui/section-header';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react-native';

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
    <>
      <BackHeader title="Request Detail" onBack={() => router.back()} />
      <Screen scrollable>
        <RequestHeader request={request} />
        
        <View className="px-4 py-6 gap-6">
          <View>
            <SectionHeader title="Candidate Info" />
            <Card className="p-5 gap-5">
              <Field label="Full Name" value={request.candidateName} />
              <View className="h-[1px] bg-border/50" />
              <Field label="Email" value={request.data.candidate.email} />
              <View className="h-[1px] bg-border/50" />
              <Field label="Mobile" value={request.data.candidate.mobile} />
            </Card>
          </View>

          <View>
            <SectionHeader title="Service Information" />
            <Card className="p-5 gap-5">
              <ServiceDetailRenderer request={request} />
            </Card>
          </View>
        </View>

        <View className="px-4 pb-10 gap-3">
          <View className="flex-row gap-3">
            <Button 
              variant="secondary" 
              onPress={() => router.push(`/requests/${id}/edit`)} 
              className="flex-1 rounded-full h-12"
            >
              <Pencil size={18} strokeWidth={2.5} color="currentColor" />
              <Text className="font-bold">Edit Request</Text>
            </Button>
            <Button 
              variant="outline" 
              onPress={handleDelete} 
              className="flex-1 rounded-full h-12 border-destructive/20 active:bg-destructive/5"
            >
              <Trash2 size={18} strokeWidth={2.5} color="#ef4444" />
              <Text className="text-destructive font-bold">Delete</Text>
            </Button>
          </View>
          <Button 
            variant="ghost" 
            onPress={() => router.back()} 
            className="rounded-full h-12"
          >
            <ArrowLeft size={18} strokeWidth={2.5} color="currentColor" />
            <Text className="font-bold">Back to List</Text>
          </Button>
        </View>
      </Screen>
    </>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View className="gap-1">
      <Text className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">{label}</Text>
      <Text className="text-[16px] font-semibold text-foreground">{value}</Text>
    </View>
  );
}
