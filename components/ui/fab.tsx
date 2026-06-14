import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';

type FABProps = {
  onPress?: () => void;
  icon?: LucideIcon;
  className?: string;
  bottom?: number;
  right?: number;
};

export function FAB({ onPress, icon: IconComponent = Plus, className, bottom = 96, right = 18 }: FABProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{ position: 'absolute', bottom, right }}
      className={cn(
        'w-14 h-14 rounded-full bg-primary items-center justify-center',
        'shadow-lg shadow-primary/40 active:scale-95',
        className
      )}
      aria-label="New request"
    >
      <IconComponent size={26} color="white" strokeWidth={2.6} />
    </Pressable>
  );
}
