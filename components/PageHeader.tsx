import { cn } from '@/lib/utils';
import { Bell, ChevronLeft } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from './ui/text';
import { VLogo } from './ui/v-logo';

// ─── helpers ─────────────────────────────────────────────────────────────────

function NotificationBell({
  count = 0,
  onPress,
}: {
  count?: number;
  onPress?: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const mutedColor = colorScheme === 'dark' ? 'hsl(215 16% 55%)' : 'hsl(215 16% 47%)';
  return (
    <Pressable
      onPress={onPress}
      className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center active:opacity-70"
      aria-label="Notifications"
    >
      <Bell size={18} strokeWidth={2} color={mutedColor} />
      {count > 0 && (
        <View className="absolute top-1 right-1 min-w-[14px] h-[14px] rounded-full bg-destructive items-center justify-center px-0.5">
          <Text className="text-[8px] font-black text-white leading-none">
            {count > 9 ? '9+' : String(count)}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function AvatarButton({
  initials = 'A',
  onPress,
}: {
  initials?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="w-10 h-10 rounded-full items-center justify-center active:opacity-70"
      aria-label="Profile"
    >
      <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
        <Text
          className="text-[14px] font-black text-primary-foreground"
          style={{ letterSpacing: 0.5 }}
        >
          {initials.toUpperCase().slice(0, 2)}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────

type PageHeaderProps = {
  /** User initials shown in the avatar button */
  userInitials?: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  notificationCount?: number;
  /** Optional extra slot between logo and right icons */
  center?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  userInitials = 'A',
  onNotificationPress,
  onProfilePress,
  notificationCount = 0,
  center,
  className,
}: PageHeaderProps) {
  return (
    <SafeAreaView edges={['top']} className={cn('bg-card border-b border-border', className)}>
      <View className="flex-row items-center justify-between px-4 h-14">
        <VLogo size={20} />

        {center && <View className="flex-1 mx-3">{center}</View>}

        <View className="flex-row items-center gap-2">
          <NotificationBell count={notificationCount} onPress={onNotificationPress} />
          <AvatarButton initials={userInitials} onPress={onProfilePress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── BackHeader ───────────────────────────────────────────────────────────────

type BackHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  className?: string;
};

export function BackHeader({ title, onBack, right, className }: BackHeaderProps) {
  const { colorScheme } = useColorScheme();
  const fgColor = colorScheme === 'dark' ? 'hsl(210 40% 98%)' : 'hsl(222 47% 11%)';
  return (
    <SafeAreaView edges={['top']} className={cn('bg-card border-b border-border', className)}>
      <View className="flex-row items-center justify-between px-4 h-14">
        <View className="flex-row items-center gap-3 flex-1">
          <Pressable
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center active:opacity-70"
            aria-label="Go back"
          >
            <ChevronLeft size={20} strokeWidth={2.4} color={fgColor} />
          </Pressable>
          <Text
            className="text-[17px] font-black text-foreground flex-1"
            style={{ letterSpacing: -0.3 }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        {right && <View className="flex-row items-center gap-2 ml-2">{right}</View>}
      </View>
    </SafeAreaView>
  );
}
