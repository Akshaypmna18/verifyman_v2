import React from 'react';
import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRequestData } from '../request-types';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';

export const AddressForm = () => {
  const { control, formState: { errors } } = useFormContext<CreateRequestData>();
  const { isMobile } = useBreakpoint();

  return (
    <View className="gap-6">
      <View className="gap-4">
        <View>
          <Label required>Address Line 1</Label>
          <Controller
            control={control}
            name="address.addressLine1"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="House No, Building, Street"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.address?.addressLine1?.message}
              />
            )}
          />
        </View>

        <View>
          <Label>Address Line 2 (Optional)</Label>
          <Controller
            control={control}
            name="address.addressLine2"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Area, Landmark"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.address?.addressLine2?.message}
              />
            )}
          />
        </View>
      </View>

      <View className={cn('gap-4', !isMobile && 'flex-row')}>
        <View className="flex-1">
          <Label required>City</Label>
          <Controller
            control={control}
            name="address.city"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter city"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.address?.city?.message}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label required>State</Label>
          <Controller
            control={control}
            name="address.state"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter state"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.address?.state?.message}
              />
            )}
          />
        </View>
      </View>

      <View className={cn('gap-4', !isMobile && 'flex-row')}>
        <View className="flex-1">
          <Label required>Pincode</Label>
          <Controller
            control={control}
            name="address.pincode"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="6-digit pincode"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.address?.pincode?.message}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Label required>Country</Label>
          <Controller
            control={control}
            name="address.country"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter country"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.address?.country?.message}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};
