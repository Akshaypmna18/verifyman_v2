import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin, MoreHorizontal } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable, TouchableOpacity, View } from 'react-native';
import type { BadgeStatus } from './status-badge';
import { StatusBadge } from './status-badge';
import { Text } from './text';

type RequestCardProps = {
  name: string;
  rid: string;
  service?: string;
  serviceIcon?: LucideIcon;
  date?: string;
  status?: BadgeStatus;
  priority?: string;
  payNow?: boolean;
  onPress?: () => void;
  onMorePress?: () => void;
  onPayPress?: () => void;
  className?: string;
};

export function RequestCard({
  name,
  rid,
  service = 'Address Verification',
  serviceIcon: ServiceIcon = MapPin,
  date,
  status = 'running',
  priority = 'Normal priority',
  payNow = false,
  onPress,
  onMorePress,
  onPayPress,
  className,
}: RequestCardProps) {
  const { colorScheme } = useColorScheme();
  const iconMuted = colorScheme === 'dark' ? 'hsl(215 16% 55%)' : 'hsl(215 16% 60%)';
  const iconPrimary = 'hsl(143 82% 36%)';
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'bg-card border border-border rounded-[20px] pt-4 px-4',
        'shadow-sm shadow-black/5 active:bg-secondary',
        className
      )}
    >
      {/* Top row: name + status */}
      <View className="flex-row items-start justify-between gap-2.5 mb-0">
        <View className="flex-1 min-w-0">
          <Text
            className="text-[16.5px] font-extrabold text-foreground"
            style={{ letterSpacing: -0.2 }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text className="text-[12px] font-bold tracking-widest text-muted-foreground mt-0.5">
            {rid}
          </Text>
        </View>
        <StatusBadge status={status} />
      </View>

      {/* Meta row: service + date */}
      <View className="flex-row items-center gap-5 mt-3 mb-3.5">
        <View className="flex-row items-center gap-1.5">
          <ServiceIcon size={16} strokeWidth={2} color={iconPrimary} />
          <Text className="text-[13.5px] font-semibold text-muted-foreground">{service}</Text>
        </View>
        {date && (
          <View className="flex-row items-center gap-1.5">
            <Calendar size={15} strokeWidth={2} color={iconMuted} />
            <Text className="text-[13.5px] font-semibold text-muted-foreground">{date}</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View className="flex-row items-center justify-between border-t border-border py-3">
        {payNow ? (
          <TouchableOpacity
            onPress={(e) => { e.stopPropagation?.(); onPayPress?.(); }}
            activeOpacity={0.7}
            className="border border-primary rounded-full px-4 py-2"
          >
            <Text className="text-[13.5px] font-bold text-primary">Pay Now</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center gap-1.5">
            <Clock size={14} strokeWidth={2} color={iconMuted} />
            <Text className="text-[13px] font-semibold text-muted-foreground">{priority}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={(e) => { e.stopPropagation?.(); onMorePress?.(); }}
          activeOpacity={0.7}
          className="w-8 h-8 items-center justify-center"
        >
          <MoreHorizontal size={20} color={iconMuted} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
