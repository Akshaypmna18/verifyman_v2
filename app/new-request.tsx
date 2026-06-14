import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { EmptyState } from '@/components/ui/empty-state';
import { FilePlus2 } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function NewRequestPage() {
  const router = useRouter();
  const { service } = useLocalSearchParams<{ service?: string }>();

  return (
    <>
      <BackHeader title="New Request" onBack={() => router.back()} />
      <Screen scrollable contentClassName="px-4 py-5">
        <EmptyState
          icon={FilePlus2}
          tone="brand"
          title="Coming soon"
          description={
            service
              ? `The submission wizard for the ${service} check will be available here.`
              : 'The candidate submission wizard will be available here.'
          }
        />
      </Screen>
    </>
  );
}
