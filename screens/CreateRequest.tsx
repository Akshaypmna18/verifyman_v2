import React from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BackHeader } from '@/components/PageHeader';
import { Screen } from '@/components/screen';
import { RequestWizard } from '@/features/requests';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/text';
import { VERIFICATION_TYPE_META } from '@/lib/mock-backend';
import { VerificationType } from '@/lib/verification-types';

export const CreateRequestScreen = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: VerificationType }>();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const serviceMeta = type ? VERIFICATION_TYPE_META[type] : null;
  const serviceTitle = serviceMeta ? serviceMeta.label : 'New Request';

  return (
    <>
      <BackHeader title="Create Request" onBack={() => router.back()} />
      <Screen scrollable={false} contentClassName={cn('flex-1 py-5', isDesktop ? 'px-12' : isTablet ? 'px-6' : 'px-4')}>
        <View className={cn('flex-1 self-center w-full', isDesktop && 'max-w-[1000px]')}>
          <View className="mb-6">
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-2 h-2 rounded-full bg-primary" />
              <Text className="text-[12px] font-bold text-primary uppercase tracking-widest">
                Service Module
              </Text>
            </View>
            <Text className="text-[28px] font-extrabold text-foreground">
              {serviceTitle}
            </Text>
          </View>

          <View className="flex-1">
            <RequestWizard />
          </View>
        </View>
      </Screen>
    </>
  );
};
