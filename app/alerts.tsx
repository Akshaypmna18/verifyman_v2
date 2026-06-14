import { Screen } from '@/components/screen';
import { AlertRow } from '@/components/ui/alert-row';
import { Text } from '@/components/ui/text';
import { MOCK_ALERTS, MOCK_ALERT_TYPE_CONFIG } from '@/lib/mock-backend';
import type { MockAlert } from '@/lib/mock-backend';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

// ─── Sub-components ──────────────────────────────────────────────────────────

function GroupSection({
  title,
  items,
  onItemPress,
}: {
  title: string;
  items: MockAlert[];
  onItemPress: (item: MockAlert) => void;
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
          const config = MOCK_ALERT_TYPE_CONFIG[item.type];
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
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const unreadCount = alerts.filter((a) => a.unread).length;
  const today     = alerts.filter((a) => a.group === 'today');
  const yesterday = alerts.filter((a) => a.group === 'yesterday');
  const earlier   = alerts.filter((a) => a.group === 'earlier');

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, unread: false })));
  }

  function openAlert(item: MockAlert) {
    setAlerts((prev) => prev.map((a) => (a.id === item.id ? { ...a, unread: false } : a)));
    if (item.requestId) router.push(`/request/${item.requestId}`);
    else router.push('/reports');
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Alerts',
          headerBackTitle: 'Back',
          headerRight: () =>
            unreadCount > 0 ? (
              <Pressable onPress={markAllRead} hitSlop={8}>
                <Text className="text-[13px] font-bold text-primary">
                  Mark all read
                </Text>
              </Pressable>
            ) : null,
        }}
      />

      <Screen scrollable contentClassName="px-0 py-3 gap-0">
        <GroupSection title="Today" items={today} onItemPress={openAlert} />
        <GroupSection title="Yesterday" items={yesterday} onItemPress={openAlert} />
        <GroupSection title="Earlier" items={earlier} onItemPress={openAlert} />
        <View className="h-4" />
      </Screen>
    </>
  );
}
