import React from 'react';
import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRequestData } from './request-types';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';

export const CandidateInfoStep = () => {
  const { control, formState: { errors } } = useFormContext<CreateRequestData>();
  const { isMobile } = useBreakpoint();

  return (
    <View className="gap-6">
      <View className={cn('gap-4', !isMobile && 'flex-row')}>
        <View className="flex-1">
          <Label required>First Name</Label>
          <Controller
            control={control}
            name="candidate.firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter first name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.candidate?.firstName?.message}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label required>Last Name</Label>
          <Controller
            control={control}
            name="candidate.lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter last name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.candidate?.lastName?.message}
              />
            )}
          />
        </View>
      </View>

      <View className="gap-4">
        <View>
          <Label required>Email Address</Label>
          <Controller
            control={control}
            name="candidate.email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.candidate?.email?.message}
              />
            )}
          />
        </View>

        <View>
          <Label required>Mobile Number</Label>
          <Controller
            control={control}
            name="candidate.mobile"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="+91 XXXXX XXXXX"
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.candidate?.mobile?.message}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};
