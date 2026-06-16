import React from 'react';
import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRequestData } from '../request-types';

export const DrivingLicenseForm = () => {
  const { control, formState: { errors } } = useFormContext<CreateRequestData>();

  return (
    <View className="gap-6">
      <View>
        <Label required>License Number</Label>
        <Controller
          control={control}
          name="drivingLicense.licenseNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter DL number"
              autoCapitalize="characters"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.drivingLicense?.licenseNumber?.message}
            />
          )}
        />
      </View>

      <View>
        <Label required>Date of Birth</Label>
        <Controller
          control={control}
          name="drivingLicense.dateOfBirth"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="DD/MM/YYYY"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.drivingLicense?.dateOfBirth?.message}
            />
          )}
        />
      </View>
    </View>
  );
};
