import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';
import { IconChip } from './icon-chip';
import type { IconChipTone } from './icon-chip';
import { Text } from './text';

type ListRowProps = {
  icon: LucideIcon;
  label: string;
  tone?: IconChipTone;
  /** Trailing value shown before the chevron (e.g. plan name) */
  value?: string;
  showChevron?: boolean;
  onPress?: () => void;
  className?: string;
};

export function ListRow({
  icon: Icon,
  label,
  tone = 'slate',
  value,
  showChevron = true,
  onPress,
  className,
}: ListRowProps) {
  const { colorScheme } = useColorScheme();
  const chevronColor = colorScheme === 'dark' ? 'hsl(215 16% 55%)' : 'hsl(215 16% 60%)';
  return (
    <Pressable
      onPress={onPress}
      className={cn('flex-row items-center px-4 py-3.5 active:bg-secondary', className)}
    >
      <IconChip tone={tone} size="sm" className="mr-3 flex-none">
        <Icon size={15} strokeWidth={2.2} />
      </IconChip>
      <Text className="flex-1 text-[15px] font-semibold text-foreground">{label}</Text>
      {value && <Text className="text-[13px] font-bold text-primary mr-2">{value}</Text>}
      {showChevron && (
        <ChevronRight size={16} strokeWidth={2} color={chevronColor} />
      )}
    </Pressable>
  );
}
