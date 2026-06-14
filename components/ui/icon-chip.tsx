import { cn } from '@/lib/utils';
import { View } from 'react-native';

export type IconChipTone = 'brand' | 'amber' | 'slate' | 'blue' | 'red';

type IconChipProps = React.ComponentProps<typeof View> & {
  tone?: IconChipTone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

const toneClasses: Record<IconChipTone, string> = {
  brand: 'bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground',
  amber: 'bg-[hsl(38_92%_96%)] text-[hsl(38_85%_35%)] dark:bg-[hsl(38_92%_14%)] dark:text-[hsl(43_96%_56%)]',
  slate: 'bg-secondary text-muted-foreground',
  blue:  'bg-[hsl(199_89%_94%)] text-[hsl(199_89%_30%)] dark:bg-[hsl(199_89%_12%)] dark:text-[hsl(199_89%_60%)]',
  red:   'bg-destructive/10 text-destructive dark:bg-destructive/20',
};

const sizeClasses = {
  sm: 'w-8 h-8 rounded-[10px]',
  md: 'w-[38px] h-[38px] rounded-[11px]',
  lg: 'w-[52px] h-[52px] rounded-[15px]',
};

export function IconChip({ tone = 'brand', size = 'md', className, children, ...props }: IconChipProps) {
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
      {children}
    </View>
  );
}
