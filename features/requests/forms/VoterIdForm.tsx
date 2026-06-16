import React from 'react';
import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRequestData } from '../request-types';

export const VoterIdForm = () => {
  const { control, formState: { errors } } = useFormContext<CreateRequestData>();

  return (
    <View className="gap-6">
      <View>
        <Label required>EPIC Number</Label>
        <Controller
          control={control}
          name="voterId.epicNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter Voter ID number"
              autoCapitalize="characters"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.voterId?.epicNumber?.message}
            />
          )}
        />
      </View>

      <View>
        <Label required>Date of Birth</Label>
        <Controller
          control={control}
          name="voterId.dateOfBirth"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="DD/MM/YYYY"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.voterId?.dateOfBirth?.message}
            />
          )}
        />
      </View>
    </View>
  );
};
