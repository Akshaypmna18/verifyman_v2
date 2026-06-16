import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { STEPS, StepId } from './request-types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react-native';

interface RequestProgressProps {
  currentStepId: StepId;
  isAllCompleted?: boolean;
}

export const RequestProgress: React.FC<RequestProgressProps> = ({ 
  currentStepId,
  isAllCompleted = false,
}) => {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStepId);

  return (
    <View className="flex-row items-center justify-between px-2 mb-8">
      {STEPS.map((step, index) => {
        const isCompleted = isAllCompleted || index < currentIndex;
        const isActive = !isAllCompleted && index === currentIndex;

        return (
          <React.Fragment key={step.id}>
            <View className="items-center gap-2 flex-1">
              <View
                className={cn(
                  'w-10 h-10 rounded-full items-center justify-center border-2',
                  isCompleted
                    ? 'bg-primary border-primary'
                    : isActive
                    ? 'border-primary bg-background'
                    : 'border-muted bg-background'
                )}
              >
                {isCompleted ? (
                  <Check size={20} strokeWidth={3} color="white" />
                ) : (
                  <Text
                    className={cn(
                      'text-[15px] font-bold',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                className={cn(
                  'text-[11px] font-bold text-center uppercase tracking-tighter',
                  isActive || isAllCompleted ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.title.split(' ')[0]}
              </Text>
            </View>
            {index < STEPS.length - 1 && (
              <View
                className={cn(
                  'h-[2px] flex-1 -mt-6 mx-2',
                  index < currentIndex || isAllCompleted ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};
