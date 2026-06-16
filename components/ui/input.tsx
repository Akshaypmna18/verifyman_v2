import * as React from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';
import { Text } from './text';

export interface InputProps extends TextInputProps {
  error?: string;
  className?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <View className="w-full gap-1.5">
        <TextInput
          ref={ref}
          placeholderTextColor="hsl(215.4 16.3% 46.9%)"
          className={cn(
            'flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-[15px] font-semibold text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive',
            className
          )}
          {...props}
        />
        {error && (
          <Text className="text-[12px] font-semibold text-destructive px-1">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
