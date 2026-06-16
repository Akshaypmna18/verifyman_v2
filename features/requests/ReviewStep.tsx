import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { RequestSummary } from './RequestSummary';

export const ReviewStep = () => {
  return (
    <View className="gap-4">
      <Text className="text-muted-foreground font-medium px-1 mb-2">
        Please review the information below before submitting the verification request.
      </Text>
      <RequestSummary />
    </View>
  );
};
