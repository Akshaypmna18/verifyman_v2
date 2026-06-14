import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { IconChip } from './icon-chip';
import type { IconChipTone } from './icon-chip';
import { Text } from './text';

type ServiceCardProps = {
  name: string;
  description: string;
  icon: LucideIcon;
  tone: IconChipTone;
  turnaround: string;
  onPress?: () => void;
  className?: string;
};

export function ServiceCard({
  name,
  description,
  icon: Icon,
  tone,
  turnaround,
  onPress,
  className,
}: ServiceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-1 bg-card border border-border rounded-[20px] p-4 gap-3',
        'active:bg-secondary shadow-sm shadow-black/5',
        className
      )}
      style={{ minWidth: 148 }}
    >
      <IconChip tone={tone} size="lg">
        <Icon size={22} strokeWidth={2} />
      </IconChip>

      <View className="gap-1 flex-1">
        <Text
          className="text-[15px] font-extrabold text-foreground"
          style={{ letterSpacing: -0.2, lineHeight: 20 }}
        >
          {name}
        </Text>
        <Text className="text-[12px] font-medium text-muted-foreground leading-[16px]">
          {description}
        </Text>
      </View>

      <View className="gap-1.5">
        <View className="flex-row items-center gap-1">
          <Text className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/70">
            Turnaround
          </Text>
          <Text className="text-[10px] font-bold text-primary">{turnaround}</Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Text className="text-[13px] font-bold text-primary">Request</Text>
          <ArrowRight size={13} strokeWidth={2.5} color="hsl(143 82% 36%)" />
        </View>
      </View>
    </Pressable>
  );
}
