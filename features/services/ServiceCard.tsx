import React from 'react';
import { View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IconChip } from '@/components/ui/icon-chip';
import { Text } from '@/components/ui/text';
import { VerificationService } from './service-types';
import { SERVICE_UI_META } from './services-data';

interface ServiceCardProps {
  service: VerificationService;
  onPress: (service: VerificationService) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  className,
}) => {
  const meta = SERVICE_UI_META[service.type];
  const Icon = meta.icon;

  return (
    <Card className={cn('flex-1 gap-0 rounded-2xl py-0 overflow-hidden flex-col', className)}>
      <CardHeader className="px-4 pt-4">
        <View className="flex-row items-start justify-between gap-3">
          <IconChip tone={meta.tone} size="lg">
            <Icon size={22} strokeWidth={2.2} />
          </IconChip>

          <View className="self-start rounded-full border border-border px-2.5 py-1">
            <Text className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {service.tatLabel}
            </Text>
          </View>
        </View>
      </CardHeader>

      <CardContent className="px-4 py-4 gap-4 flex-1">
        <View className="gap-1.5">
          <CardTitle
            className="text-[20px] font-extrabold text-foreground"
            numberOfLines={2}
          >
            {service.name}
          </CardTitle>
          <CardDescription className="font-medium" numberOfLines={3}>
            {service.description}
          </CardDescription>
        </View>

        <View className="gap-1.5 mt-auto">
          <Text className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
            Starting at
          </Text>
          <View className="flex-row items-end gap-2">
            <Text
              className="text-[34px] font-extrabold text-foreground"
              style={{ letterSpacing: -1.5, lineHeight: 38 }}
            >
              ₹{service.price}
            </Text>
            <Text className="pb-1 text-[14px] font-semibold text-muted-foreground">
              / check
            </Text>
          </View>
        </View>
      </CardContent>

      <CardFooter className="border-t border-border p-4">
        <Button 
          size="lg" 
          className="flex-1 rounded-full bg-primary" 
          onPress={() => onPress(service)}
        >
          <Text className="text-[14px] font-extrabold">Get Started</Text>
          <ArrowRight size={18} strokeWidth={2.5} color="white" />
        </Button>
      </CardFooter>
    </Card>
  );
};
