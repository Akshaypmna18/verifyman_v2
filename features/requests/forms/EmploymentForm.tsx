import React from 'react';
import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRequestData } from '../request-types';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';

export const EmploymentForm = () => {
  const { control, formState: { errors } } = useFormContext<CreateRequestData>();
  const { isMobile } = useBreakpoint();

  return (
    <View className="gap-6">
      <View className="gap-4">
        <View>
          <Label required>Employer Name</Label>
          <Controller
            control={control}
            name="employment.employerName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter company name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.employment?.employerName?.message}
              />
            )}
          />
        </View>

        <View>
          <Label required>Position Held</Label>
          <Controller
            control={control}
            name="employment.positionHeld"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="e.g. Software Engineer"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.employment?.positionHeld?.message}
              />
            )}
          />
        </View>
      </View>

      <View className={cn('gap-4', !isMobile && 'flex-row')}>
        <View className="flex-1">
          <Label required>Start Date</Label>
          <Controller
            control={control}
            name="employment.startDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="MM/YYYY"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.employment?.startDate?.message}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label>End Date (Optional)</Label>
          <Controller
            control={control}
            name="employment.endDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="MM/YYYY or Present"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.employment?.endDate?.message}
              />
            )}
          />
        </View>
      </View>

      <View className="gap-4">
        <View>
          <Label required>Referee Name</Label>
          <Controller
            control={control}
            name="employment.refereeName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter reporting manager name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.employment?.refereeName?.message}
              />
            )}
          />
        </View>

        <View>
          <Label required>Referee Email</Label>
          <Controller
            control={control}
            name="employment.refereeEmail"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="manager@company.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.employment?.refereeEmail?.message}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};
