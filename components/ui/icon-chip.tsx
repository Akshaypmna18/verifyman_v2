import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

export type IconChipTone = 'brand' | 'amber' | 'slate' | 'blue' | 'red';

type IconChipProps = React.ComponentProps<typeof View> & {
  tone?: IconChipTone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

const toneClasses: Record<IconChipTone, string> = {
  brand: 'bg-accent dark:bg-accent',
  amber: 'bg-[hsl(38_92%_96%)] dark:bg-[hsl(38_92%_14%)]',
  slate: 'bg-secondary',
  blue: 'bg-[hsl(199_89%_94%)] dark:bg-[hsl(199_89%_12%)]',
  red: 'bg-destructive/10 dark:bg-destructive/20',
};

// Explicit icon stroke colour per tone — lucide icons need a `color` prop;
// they do not inherit the wrapper View's text colour in React Native.
const iconColor: Record<IconChipTone, { light: string; dark: string }> = {
  brand: { light: 'hsl(143 82% 30%)', dark: 'hsl(143 82% 45%)' },
  amber: { light: 'hsl(38 85% 35%)', dark: 'hsl(43 96% 56%)' },
  slate: { light: 'hsl(215 16% 47%)', dark: 'hsl(215 16% 65%)' },
  blue: { light: 'hsl(199 89% 30%)', dark: 'hsl(199 89% 60%)' },
  red: { light: 'hsl(0 72% 51%)', dark: 'hsl(0 84% 60%)' },
};

const sizeClasses = {
  sm: 'w-8 h-8 rounded-[10px]',
  md: 'w-[38px] h-[38px] rounded-[11px]',
  lg: 'w-[52px] h-[52px] rounded-[15px]',
};

export function IconChip({ tone = 'brand', size = 'md', className, children, ...props }: IconChipProps) {
  const { colorScheme } = useColorScheme();
  const color = iconColor[tone][colorScheme ?? 'light'];

  // Inject the tone colour into the child icon unless the caller already set one.
  const tinted = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const props = child.props as { color?: string };
    if (props.color != null) return child;
    return React.cloneElement(child as React.ReactElement<{ color?: string }>, { color });
  });

  return (
    <View
      className={cn(
        'items-center justify-center flex-none',
        toneClasses[tone],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {tinted}
    </View>
  );
}
