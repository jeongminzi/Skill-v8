import React from 'react';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface IconProps {
  name: string;
  size?: 16 | 18 | 20 | 24 | 32;
  filled?: boolean;
  className?: string;
}
// @spec-managed:end

export function Icon({ name, size = 20, filled = false, className }: IconProps) {
  return (
    <span
      aria-hidden
      className={cn('material-symbols-rounded select-none leading-none', className)}
      style={{
        fontSize: size,
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
      }}
    >
      {name}
    </span>
  );
}
