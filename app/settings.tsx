import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { EmptyState } from '@/components/ui/empty-state';
import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <>
      <BackHeader title="Settings" onBack={() => router.back()} />
      <Screen scrollable contentClassName="px-4 py-5">
        <EmptyState
          icon={Settings}
          tone="slate"
          title="Coming soon"
          description="App preferences, theme and notification settings will be available here."
        />
      </Screen>
    </>
  );
}
