import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { IconChip } from './icon-chip';
import type { IconChipTone } from './icon-chip';
import { Text } from './text';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  tone?: IconChipTone;
  className?: string;
};

export function EmptyState({ title, description, icon: Icon, tone = 'slate', className }: EmptyStateProps) {
  return (
    <View className={cn('flex-1 items-center justify-center py-20 gap-3 px-6', className)}>
      {Icon && (
        <IconChip tone={tone} size="lg">
          <Icon size={24} strokeWidth={2} />
        </IconChip>
      )}
      <Text
        className="text-[17px] font-extrabold text-foreground text-center"
        style={{ letterSpacing: -0.3 }}
      >
        {title}
      </Text>
      {description && (
        <Text className="text-[14px] font-medium text-muted-foreground text-center leading-[20px]">
          {description}
        </Text>
      )}
    </View>
  );
}
