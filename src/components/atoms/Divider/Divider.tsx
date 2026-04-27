import React from 'react';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  weight?: 'subtle' | 'default' | 'strong';
  inset?: boolean;
  className?: string;
}
// @spec-managed:end

const colorByWeight = {
  subtle:  'bg-[var(--color-border-subtle)]',
  default: 'bg-[var(--color-border-default)]',
  strong:  'bg-[var(--color-border-strong)]',
};

export function Divider({ orientation = 'horizontal', weight = 'subtle', inset = false, className }: DividerProps) {
  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cn(
        colorByWeight[weight],
        orientation === 'horizontal'
          ? cn('block h-px w-full', inset && 'mx-4')
          : cn('inline-block w-px h-full', inset && 'my-2'),
        className
      )}
    />
  );
}
