'use client';
import React from 'react';
import { cn } from '../../../lib/cn';
import { Icon } from '../Icon/Icon';

// @spec-managed:start props
export interface CategoryCircleProps {
  label: string;
  icon: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}
// @spec-managed:end

const sizePx = { sm: 48, md: 56, lg: 64 } as const;
const iconPx = { sm: 22, md: 26, lg: 30 } as const;

export function CategoryCircle({ label, icon, active = false, size = 'md', onClick }: CategoryCircleProps) {
  const interactive = typeof onClick === 'function';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={interactive ? active : undefined}
      className="flex flex-col items-center gap-1.5 focus-visible:outline-none"
      disabled={!interactive}
    >
      <span
        className={cn(
          'flex items-center justify-center rounded-full border-2 transition-colors',
          active
            ? 'border-[var(--color-primary)] bg-[var(--color-primary-bg)] text-[var(--color-primary)]'
            : 'border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-text-default)]'
        )}
        style={{ width: sizePx[size], height: sizePx[size] }}
      >
        <Icon name={icon} size={iconPx[size]} filled={active} />
      </span>
      <span className={cn(
        'text-[11px] font-medium',
        active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-default)]'
      )}>
        {label}
      </span>
    </button>
  );
}
