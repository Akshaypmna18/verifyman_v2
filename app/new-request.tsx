import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { EmptyState } from '@/components/ui/empty-state';
import { VERIFICATION_TYPE_META } from '@/lib/mock-backend';
import { VERIFICATION_TYPES, type VerificationType } from '@/lib/verification-types';
import { FilePlus2 } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

function isVerificationType(value: string | undefined): value is VerificationType {
  return VERIFICATION_TYPES.some((type) => type === value);
}

export default function NewRequestPage() {
  const router = useRouter();
  const { service } = useLocalSearchParams<{ service?: string }>();
  const selectedType = isVerificationType(service) ? service : undefined;
  const selectedService = selectedType ? VERIFICATION_TYPE_META[selectedType] : undefined;

  return (
    <>
      <BackHeader title="New Request" onBack={() => router.back()} />
      <Screen scrollable contentClassName="px-4 py-5">
        <EmptyState
          icon={FilePlus2}
          tone="brand"
          title="Coming soon"
          description={
            selectedService
              ? `The submission wizard for ${selectedService.label} will be available here.`
              : 'The candidate submission wizard will be available here.'
          }
        />
      </Screen>
    </>
  );
}
