import { cn } from '@/lib/utils';
import { Pressable, View } from 'react-native';
import { Text } from './text';

type Option<T extends string> = {
  id: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <View
      className={cn(
        'flex-row bg-secondary border border-border rounded-full p-1 gap-0.5',
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <Pressable
            key={opt.id}
            onPress={() => onChange(opt.id)}
            className={cn(
              'flex-1 items-center justify-center rounded-full py-2 px-1.5',
              active ? 'bg-card shadow-sm shadow-black/5' : 'bg-transparent'
            )}
          >
            <Text
              className={cn(
                'text-[13px] font-bold',
                active ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
