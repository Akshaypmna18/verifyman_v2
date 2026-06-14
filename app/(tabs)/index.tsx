import { PageHeader } from '@/components/PageHeader';
import { MOCK_NOTIFICATION_COUNT } from '@/lib/mock-notifications';
import {
  MOCK_ACCOUNT,
  MOCK_QUICK_ACTIONS,
  MOCK_VERIFICATION_REQUESTS,
  VERIFICATION_TYPE_META,
  getMockDashboardStats,
  mapRequestStatusToBadge,
} from '@/lib/mock-backend';
import { Screen } from '@/components/screen';
import { FAB } from '@/components/ui/fab';
import { IconChip } from '@/components/ui/icon-chip';
import { RequestCard } from '@/components/ui/request-card';
import { SectionHeader } from '@/components/ui/section-header';
import { StatCard } from '@/components/ui/stat-card';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

const RECENT_REQUESTS = MOCK_VERIFICATION_REQUESTS.slice(0, 3);
const STATS = getMockDashboardStats();

// ─── Sub-components ──────────────────────────────────────────────────────────

function QuickActions({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <View>
      <SectionHeader title="Quick Request" />
      <View className="flex-row justify-between gap-2">
        {MOCK_QUICK_ACTIONS.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => onSelect(a.id)}
            className="flex-1 items-center gap-2 py-3 rounded-2xl bg-card border border-border active:bg-secondary"
          >
            <IconChip tone={a.tone} size="md">
              <a.icon size={18} strokeWidth={2.2} />
            </IconChip>
            <Text className="text-[11px] font-bold text-muted-foreground text-center">
              {a.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <PageHeader
        userInitials={MOCK_ACCOUNT.initials}
        notificationCount={MOCK_NOTIFICATION_COUNT}
        onNotificationPress={() => router.push('/alerts')}
        onProfilePress={() => router.push('/profile')}
      />
      <Screen scrollable contentClassName="px-4 py-5 gap-5">
        {/* Greeting */}
        <View className="gap-0.5">
          <Text
            className="text-[26px] font-extrabold text-foreground"
            style={{ letterSpacing: -0.8, lineHeight: 32 }}
          >
            Good morning, {MOCK_ACCOUNT.name.split(' ')[0]}
          </Text>
          <Text className="text-[14px] font-semibold text-muted-foreground mt-1">
            {MOCK_ACCOUNT.company} · {MOCK_ACCOUNT.role} Dashboard
          </Text>
        </View>

        {/* Stats grid */}
        <View>
          <SectionHeader title="This Month" />
          <View className="flex-row flex-wrap gap-3">
            {STATS.map((s) => (
              <View key={s.label} className="flex-1" style={{ minWidth: 140 }}>
                <StatCard
                  label={s.label}
                  value={s.value}
                  caption={s.caption}
                  icon={s.icon}
                  tone={s.tone}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Quick actions */}
        <QuickActions onSelect={(id) => router.push(`/new-request?service=${id}`)} />

        {/* Recent verifications */}
        <View>
          <SectionHeader
            title="Recent Verifications"
            action="View all"
            onAction={() => router.push('/requests')}
          />
          <View className="gap-3">
            {RECENT_REQUESTS.map((r) => (
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
          </View>
        </View>

        {/* Bottom spacer for FAB */}
        <View className="h-10" />
      </Screen>

      <FAB onPress={() => router.push('/new-request')} />
    </>
  );
}
