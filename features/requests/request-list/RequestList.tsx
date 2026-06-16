import { View, FlatList } from 'react-native';
import { VerificationRequest } from '../request-mock-store';
import { RequestListItem } from '@/components/ui/request-list-item';
import { Text } from '@/components/ui/text';

interface RequestListProps {
  requests: VerificationRequest[];
}

export function RequestList({ requests }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text>No requests found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RequestListItem request={item} />}
      contentContainerClassName="gap-4 p-4"
    />
  );
}
