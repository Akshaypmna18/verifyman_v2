import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck } from 'lucide-react-native';
import { PageHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { Text } from '@/components/ui/text';
import { MOCK_NOTIFICATION_COUNT } from '@/lib/mock-notifications';
import { MOCK_ACCOUNT } from '@/lib/mock-backend';
import { ServicesList } from '@/features/services';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';

export const ServicesScreen = () => {
  const router = useRouter();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // Responsive padding and max-width
  const contentPadding = isDesktop ? 'px-12' : isTablet ? 'px-6' : 'px-4';
  const headerSize = isDesktop ? 'text-[36px]' : isTablet ? 'text-[30px]' : 'text-[26px]';
  const subheadSize = isDesktop ? 'text-[16px]' : 'text-[14px]';

  return (
    <>
      <PageHeader
        userInitials={MOCK_ACCOUNT.initials}
        notificationCount={MOCK_NOTIFICATION_COUNT}
        onNotificationPress={() => router.push('/alerts')}
        onProfilePress={() => router.push('/profile')}
      />
      <Screen scrollable contentClassName={cn('py-5 gap-5 items-center', contentPadding)}>
        <View className={cn('w-full gap-5', isDesktop && 'max-w-[1400px]')}>
          {/* Hero */}
          <View className="gap-0.5">
            <Text
              className={cn('font-extrabold text-foreground', headerSize)}
              style={{ letterSpacing: -0.8, lineHeight: isDesktop ? 42 : 32 }}
            >
              Verification Services
            </Text>
            <Text className={cn('font-semibold text-muted-foreground mt-1', subheadSize)}>
              Select a module to start a new check. Pricing is per successful verification.
            </Text>
          </View>

          {/* Services List */}
          <ServicesList />

          {/* Compliance footer */}
          <View className="bg-accent/60 border border-accent rounded-2xl p-4 flex-row items-center gap-3">
            <ShieldCheck size={20} strokeWidth={2} className="text-primary flex-none" />
            <Text className={cn('flex-1 font-semibold text-foreground leading-[18px]', isDesktop ? 'text-[14px]' : 'text-[12.5px]')}>
              All checks are encrypted end-to-end and stored in Indian data centres per DPDP guidelines.
            </Text>
          </View>

          <View className="h-4" />
        </View>
      </Screen>
    </>
  );
};
