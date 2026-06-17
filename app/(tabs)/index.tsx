import { PageHeader } from '@/components/PageHeader';
import { MOCK_NOTIFICATION_COUNT } from '@/lib/mock-notifications';
import {
  MOCK_ACCOUNT,
} from '@/lib/mock-backend';
import { Screen } from '@/components/screen';
import { FAB } from '@/components/ui/fab';
import { IconChip } from '@/components/ui/icon-chip';
import { RequestCard } from '@/components/ui/request-card';
import { SectionHeader } from '@/components/ui/section-header';
import { StatCard } from '@/components/ui/stat-card';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Pressable, View, ActivityIndicator } from 'react-native';
import { useRequests } from '@/features/requests/request-mock-store';
import { SERVICES_DATA, SERVICE_UI_META } from '@/features/services/services-data';
import { CheckCircle, Clock, TrendingUp, Users, AlertCircle } from 'lucide-react-native';
import { useMemo } from 'react';

// ─── Sub-components ──────────────────────────────────────────────────────────

function QuickActions({ onSelect }: { onSelect: (id: string) => void }) {
  const quickServices = SERVICES_DATA.slice(0, 4);

  return (
    <View>
      <SectionHeader title="Quick Request" />
      <View className="flex-row justify-between gap-2">
        {quickServices.map((s) => {
          const meta = SERVICE_UI_META[s.type];
          return (
            <Pressable
              key={s.id}
              onPress={() => onSelect(s.type)}
              className="flex-1 items-center gap-2 py-3 rounded-2xl bg-card border border-border active:bg-secondary"
            >
              <IconChip tone={meta.tone} size="md">
                <meta.icon size={18} strokeWidth={2.2} />
              </IconChip>
              <Text className="text-[11px] font-bold text-muted-foreground text-center" numberOfLines={1}>
                {s.name.split(' ')[0]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();
  const { requests, loading, error } = useRequests();

  const stats = useMemo(() => {
    const total = requests.length;
    const completed = requests.filter(r => r.status === 'completed').length;
    const running = requests.filter(r => ['pending', 'running', 'processing', 'in-progress', 'qa_pending'].includes(r.status)).length;
    const clearRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return [
      { label: 'Total', value: total, caption: 'Overall requests', icon: Users, tone: 'brand' as const },
      {
        label: 'Cleared',
        value: completed,
        caption: `${clearRate}% clear rate`,
        icon: CheckCircle,
        tone: 'brand' as const,
      },
      {
        label: 'Running',
        value: running,
        caption: 'In progress',
        icon: TrendingUp,
        tone: 'amber' as const,
      },
      { label: 'Avg time', value: '27m', caption: 'Last 7 days', icon: Clock, tone: 'blue' as const },
    ];
  }, [requests]);

  const recentRequests = useMemo(() => {
    return [...requests]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }, [requests]);

  if (loading && requests.length === 0) {
    return (
      <>
        <PageHeader
          userInitials={MOCK_ACCOUNT.initials}
          notificationCount={MOCK_NOTIFICATION_COUNT}
        />
        <Screen contentClassName="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="hsl(143 82% 36%)" />
          <Text className="mt-4 text-muted-foreground font-medium">Loading your dashboard...</Text>
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
          <IconChip tone="red" size="lg" className="mb-4">
            <AlertCircle size={32} color="hsl(0 84.2% 60.2%)" />
          </IconChip>
          <Text className="text-xl font-bold text-center">Failed to load data</Text>
          <Text className="text-muted-foreground text-center mt-2">
            We couldn't retrieve your verification requests. Please try again later.
          </Text>
        </Screen>
      </>
    );
  }

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
            {stats.map((s) => (
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
        <QuickActions onSelect={(type) => router.push(`/new-request?type=${type}`)} />

        {/* Recent verifications */}
        <View>
          <SectionHeader
            title="Recent Verifications"
            action="View all"
            onAction={() => router.push('/requests')}
          />
          <View className="gap-3">
            {recentRequests.length === 0 ? (
              <View className="py-8 items-center bg-card border border-border rounded-3xl border-dashed">
                <Text className="text-muted-foreground font-medium">No recent verifications</Text>
                <Text className="text-[12px] text-muted-foreground mt-1">
                  New requests will appear here
                </Text>
              </View>
            ) : (
              recentRequests.map((r) => {
                const meta = SERVICE_UI_META[r.serviceType];
                const dateLabel = new Date(r.createdAt).toLocaleDateString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });
                
                // Map store status to UI badge status
                let badgeStatus: any = 'running';
                if (r.status === 'completed') badgeStatus = 'done';
                else if (['failed', 'insufficient', 'discrepancy'].includes(r.status)) badgeStatus = 'flag';

                return (
                  <RequestCard
                    key={r.id}
                    name={r.candidateName}
                    rid={r.referenceNumber}
                    service={r.serviceType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    serviceIcon={meta?.icon}
                    date={dateLabel}
                    status={badgeStatus}
                    priority="Normal priority"
                    onPress={() => router.push(`/requests/${r.id}`)}
                    onMorePress={() => {}}
                  />
                );
              })
            )}
          </View>
        </View>

        {/* Bottom spacer for FAB */}
        <View className="h-10" />
      </Screen>

      <FAB onPress={() => router.push('/new-request')} />
    </>
  );
}
