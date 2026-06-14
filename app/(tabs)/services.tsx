import { PageHeader } from '@/components/PageHeader';
import { MOCK_NOTIFICATION_COUNT } from '@/lib/mock-notifications';
import { MOCK_ACCOUNT, MOCK_SERVICE_CATALOG } from '@/lib/mock-backend';
import { Screen } from '@/components/screen';
import { ServiceCard } from '@/components/ui/service-card';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { ShieldCheck } from 'lucide-react-native';
import { View } from 'react-native';

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ServicesPage() {
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
        {/* Hero */}
        <View className="gap-0.5">
          <Text
            className="text-[26px] font-extrabold text-foreground"
            style={{ letterSpacing: -0.8, lineHeight: 32 }}
          >
            Verification Services
          </Text>
          <Text className="text-[14px] font-semibold text-muted-foreground mt-1">
            Select a module to start a new check. Pricing is per successful verification.
          </Text>
        </View>

        {/* Service list */}
        <View className="gap-4">
          {MOCK_SERVICE_CATALOG.map((s) => (
            <ServiceCard
              key={s.id}
              name={s.name}
              description={s.description}
              icon={s.icon}
              tone={s.tone}
              badge={s.badge}
              startingPrice={s.startingPrice}
              onPress={() => router.push(`/new-request?service=${s.id}`)}
            />
          ))}
        </View>

        {/* Compliance footer */}
        <View className="bg-accent/60 border border-accent rounded-2xl p-4 flex-row items-center gap-3">
          <ShieldCheck size={20} strokeWidth={2} className="text-primary flex-none" />
          <Text className="flex-1 text-[12.5px] font-semibold text-foreground leading-[18px]">
            All checks are encrypted end-to-end and stored in Indian data centres per DPDP guidelines.
          </Text>
        </View>

        <View className="h-4" />
      </Screen>
    </>
  );
}
