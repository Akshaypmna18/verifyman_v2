import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { StatusBadge } from '@/components/ui/status-badge';
import { Text } from '@/components/ui/text';
import {
  VERIFICATION_TYPE_META,
  getMockVerificationRequest,
  mapRequestStatusToBadge,
} from '@/lib/mock-backend';
import { FileText } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-start justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <Text className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </Text>
      <Text className="flex-1 text-right text-[14px] font-semibold text-foreground">
        {value}
      </Text>
    </View>
  );
}

export default function RequestDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const request = id ? getMockVerificationRequest(id) : undefined;

  if (!request) {
    return (
      <>
        <BackHeader title="Request" onBack={() => router.back()} />
        <Screen scrollable contentClassName="px-4 py-5">
          <EmptyState
            icon={FileText}
            tone="slate"
            title="Request not found"
            description="This mock request does not exist in the local backend data."
          />
        </Screen>
      </>
    );
  }

  const meta = VERIFICATION_TYPE_META[request.type];

  return (
    <>
      <BackHeader title={request.id} onBack={() => router.back()} />
      <Screen scrollable contentClassName="px-4 py-5 gap-4">
        <Card className="gap-4 rounded-2xl py-5">
          <CardHeader className="px-4">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1">
                <CardTitle className="text-[20px] font-extrabold text-foreground">
                  {request.candidateName}
                </CardTitle>
                <Text className="mt-1 text-[13px] font-semibold text-muted-foreground">
                  {meta.label}
                </Text>
              </View>
              <StatusBadge status={mapRequestStatusToBadge(request.status)} />
            </View>
          </CardHeader>
          <CardContent className="px-4">
            <DetailRow label="Backend status" value={request.status} />
            <DetailRow label="Submitted" value={request.displayDate} />
            <DetailRow label="Priority" value={request.priority} />
            <DetailRow label="Type" value={request.type} />
          </CardContent>
        </Card>

        <Card className="gap-3 rounded-2xl py-5">
          <CardHeader className="px-4">
            <CardTitle className="text-[16px] font-extrabold text-foreground">
              Mock Payload
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <View className="rounded-xl bg-secondary p-3">
              <Text className="font-mono text-[11px] leading-[17px] text-muted-foreground">
                {JSON.stringify(request.data, null, 2)}
              </Text>
            </View>
          </CardContent>
        </Card>
      </Screen>
    </>
  );
}
