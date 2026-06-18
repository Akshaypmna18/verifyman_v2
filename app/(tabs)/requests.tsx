import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { RequestList } from '@/features/requests/request-list/RequestList';
import { useRequests } from '@/features/requests/request-mock-store';
import { StatCard } from '@/components/ui/stat-card';
import { Text } from '@/components/ui/text';
import { View, ActivityIndicator } from 'react-native';
import { MOCK_ACCOUNT } from '@/lib/mock-backend';
import { MOCK_NOTIFICATION_COUNT } from '@/lib/mock-notifications';
import { useRouter } from 'expo-router';
import { AlertCircle, CheckCircle, TrendingUp, Users } from 'lucide-react-native';

export default function RequestsPage() {
  const router = useRouter();
  const { requests, loading, error } = useRequests();

  if (loading && requests.length === 0) {
    return (
      <>
        <PageHeader
          userInitials={MOCK_ACCOUNT.initials}
          notificationCount={MOCK_NOTIFICATION_COUNT}
        />
        <Screen contentClassName="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="hsl(143 82% 36%)" />
          <Text className="mt-4 text-muted-foreground font-medium">Loading requests...</Text>
        </Screen>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader
          userInitials={MOCK_ACCOUNT.initials}
          notificationCount={MOCK_NOTIFICATION_COUNT}
        />
        <Screen contentClassName="items-center justify-center flex-1 px-10">
          <View className="items-center">
            <Text className="text-xl font-bold text-center">Failed to load data</Text>
            <Text className="text-muted-foreground text-center mt-2">
              We couldn't retrieve your verification requests. Please try again later.
            </Text>
          </View>
        </Screen>
      </>
    );
  }

  const total = requests.length;
  const running = requests.filter(r => ['pending', 'running', 'processing', 'in-progress', 'qa_pending'].includes(r.status)).length;
  const completed = requests.filter(r => r.status === 'completed').length;
  const issues = requests.filter(r => ['failed', 'insufficient', 'discrepancy'].includes(r.status)).length;

  return (
    <>
      <PageHeader
        userInitials={MOCK_ACCOUNT.initials}
        notificationCount={MOCK_NOTIFICATION_COUNT}
        onNotificationPress={() => router.push('/alerts')}
        onProfilePress={() => router.push('/profile')}
      />
      <Screen scrollable contentClassName="px-4 py-5 gap-5">
        <View className="gap-0.5">
          <Text
            className="text-[26px] font-extrabold text-foreground"
            style={{ letterSpacing: -0.8, lineHeight: 32 }}
          >
            Requests
          </Text>
          <Text className="text-[14px] font-semibold text-muted-foreground mt-1">
            Manage and track all your verification requests
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-3">
          <View className="flex-1" style={{ minWidth: 140 }}>
            <StatCard
              label="Total"
              value={total}
              icon={Users}
              tone="brand"
            />
          </View>
          <View className="flex-1" style={{ minWidth: 140 }}>
            <StatCard
              label="Running"
              value={running}
              icon={TrendingUp}
              tone="amber"
            />
          </View>
          <View className="flex-1" style={{ minWidth: 140 }}>
            <StatCard
              label="Completed"
              value={completed}
              icon={CheckCircle}
              tone="brand"
            />
          </View>
          <View className="flex-1" style={{ minWidth: 140 }}>
            <StatCard
              label="Issues"
              value={issues}
              icon={AlertCircle}
              tone="red"
            />
          </View>
        </View>
        
        <RequestList requests={requests} />
      </Screen>
    </>
  );
}
