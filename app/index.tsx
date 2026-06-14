import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { FAB } from '@/components/ui/fab';
import { IconChip } from '@/components/ui/icon-chip';
import { RequestCard } from '@/components/ui/request-card';
import { StatCard } from '@/components/ui/stat-card';
import { Text } from '@/components/ui/text';
import {
  Briefcase,
  CheckCircle,
  Clock,
  GraduationCap,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATS = [
  { label: 'Total', value: 148, caption: 'This month', icon: Users, tone: 'brand' as const },
  { label: 'Cleared', value: 127, caption: '85.8% clear rate', icon: CheckCircle, tone: 'brand' as const },
  { label: 'Running', value: 14, caption: 'In progress', icon: TrendingUp, tone: 'amber' as const },
  { label: 'Avg time', value: '27m', caption: '−8m vs last mo', icon: Clock, tone: 'blue' as const },
];

const RECENT_REQUESTS = [
  {
    id: 'VM-20260614-148',
    name: 'Arjun Patel',
    rid: 'VM-20260614-148',
    service: 'Identity Verification',
    serviceIcon: ShieldCheck,
    date: '14 Jun 2026',
    status: 'running' as const,
    priority: 'Normal priority',
  },
  {
    id: 'VM-20260613-147',
    name: 'Priya Sharma',
    rid: 'VM-20260613-147',
    service: 'Employment Verification',
    serviceIcon: Briefcase,
    date: '13 Jun 2026',
    status: 'done' as const,
    priority: 'High priority',
  },
  {
    id: 'VM-20260612-146',
    name: 'Vikas Menon',
    rid: 'VM-20260612-146',
    service: 'Address Verification',
    serviceIcon: MapPin,
    date: '12 Jun 2026',
    status: 'flag' as const,
    priority: 'Normal priority',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text
        className="text-[17px] font-extrabold text-foreground"
        style={{ letterSpacing: -0.3 }}
      >
        {title}
      </Text>
      {action && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text className="text-[13px] font-bold text-primary">{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

function QuickActions() {
  const actions = [
    { label: 'Identity', icon: ShieldCheck, tone: 'brand' as const },
    { label: 'Employment', icon: Briefcase, tone: 'blue' as const },
    { label: 'Education', icon: GraduationCap, tone: 'amber' as const },
    { label: 'Address', icon: MapPin, tone: 'slate' as const },
  ];

  return (
    <View>
      <SectionHeader title="Quick Request" />
      <View className="flex-row justify-between gap-2">
        {actions.map((a) => (
          <Pressable
            key={a.label}
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
  return (
    <>
      <PageHeader
        userInitials="JP"
        notificationCount={3}
        onNotificationPress={() => {}}
        onProfilePress={() => {}}
      />
      <Screen scrollable contentClassName="px-4 py-5 gap-5">
        {/* Greeting */}
        <View className="gap-0.5">
          <Text
            className="text-[26px] font-extrabold text-foreground"
            style={{ letterSpacing: -0.8, lineHeight: 32 }}
          >
            Good morning, Junaid 👋
          </Text>
          <Text className="text-[14px] font-semibold text-muted-foreground mt-1">
            Rentowl LLP · HR Dashboard
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
        <QuickActions />

        {/* Recent verifications */}
        <View>
          <SectionHeader title="Recent Verifications" action="View all" onAction={() => {}} />
          <View className="gap-3">
            {RECENT_REQUESTS.map((r) => (
              <RequestCard
                key={r.id}
                name={r.name}
                rid={r.rid}
                service={r.service}
                serviceIcon={r.serviceIcon}
                date={r.date}
                status={r.status}
                priority={r.priority}
                payNow={r.status === 'flag'}
                onPress={() => {}}
                onMorePress={() => {}}
                onPayPress={() => {}}
              />
            ))}
          </View>
        </View>

        {/* Bottom spacer for FAB */}
        <View className="h-10" />
      </Screen>

      <FAB onPress={() => {}} />
    </>
  );
}
