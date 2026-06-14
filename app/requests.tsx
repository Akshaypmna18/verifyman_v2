import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { FAB } from '@/components/ui/fab';
import { RequestCard } from '@/components/ui/request-card';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { Text } from '@/components/ui/text';
import type { BadgeStatus } from '@/components/ui/status-badge';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Scale,
  ShieldCheck,
  ClipboardList,
} from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

// ─── Mock data ────────────────────────────────────────────────────────────────

type RequestItem = {
  id: string;
  name: string;
  service: string;
  serviceIcon: typeof ShieldCheck;
  date: string;
  status: BadgeStatus;
  priority: string;
  payNow?: boolean;
};

const ALL_REQUESTS: RequestItem[] = [
  {
    id: 'VM-20260614-148',
    name: 'Arjun Patel',
    service: 'Identity Verification',
    serviceIcon: ShieldCheck,
    date: '14 Jun 2026',
    status: 'running',
    priority: 'Normal priority',
  },
  {
    id: 'VM-20260613-147',
    name: 'Priya Sharma',
    service: 'Employment Verification',
    serviceIcon: Briefcase,
    date: '13 Jun 2026',
    status: 'done',
    priority: 'High priority',
  },
  {
    id: 'VM-20260612-146',
    name: 'Vikas Menon',
    service: 'Address Verification',
    serviceIcon: MapPin,
    date: '12 Jun 2026',
    status: 'flag',
    priority: 'Normal priority',
    payNow: true,
  },
  {
    id: 'VM-20260611-145',
    name: 'Aarya Rao',
    service: 'Education Verification',
    serviceIcon: GraduationCap,
    date: '11 Jun 2026',
    status: 'done',
    priority: 'Normal priority',
  },
  {
    id: 'VM-20260610-144',
    name: 'Rahul Verma',
    service: 'Background Check',
    serviceIcon: ClipboardList,
    date: '10 Jun 2026',
    status: 'running',
    priority: 'High priority',
  },
  {
    id: 'VM-20260609-143',
    name: 'Sneha Iyer',
    service: 'Identity Verification',
    serviceIcon: ShieldCheck,
    date: '9 Jun 2026',
    status: 'done',
    priority: 'Normal priority',
  },
  {
    id: 'VM-20260608-142',
    name: 'Kiran Desai',
    service: 'Police Clearance',
    serviceIcon: Scale,
    date: '8 Jun 2026',
    status: 'flag',
    priority: 'Urgent',
    payNow: true,
  },
  {
    id: 'VM-20260607-141',
    name: 'Rohan Gupta',
    service: 'Employment Verification',
    serviceIcon: Briefcase,
    date: '7 Jun 2026',
    status: 'running',
    priority: 'Normal priority',
  },
  {
    id: 'VM-20260606-140',
    name: 'Meera Nair',
    service: 'Education Verification',
    serviceIcon: GraduationCap,
    date: '6 Jun 2026',
    status: 'done',
    priority: 'Normal priority',
  },
  {
    id: 'VM-20260605-139',
    name: 'Ananya Singh',
    service: 'Address Verification',
    serviceIcon: MapPin,
    date: '5 Jun 2026',
    status: 'unknown',
    priority: 'Normal priority',
  },
];

type TabId = 'all' | 'running' | 'done' | 'flag';

const TABS = [
  { id: 'all' as TabId, label: 'All' },
  { id: 'running' as TabId, label: 'Running' },
  { id: 'done' as TabId, label: 'Done' },
  { id: 'flag' as TabId, label: 'Flagged' },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function RequestsPage() {
  const [tab, setTab] = useState<TabId>('all');

  const filtered = ALL_REQUESTS.filter((r) => {
    if (tab === 'all') return true;
    if (tab === 'flag') return r.status === 'flag' || r.status === 'unknown';
    return r.status === tab;
  });

  return (
    <>
      <PageHeader userInitials="JP" onProfilePress={() => {}} />

      {/* Segmented control pinned below header */}
      <View className="bg-card border-b border-border px-4 py-3">
        <SegmentedControl options={TABS} value={tab} onChange={setTab} />
      </View>

      <Screen scrollable contentClassName="px-4 py-4 gap-3">
        {filtered.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20 gap-3">
            <Text className="text-[15px] font-semibold text-muted-foreground text-center">
              No {tab === 'flag' ? 'flagged' : tab} verifications found.
            </Text>
          </View>
        ) : (
          <>
            <Text className="text-[12px] font-bold tracking-widest uppercase text-muted-foreground mb-1">
              {filtered.length} verification{filtered.length !== 1 ? 's' : ''}
            </Text>
            {filtered.map((r) => (
              <RequestCard
                key={r.id}
                name={r.name}
                rid={r.id}
                service={r.service}
                serviceIcon={r.serviceIcon}
                date={r.date}
                status={r.status}
                priority={r.priority}
                payNow={r.payNow}
                onPress={() => {}}
                onMorePress={() => {}}
                onPayPress={() => {}}
              />
            ))}
            <View className="h-10" />
          </>
        )}
      </Screen>

      <FAB onPress={() => {}} />
    </>
  );
}
