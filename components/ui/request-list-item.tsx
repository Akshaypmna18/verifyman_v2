import { View, Alert, Platform, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from './button';
import { StatusBadge, type BadgeStatus } from './status-badge';
import { VerificationRequest, deleteRequest } from '../../features/requests/request-mock-store';
import { SERVICE_UI_META } from '@/features/services/services-data';
import { useRouter } from 'expo-router';
import { Calendar, MapPin, Eye, Pencil, Trash2, Clock } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';

interface RequestListItemProps {
  request: VerificationRequest;
}

export function RequestListItem({ request }: RequestListItemProps) {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  
  const iconMuted = colorScheme === 'dark' ? 'hsl(215 16% 55%)' : 'hsl(215 16% 60%)';
  const iconPrimary = 'hsl(143 82% 36%)';

  const meta = SERVICE_UI_META[request.serviceType];
  const ServiceIcon = meta?.icon || MapPin;
  const serviceLabel = request.serviceType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Map store status to UI badge status
  let badgeStatus: BadgeStatus = 'running';
  if (request.status === 'completed') badgeStatus = 'done';
  else if (['failed', 'insufficient', 'discrepancy'].includes(request.status)) badgeStatus = 'flag';

  const dateLabel = new Date(request.createdAt).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleDelete = () => {
    const title = 'Delete Request';
    const message = 'Are you sure you want to delete this request?\n\nThis action cannot be undone.';

    if (Platform.OS === 'web') {
      if (confirm(`${title}\n\n${message}`)) {
        performDelete();
      }
      return;
    }

    Alert.alert(
      title,
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: performDelete
        },
      ]
    );
  };

  const performDelete = async () => {
    try {
      await deleteRequest(request.id);
    } catch (error) {
      if (Platform.OS === 'web') {
        alert('Failed to delete request. Please try again.');
      } else {
        Alert.alert('Error', 'Failed to delete request. Please try again.');
      }
    }
  };

  return (
    <Pressable
      onPress={() => router.push(`/requests/${request.id}`)}
      className={cn(
        'bg-card border border-border rounded-[20px] pt-4 px-4',
        'shadow-sm shadow-black/5 active:bg-secondary'
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
            {request.candidateName}
          </Text>
          <Text className="text-[12px] font-bold tracking-widest text-muted-foreground mt-0.5">
            {request.referenceNumber}
          </Text>
        </View>
        <StatusBadge status={badgeStatus} />
      </View>

      {/* Meta row: service + date */}
      <View className="flex-row items-center gap-5 mt-3 mb-3.5">
        <View className="flex-row items-center gap-1.5">
          <ServiceIcon size={16} strokeWidth={2} color={iconPrimary} />
          <Text className="text-[13.5px] font-semibold text-muted-foreground">{serviceLabel}</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <Calendar size={15} strokeWidth={2} color={iconMuted} />
          <Text className="text-[13.5px] font-semibold text-muted-foreground">{dateLabel}</Text>
        </View>
      </View>

      {/* Footer Actions */}
      <View className="flex-row items-center justify-between border-t border-border py-3">
        <View className="flex-row items-center gap-1.5">
          <Clock size={14} strokeWidth={2} color={iconMuted} />
          <Text className="text-[13px] font-semibold text-muted-foreground">Normal priority</Text>
        </View>
        <View className="flex-row gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full h-8 px-3"
            onPress={() => router.push(`/requests/${request.id}`)}
          >
            <Eye size={14} color={colorScheme === 'dark' ? '#fff' : '#000'} />
            <Text className="text-[12px] font-bold">View</Text>
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full h-8 px-3"
            onPress={() => router.push(`/requests/${request.id}/edit`)}
          >
            <Pencil size={14} color={colorScheme === 'dark' ? '#fff' : '#000'} />
            <Text className="text-[12px] font-bold">Edit</Text>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-8 w-8 p-0 items-center justify-center"
            onPress={handleDelete}
          >
            <Trash2 size={14} color="#ef4444" />
          </Button>
        </View>
      </View>
    </Pressable>
  );
}
