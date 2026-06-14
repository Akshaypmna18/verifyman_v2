import { cn } from '@/lib/utils';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type VLogoProps = {
  size?: number;
  className?: string;
};

export function VLogo({ size = 22, className }: VLogoProps) {
  const svgSize = Math.round(size * 1.28);
  const overlap = Math.round(size * 0.32);

  return (
    <View className={cn('flex-row items-center', className)}>
      <Svg width={svgSize} height={svgSize} viewBox="0 0 28 28">
        <Path
          d="M4 14.5 L11 22 L25 5"
          stroke="#2DBE4F"
          strokeWidth={5.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
      <Text
        style={{
          fontWeight: '800',
          fontStyle: 'italic',
          fontSize: size,
          letterSpacing: -0.5,
          marginLeft: -overlap,
        }}
        className="text-foreground"
      >
        erifyman
      </Text>
    </View>
  );
}
