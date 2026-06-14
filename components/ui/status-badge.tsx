import { cn } from '@/lib/utils';
import { AlertTriangle, Check, Clock, RefreshCw } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Text } from './text';

// Running spin-icon colour, matched to STATUS_CONFIG.running.textClass.
const RUNNING_ICON_COLOR = { light: 'hsl(32, 85%, 32%)', dark: 'hsl(43, 96%, 56%)' } as const;

export type BadgeStatus = 'running' | 'unknown' | 'done' | 'flag';

const STATUS_CONFIG = {
  running: {
    label: 'Running',
    Icon: RefreshCw,
    containerClass: 'bg-[hsl(38_92%_94%)] border border-[hsl(38_92%_82%)] dark:bg-[hsl(38_50%_14%)] dark:border-[hsl(38_50%_22%)]',
    textClass: 'text-[hsl(32_85%_32%)] dark:text-[hsl(43_96%_56%)]',
    spin: true,
  },
  unknown: {
    label: 'Unknown',
    Icon: Clock,
    containerClass: 'bg-secondary border border-border',
    textClass: 'text-muted-foreground',
    spin: false,
  },
  done: {
    label: 'Completed',
    Icon: Check,
    containerClass: 'bg-accent border border-accent dark:border-accent',
    textClass: 'text-accent-foreground',
    spin: false,
  },
  flag: {
    label: 'Discrepancy',
    Icon: AlertTriangle,
    containerClass: 'bg-destructive/10 border border-destructive/20 dark:bg-destructive/20',
    textClass: 'text-destructive',
    spin: false,
  },
} as const;

type StatusBadgeProps = {
  status: BadgeStatus;
  className?: string;
};

function SpinIcon({ Icon, color }: { Icon: typeof RefreshCw; color: string }) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Icon size={11} color={color} strokeWidth={2.6} />
    </Animated.View>
  );
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { colorScheme } = useColorScheme();
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown;

  return (
    <View
      className={cn(
        'flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1',
        config.containerClass,
        className
      )}
    >
      {config.spin ? (
        <SpinIcon Icon={config.Icon} color={RUNNING_ICON_COLOR[colorScheme ?? 'light']} />
      ) : (
        <config.Icon size={11} strokeWidth={2.6} />
      )}
      <Text className={cn('text-[10px] font-extrabold tracking-wider uppercase', config.textClass)}>
        {config.label}
      </Text>
    </View>
  );
}
