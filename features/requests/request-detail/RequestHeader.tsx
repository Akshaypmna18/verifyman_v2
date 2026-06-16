import { View } from 'react-native';
import { VerificationRequest } from '../request-mock-store';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { RequestStatusBadge } from '@/components/ui/request-status-badge';

interface RequestDetailProps {
  request: VerificationRequest;
}

export function RequestHeader({ request }: RequestDetailProps) {
  return (
    <View className="p-4 gap-2">
      <Text className="text-xl font-bold">{request.serviceType}</Text>
      <Text className="text-muted-foreground">{request.referenceNumber}</Text>
      <RequestStatusBadge status={request.status} />
    </View>
  );
}
