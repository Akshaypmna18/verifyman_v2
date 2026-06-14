import { PageHeader } from '@/components/PageHeader';
import { MOCK_NOTIFICATION_COUNT } from '@/lib/mock-notifications';
import {
  MOCK_ACCOUNT,
  MOCK_VERIFICATION_REQUESTS,
  VERIFICATION_TYPE_META,
  mapRequestStatusToBadge,
} from '@/lib/mock-backend';
import { Screen } from '@/components/screen';
import { EmptyState } from '@/components/ui/empty-state';
import { FAB } from '@/components/ui/fab';
import { RequestCard } from '@/components/ui/request-card';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { StickySubHeader } from '@/components/ui/sticky-sub-header';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { SearchX } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

// ─── Filter controls ─────────────────────────────────────────────────────────

type TabId = 'all' | 'running' | 'done' | 'flag';

const TABS = [
  { id: 'all' as TabId, label: 'All' },
  { id: 'running' as TabId, label: 'Running' },
  { id: 'done' as TabId, label: 'Done' },
  { id: 'flag' as TabId, label: 'Flagged' },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function RequestsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>('all');

  const filtered = MOCK_VERIFICATION_REQUESTS.filter((r) => {
    const badgeStatus = mapRequestStatusToBadge(r.status);

    if (tab === 'all') return true;
    if (tab === 'flag') return badgeStatus === 'flag' || badgeStatus === 'unknown';
    return badgeStatus === tab;
  });

  return (
    <>
      <PageHeader
        userInitials={MOCK_ACCOUNT.initials}
        notificationCount={MOCK_NOTIFICATION_COUNT}
        onNotificationPress={() => router.push('/alerts')}
        onProfilePress={() => router.push('/profile')}
      />

      {/* Segmented control pinned below header */}
      <StickySubHeader>
        <SegmentedControl options={TABS} value={tab} onChange={setTab} />
      </StickySubHeader>

      <Screen scrollable contentClassName="px-4 py-4 gap-3">
        {filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="Nothing here yet"
            description={`No ${tab === 'flag' ? 'flagged' : tab} verifications found.`}
          />
        ) : (
          <>
            <Text className="text-[12px] font-bold tracking-widest uppercase text-muted-foreground mb-1">
              {filtered.length} verification{filtered.length !== 1 ? 's' : ''}
            </Text>
            {filtered.map((r) => (
              <RequestCard
                key={r.id}
                name={r.candidateName}
                rid={r.id}
                service={VERIFICATION_TYPE_META[r.type].label}
                serviceIcon={VERIFICATION_TYPE_META[r.type].icon}
                date={r.displayDate}
                status={mapRequestStatusToBadge(r.status)}
                priority={r.priority}
                payNow={r.paymentRequired}
                onPress={() => router.push(`/request/${r.id}`)}
                onMorePress={() => {}}
                onPayPress={() => router.push(`/request/${r.id}`)}
              />
            ))}
            <View className="h-10" />
          </>
        )}
      </Screen>

      <FAB onPress={() => router.push('/new-request')} />
    </>
  );
}
