import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { IconChip } from './icon-chip';
import type { IconChipTone } from './icon-chip';
import { Text } from './text';

type AlertRowProps = {
  icon: LucideIcon;
  tone: IconChipTone;
  title: string;
  body: string;
  time: string;
  unread?: boolean;
  onPress?: () => void;
  className?: string;
};

export function AlertRow({
  icon: Icon,
  tone,
  title,
  body,
  time,
  unread = false,
  onPress,
  className,
}: AlertRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row items-start gap-3 px-4 py-3.5 active:bg-secondary',
        unread && 'bg-accent/40',
        className
      )}
    >
      <IconChip tone={tone} size="sm" className="mt-0.5 flex-none">
        <Icon size={14} strokeWidth={2.2} />
      </IconChip>

      <View className="flex-1 gap-0.5">
        <View className="flex-row items-start justify-between gap-2">
          <Text
            className={cn(
              'flex-1 text-[13.5px] text-foreground leading-[18px]',
              unread ? 'font-extrabold' : 'font-semibold'
            )}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text className="text-[11px] font-semibold text-muted-foreground flex-none mt-0.5">
            {time}
          </Text>
        </View>
        <Text
          className="text-[12.5px] font-medium text-muted-foreground leading-[17px]"
          numberOfLines={2}
        >
          {body}
        </Text>
      </View>

      {unread && <View className="w-2 h-2 rounded-full bg-primary mt-1 flex-none" />}
    </Pressable>
  );
}
