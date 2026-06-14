import { cn } from '@/lib/utils';
import { Pressable, View } from 'react-native';
import { Text } from './text';

type SectionHeaderProps = {
  title: string;
  action?: string;
  onAction?: () => void;
  className?: string;
};

export function SectionHeader({ title, action, onAction, className }: SectionHeaderProps) {
  return (
    <View className={cn('flex-row items-center justify-between mb-3', className)}>
      <Text className="text-[17px] font-extrabold text-foreground" style={{ letterSpacing: -0.3 }}>
        {title}
      </Text>
      {action && (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text className="text-[13px] font-bold text-primary">{action}</Text>
        </Pressable>
      )}
    </View>
  );
}
