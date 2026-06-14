import { cn } from '@/lib/utils';
import { View } from 'react-native';

type StickySubHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

/** Card-coloured bar pinned directly below PageHeader (segmented control, title + action, etc). */
export function StickySubHeader({ children, className }: StickySubHeaderProps) {
  return (
    <View className={cn('bg-card border-b border-border px-4 py-3', className)}>
      {children}
    </View>
  );
}
