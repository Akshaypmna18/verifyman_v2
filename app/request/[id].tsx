import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { EmptyState } from '@/components/ui/empty-state';
import { FileText } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RequestDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <BackHeader title={id ? `Request ${id}` : 'Request'} onBack={() => router.back()} />
      <Screen scrollable contentClassName="px-4 py-5">
        <EmptyState
          icon={FileText}
          tone="blue"
          title="Coming soon"
          description="The full check-by-check verification breakdown will be available here."
        />
      </Screen>
    </>
  );
}
