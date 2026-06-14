import { cn } from '@/lib/utils';
import { ScrollView, View } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  contentClassName?: string;
  /** Default: ['bottom','left','right'] — top omitted so PageHeader handles it */
  edges?: Edge[];
};

const DEFAULT_EDGES: Edge[] = ['bottom', 'left', 'right'];

export function Screen({
  children,
  className,
  scrollable = false,
  contentClassName,
  edges = DEFAULT_EDGES,
}: ScreenProps) {
  if (scrollable) {
    return (
      <SafeAreaView edges={edges} className={cn('flex-1 bg-background', className)}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerClassName={cn('px-4 py-4', contentClassName)}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={edges} className={cn('flex-1 bg-background', className)}>
      <View className={cn('flex-1 px-4 py-4', contentClassName)}>{children}</View>
    </SafeAreaView>
  );
}
