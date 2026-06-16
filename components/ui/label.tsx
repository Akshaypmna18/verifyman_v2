import * as React from 'react';
import { View } from 'react-native';
import { Text } from './text';
import { cn } from '@/lib/utils';

interface LabelProps {
  children: string;
  className?: string;
  required?: boolean;
}

export function Label({ children, className, required }: LabelProps) {
  return (
    <View className={cn('flex-row items-center gap-1 mb-1.5', className)}>
      <Text className="text-[13px] font-bold text-muted-foreground uppercase tracking-wider">
        {children}
      </Text>
      {required && <Text className="text-destructive font-bold">*</Text>}
    </View>
  );
}
