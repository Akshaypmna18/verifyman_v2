import { cn } from '@/lib/utils';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { RequestStatus } from '../../features/requests/request-mock-store';

const STATUS_CONFIG: Record<RequestStatus, { label: string; containerClass: string; textClass: string }> = {
  pending: { label: 'Pending', containerClass: 'bg-muted', textClass: 'text-muted-foreground' },
  running: { label: 'Running', containerClass: 'bg-blue-100 dark:bg-blue-900', textClass: 'text-blue-700 dark:text-blue-300' },
  completed: { label: 'Completed', containerClass: 'bg-green-100 dark:bg-green-900', textClass: 'text-green-700 dark:text-green-300' },
  failed: { label: 'Failed', containerClass: 'bg-red-100 dark:bg-red-900', textClass: 'text-red-700 dark:text-red-300' },
  insufficient: { label: 'Insufficient', containerClass: 'bg-yellow-100 dark:bg-yellow-900', textClass: 'text-yellow-700 dark:text-yellow-300' },
  discrepancy: { label: 'Discrepancy', containerClass: 'bg-orange-100 dark:bg-orange-900', textClass: 'text-orange-700 dark:text-orange-300' },
};

type RequestStatusBadgeProps = {
  status: RequestStatus;
  className?: string;
};

export function RequestStatusBadge({ status, className }: RequestStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <View className={cn('px-2 py-1 rounded-full', config.containerClass, className)}>
      <Text className={cn('text-xs font-bold uppercase', config.textClass)}>{config.label}</Text>
    </View>
  );
}
