import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { IconChip } from './icon-chip';
import type { IconChipTone } from './icon-chip';
import { Text } from './text';

type StatCardProps = {
  label: string;
  value: string | number;
  caption?: string;
  icon: LucideIcon;
  tone?: IconChipTone;
  onPress?: () => void;
  className?: string;
};

export function StatCard({ label, value, caption, icon: IconComponent, tone = 'brand', onPress, className }: StatCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'bg-card border border-border rounded-[20px] p-4 gap-2.5',
        'shadow-sm shadow-black/5 active:bg-secondary',
        className
      )}
    >
      <View className="flex-row items-start justify-between">
        <Text className="text-[11px] font-extrabold tracking-widest uppercase text-muted-foreground">
          {label}
        </Text>
        <IconChip tone={tone} size="sm">
          <IconComponent size={17} strokeWidth={2.2} />
        </IconChip>
      </View>
      <Text
        className="text-[34px] font-extrabold text-foreground"
        style={{ letterSpacing: -1.5, lineHeight: 38 }}
      >
        {value}
      </Text>
      {caption && (
        <Text className="text-xs font-semibold text-muted-foreground leading-tight">
          {caption}
        </Text>
      )}
    </Pressable>
  );
}
