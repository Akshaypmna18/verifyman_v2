import { View } from 'react-native';
import { VerificationRequest } from '../request-mock-store';
import { RequestListItem } from '@/components/ui/request-list-item';
import { Text } from '@/components/ui/text';

interface RequestListProps {
  requests: VerificationRequest[];
}

export function RequestList({ requests }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <View className="py-8 items-center bg-card border border-border rounded-3xl border-dashed">
        <Text className="text-muted-foreground font-medium">No requests found</Text>
        <Text className="text-[12px] text-muted-foreground mt-1">
          New requests will appear here
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-3">
      {requests.map((request) => (
        <RequestListItem key={request.id} request={request} />
      ))}
    </View>
  );
}
