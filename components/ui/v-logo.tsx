import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { SvgCss } from 'react-native-svg/css';
import { LOGO_DARK_XML, LOGO_DEFAULT_XML } from './logo-data';

// Wordmark intrinsic ratio (637.25 × 174.14)
const ASPECT = 637.25 / 174.14;

type VLogoProps = {
  /** Rendered height in px (default 22) */
  size?: number;
  className?: string;
};

export function VLogo({ size = 22, className }: VLogoProps) {
  const { colorScheme } = useColorScheme();
  const xml = colorScheme === 'dark' ? LOGO_DARK_XML : LOGO_DEFAULT_XML;

  return (
    <View className={cn('flex-row items-center', className)}>
      <SvgCss xml={xml} height={size} width={Math.round(size * ASPECT)} preserveAspectRatio="xMidYMid meet" />
    </View>
  );
}
