import { cn } from '@/lib/utils';
import { ScrollView, View } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  contentClassName?: string;
};

export function Screen({
  children,
  className,
  scrollable = false,
  contentClassName,
}: ScreenProps) {
  if (scrollable) {
    return (
      <View className={cn('flex-1 bg-background', className)}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerClassName={cn('px-4 py-4', contentClassName)}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View className={cn('flex-1 bg-background', className)}>
      <View className={cn('flex-1 px-4 py-4', contentClassName)}>{children}</View>
    </View>
  );
}
