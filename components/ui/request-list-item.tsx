import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from './button';
import { RequestStatusBadge } from './request-status-badge';
import { VerificationRequest } from '../../features/requests/request-mock-store';
import { Card } from './card';
import { useRouter } from 'expo-router';

interface RequestListItemProps {
  request: VerificationRequest;
}

export function RequestListItem({ request }: RequestListItemProps) {
  const router = useRouter();

  return (
    <Card className="gap-2 py-4">
      <View className="flex-row justify-between items-start px-4">
        <Text className="font-bold text-lg">{request.candidateName}</Text>
        <RequestStatusBadge status={request.status} />
      </View>
      <View className="px-4">
        <Text className="text-muted-foreground text-sm">{request.referenceNumber}</Text>
        <Text className="text-sm">{request.serviceType}</Text>
      </View>
      <View className="flex-row justify-between items-center px-4 mt-2">
        <Text className="text-xs text-muted-foreground">{new Date(request.createdAt).toLocaleDateString()}</Text>
        <View className="flex-row gap-2">
          <Button variant="ghost" size="sm" onPress={() => router.push(`/requests/${request.id}`)}>
            <Text>View</Text>
          </Button>
          <Button variant="outline" size="sm" onPress={() => router.push(`/requests/${request.id}/edit`)}>
            <Text>Edit</Text>
          </Button>
        </View>
      </View>
    </Card>
  );
}
