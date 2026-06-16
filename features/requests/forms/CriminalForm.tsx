import React from 'react';
import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRequestData } from '../request-types';

export const CriminalForm = () => {
  const { control, formState: { errors } } = useFormContext<CreateRequestData>();

  return (
    <View className="gap-6">
      <View>
        <Label required>Father's Name</Label>
        <Controller
          control={control}
          name="criminal.fatherName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter father's name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.criminal?.fatherName?.message}
            />
          )}
        />
      </View>

      <View>
        <Label required>Date of Birth</Label>
        <Controller
          control={control}
          name="criminal.dateOfBirth"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="DD/MM/YYYY"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.criminal?.dateOfBirth?.message}
            />
          )}
        />
      </View>

      <View>
        <Label required>Current Address</Label>
        <Controller
          control={control}
          name="criminal.address"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter full current address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={3}
              className="h-24 py-3"
              error={errors.criminal?.address?.message}
            />
          )}
        />
      </View>
    </View>
  );
};
