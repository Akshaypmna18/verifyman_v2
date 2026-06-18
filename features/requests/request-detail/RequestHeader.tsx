import { View } from 'react-native';
import { VerificationRequest } from '../request-mock-store';
import { Text } from '@/components/ui/text';
import { StatusBadge, type BadgeStatus } from '@/components/ui/status-badge';
import { SERVICE_UI_META } from '@/features/services/services-data';
import { MapPin } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

interface RequestDetailProps {
  request: VerificationRequest;
}

export function RequestHeader({ request }: RequestDetailProps) {
  const { colorScheme } = useColorScheme();
  const iconPrimary = 'hsl(143 82% 36%)';

  const meta = SERVICE_UI_META[request.serviceType];
  const ServiceIcon = meta?.icon || MapPin;
  const serviceLabel = request.serviceType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Map store status to UI badge status
  let badgeStatus: BadgeStatus = 'running';
  if (request.status === 'completed') badgeStatus = 'done';
  else if (['failed', 'insufficient', 'discrepancy'].includes(request.status)) badgeStatus = 'flag';

  return (
    <View className="px-4 py-6 gap-4 bg-card border-b border-border">
      <View className="flex-row items-center gap-2 mb-1">
        <View className="w-2 h-2 rounded-full bg-primary" />
        <Text className="text-[12px] font-bold text-primary uppercase tracking-widest">
          {request.referenceNumber}
        </Text>
      </View>
      
      <View className="flex-row justify-between items-start gap-4">
        <View className="flex-1 gap-1">
          <Text className="text-[28px] font-extrabold text-foreground" style={{ letterSpacing: -0.8, lineHeight: 32 }}>
            {request.candidateName}
          </Text>
          <View className="flex-row items-center gap-1.5 mt-1">
            <ServiceIcon size={16} strokeWidth={2} color={iconPrimary} />
            <Text className="text-[15px] font-semibold text-muted-foreground">{serviceLabel}</Text>
          </View>
        </View>
        <StatusBadge status={badgeStatus} className="mt-2" />
      </View>
    </View>
  );
}
