import { Screen } from '@/components/screen';
import { RequestList } from '@/features/requests/request-list/RequestList';
import { useRequests } from '@/features/requests/request-mock-store';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function RequestsPage() {
  const { requests, loading, error } = useRequests();

  if (loading && requests.length === 0) {
    return (
      <Screen contentClassName="items-center justify-center p-6">
        <Text>Loading requests...</Text>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen contentClassName="items-center justify-center p-6">
        <Text className="text-destructive">Error loading requests.</Text>
      </Screen>
    );
  }

  const total = requests.length;
  const running = requests.filter(r => r.status === 'running').length;
  const completed = requests.filter(r => r.status === 'completed').length;
  const issues = requests.filter(r => ['failed', 'insufficient', 'discrepancy'].includes(r.status)).length;

  return (
    <Screen scrollable contentClassName="px-4 py-4 gap-4">
        <View>
          <Text className="text-2xl font-bold">Requests</Text>
          <Text className="text-muted-foreground">Manage your verification requests</Text>
        </View>

        <View className="flex-row gap-2">
          <Card className="flex-1 p-4 items-center">
            <Text className="text-muted-foreground text-xs uppercase font-bold">Total</Text>
            <Text className="text-xl font-bold">{total}</Text>
          </Card>
          <Card className="flex-1 p-4 items-center">
            <Text className="text-muted-foreground text-xs uppercase font-bold">Running</Text>
            <Text className="text-xl font-bold">{running}</Text>
          </Card>
          <Card className="flex-1 p-4 items-center">
            <Text className="text-muted-foreground text-xs uppercase font-bold">Completed</Text>
            <Text className="text-xl font-bold">{completed}</Text>
          </Card>
          <Card className="flex-1 p-4 items-center">
            <Text className="text-muted-foreground text-xs uppercase font-bold">Issues</Text>
            <Text className="text-xl font-bold">{issues}</Text>
          </Card>
        </View>
      
      <RequestList requests={requests} />
    </Screen>
  );
}
