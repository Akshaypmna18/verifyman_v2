import { View } from 'react-native';
import { Text } from '../components/ui/text';
import { RequestList } from '../features/requests/request-list/RequestList';
import { useRequests } from '../features/requests/request-mock-store';
import { Card } from '../components/ui/card';

export default function RequestsScreen() {
  const { requests } = useRequests();

  const total = requests.length;
  const running = requests.filter(r => r.status === 'running').length;
  const completed = requests.filter(r => r.status === 'completed').length;
  const issues = requests.filter(r => ['failed', 'insufficient', 'discrepancy'].includes(r.status)).length;

  return (
    <View className="flex-1 bg-background">
      <View className="p-4 gap-4">
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
      </View>

      <RequestList requests={requests} />
    </View>
  );
}
