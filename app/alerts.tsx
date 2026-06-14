import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { AlertRow } from '@/components/ui/alert-row';
import type { IconChipTone } from '@/components/ui/icon-chip';
import { StickySubHeader } from '@/components/ui/sticky-sub-header';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import type { LucideIcon } from 'lucide-react-native';
import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Info,
  RefreshCw,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

// ─── Types & data ────────────────────────────────────────────────────────────

type AlertType = 'report' | 'discrepancy' | 'payment' | 'started' | 'system';

type AlertItem = {
  id: string;
  type: AlertType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  group: 'today' | 'yesterday' | 'earlier';
};

const TYPE_CONFIG: Record<
  AlertType,
  { icon: LucideIcon; tone: IconChipTone }
> = {
  report:      { icon: CheckCircle,   tone: 'brand'  },
  discrepancy: { icon: AlertTriangle, tone: 'red'    },
  payment:     { icon: CreditCard,    tone: 'amber'  },
  started:     { icon: RefreshCw,     tone: 'blue'   },
  system:      { icon: Info,          tone: 'slate'  },
};

const ALERTS: AlertItem[] = [
  {
    id: '1',
    type: 'report',
    title: 'Arjun Patel — Report ready',
    body: 'Identity check completed. All documents verified successfully. Clear to proceed.',
    time: '9:14 AM',
    unread: true,
    group: 'today',
  },
  {
    id: '2',
    type: 'discrepancy',
    title: 'Vikas Menon — Discrepancy found',
    body: 'Address provided does not match government records. Review required before proceeding.',
    time: '8:02 AM',
    unread: true,
    group: 'today',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment required — Kiran Desai',
    body: 'Police clearance certificate request requires payment of ₹499 before processing.',
    time: '7:30 AM',
    unread: true,
    group: 'today',
  },
  {
    id: '4',
    type: 'started',
    title: 'Rahul Verma — Verification started',
    body: 'Background check initiated. Running identity, employment and criminal checks simultaneously.',
    time: 'Yesterday, 4:55 PM',
    unread: false,
    group: 'yesterday',
  },
  {
    id: '5',
    type: 'report',
    title: 'Sneha Iyer — Report ready',
    body: 'Employment verification completed. All previous employers confirmed. No discrepancies.',
    time: 'Yesterday, 2:11 PM',
    unread: false,
    group: 'yesterday',
  },
  {
    id: '6',
    type: 'system',
    title: 'New service available: Court Records',
    body: 'District and high court record checks are now available for all clients. Tap to learn more.',
    time: 'Yesterday, 10:00 AM',
    unread: false,
    group: 'yesterday',
  },
  {
    id: '7',
    type: 'report',
    title: 'Aarya Rao — Report ready',
    body: 'Education verification completed. Degree from BITS Pilani confirmed and authentic.',
    time: '11 Jun',
    unread: false,
    group: 'earlier',
  },
  {
    id: '8',
    type: 'report',
    title: 'Meera Nair — Report ready',
    body: 'All checks completed successfully. CGPA of 8.9 from VIT University verified.',
    time: '10 Jun',
    unread: false,
    group: 'earlier',
  },
  {
    id: '9',
    type: 'payment',
    title: 'Payment received — ₹2,499',
    body: 'Payment for bulk verification batch (5 candidates) received. Processing initiated.',
    time: '9 Jun',
    unread: false,
    group: 'earlier',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GroupSection({
  title,
  items,
  onItemPress,
}: {
  title: string;
  items: AlertItem[];
  onItemPress: (item: AlertItem) => void;
}) {
  if (items.length === 0) return null;

  return (
    <View className="mb-2">
      {/* Group label */}
      <View className="px-4 py-2">
        <Text className="text-[11px] font-extrabold tracking-widest uppercase text-muted-foreground">
          {title}
        </Text>
      </View>

      {/* Alert rows with hairline dividers */}
      <View className="bg-card border border-border rounded-2xl overflow-hidden">
        {items.map((item, idx) => {
          const config = TYPE_CONFIG[item.type];
          return (
            <View key={item.id}>
              <AlertRow
                icon={config.icon}
                tone={config.tone}
                title={item.title}
                body={item.body}
                time={item.time}
                unread={item.unread}
                onPress={() => onItemPress(item)}
              />
              {idx < items.length - 1 && <View className="h-px bg-border mx-4" />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function AlertsPage() {
  const router = useRouter();
  const [alerts, setAlerts] = useState(ALERTS);

  const unreadCount = alerts.filter((a) => a.unread).length;
  const today     = alerts.filter((a) => a.group === 'today');
  const yesterday = alerts.filter((a) => a.group === 'yesterday');
  const earlier   = alerts.filter((a) => a.group === 'earlier');

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, unread: false })));
  }

  function openAlert(item: AlertItem) {
    setAlerts((prev) => prev.map((a) => (a.id === item.id ? { ...a, unread: false } : a)));
    if (item.type === 'payment') router.push('/new-request');
    else router.push('/reports');
  }

  return (
    <>
      <PageHeader
        userInitials="JP"
        notificationCount={unreadCount}
        onProfilePress={() => router.push('/profile')}
      />

      {/* Sub-header */}
      <StickySubHeader className="py-2.5 flex-row items-center justify-between">
        <Text
          className="text-[17px] font-extrabold text-foreground"
          style={{ letterSpacing: -0.3 }}
        >
          Alerts
        </Text>
        {unreadCount > 0 && (
          <Pressable onPress={markAllRead} hitSlop={8}>
            <Text className="text-[13px] font-bold text-primary">
              Mark all as read
            </Text>
          </Pressable>
        )}
      </StickySubHeader>

      <Screen scrollable contentClassName="px-0 py-3 gap-0">
        <GroupSection title="Today" items={today} onItemPress={openAlert} />
        <GroupSection title="Yesterday" items={yesterday} onItemPress={openAlert} />
        <GroupSection title="Earlier" items={earlier} onItemPress={openAlert} />
        <View className="h-4" />
      </Screen>
    </>
  );
}
