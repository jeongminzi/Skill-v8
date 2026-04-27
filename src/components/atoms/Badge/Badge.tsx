import React from 'react';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface BadgeProps {
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'hot' | 'best' | 'ad';
  size?: 'sm' | 'md';
  shape?: 'pill' | 'square';
  outline?: boolean;
  children: React.ReactNode;
}
// @spec-managed:end

const toneFilled: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-[var(--color-bg-muted)] text-[var(--color-text-default)]',
  brand:   'bg-[var(--color-primary)] text-[var(--color-text-inverse)]',
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success-fg)]',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-fg)]',
  danger:  'bg-[var(--color-danger-bg)] text-[var(--color-danger-fg)]',
  info:    'bg-[var(--color-info-bg)] text-[var(--color-info-fg)]',
  hot:     'bg-[var(--color-danger)] text-[var(--color-text-inverse)]',
  best:    'bg-[var(--color-primary)] text-[var(--color-text-inverse)]',
  ad:      'bg-[var(--color-gray-900)] text-[var(--color-text-inverse)]',
};

const toneOutline: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'border-[var(--color-border-default)] text-[var(--color-text-default)]',
  brand:   'border-[var(--color-primary)] text-[var(--color-primary)]',
  success: 'border-[var(--color-success)] text-[var(--color-success-fg)]',
  warning: 'border-[var(--color-warning)] text-[var(--color-warning-fg)]',
  danger:  'border-[var(--color-danger)] text-[var(--color-danger-fg)]',
  info:    'border-[var(--color-info)] text-[var(--color-info-fg)]',
  hot:     'border-[var(--color-danger)] text-[var(--color-danger)]',
  best:    'border-[var(--color-primary)] text-[var(--color-primary)]',
  ad:      'border-[var(--color-gray-700)] text-[var(--color-gray-700)]',
};

export function Badge({ tone = 'neutral', size = 'sm', shape = 'pill', outline = false, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold leading-none',
        size === 'sm' ? 'px-2 py-0.5 text-[10px] gap-1' : 'px-2.5 py-1 text-xs gap-1',
        shape === 'pill' ? 'rounded-[var(--radius-pill)]' : 'rounded-[var(--radius-xs)]',
        outline ? `bg-transparent border ${toneOutline[tone]}` : toneFilled[tone]
      )}
    >
      {children}
    </span>
  );
}
