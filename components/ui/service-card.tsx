import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { IconChip } from './icon-chip';
import type { IconChipTone } from './icon-chip';
import { Text } from './text';

type ServiceCardProps = {
  name: string;
  description: string;
  icon: LucideIcon;
  tone: IconChipTone;
  badge: string;
  startingPrice: number;
  onPress?: () => void;
  className?: string;
};

export function ServiceCard({
  name,
  description,
  icon: Icon,
  tone,
  badge,
  startingPrice,
  onPress,
  className,
}: ServiceCardProps) {
  return (
    <Card className={cn('gap-0 rounded-2xl py-0 overflow-hidden', className)}>
      <CardHeader className="px-4 pt-4">
        <View className="flex-row items-start justify-between gap-3">
          <IconChip tone={tone} size="lg">
            <Icon size={22} strokeWidth={2.2} />
          </IconChip>

          <View className="self-start rounded-full border border-border px-2.5 py-1">
            <Text className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {badge}
            </Text>
          </View>
        </View>
      </CardHeader>

      <CardContent className="px-4 py-4 gap-4">
        <View className="gap-1.5">
          <CardTitle
            className="text-[20px] font-extrabold text-foreground"
            numberOfLines={2}
          >
            {name.replace('\n', ' ')}
          </CardTitle>
          <CardDescription className="font-medium" numberOfLines={2}>
            {description}
          </CardDescription>
        </View>

        <View className="gap-1.5">
          <Text className="text-[11px] font-extrabold uppercase tracking-widest text-muted-foreground">
            Starting at
          </Text>
          <View className="flex-row items-end gap-2">
            <Text
              className="text-[34px] font-extrabold text-foreground"
              style={{ letterSpacing: -1.5, lineHeight: 38 }}
            >
              ₹{startingPrice}
            </Text>
            <Text className="pb-1 text-[14px] font-semibold text-muted-foreground">
              / check
            </Text>
          </View>
        </View>
      </CardContent>

      <CardFooter className="border-t border-border p-4">
        <Button size="lg" className="flex-1 rounded-full" onPress={onPress}>
          <Text className="text-[14px] font-extrabold">Get Started</Text>
          <ArrowRight size={18} strokeWidth={2.5} color="hsl(0 0% 100%)" />
        </Button>
      </CardFooter>
    </Card>
  );
}
