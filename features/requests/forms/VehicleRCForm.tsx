import React from 'react';
import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRequestData } from '../request-types';

export const VehicleRCForm = () => {
  const { control, formState: { errors } } = useFormContext<CreateRequestData>();

  return (
    <View className="gap-6">
      <View>
        <Label required>Registration Number</Label>
        <Controller
          control={control}
          name="vehicleRC.registrationNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="e.g. MH12AB1234"
              autoCapitalize="characters"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.vehicleRC?.registrationNumber?.message}
            />
          )}
        />
      </View>
    </View>
  );
};
