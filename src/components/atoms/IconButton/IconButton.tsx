import React from 'react';
import { cn } from '../../../lib/cn';
import { Icon } from '../Icon/Icon';

// @spec-managed:start props
export interface IconButtonProps {
  icon: string;
  ariaLabel: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'plain' | 'soft' | 'solid';
  tone?: 'neutral' | 'brand' | 'danger';
  disabled?: boolean;
  badgeDot?: boolean;
  onClick?: () => void;
}
// @spec-managed:end

const sizePx = { sm: 28, md: 36, lg: 44 } as const;
const iconPx = { sm: 18, md: 20, lg: 24 } as const;

const variantTone: Record<string, string> = {
  'plain-neutral': 'text-[var(--color-text-default)] hover:bg-[var(--color-bg-muted)]',
  'plain-brand':   'text-[var(--color-primary)] hover:bg-[var(--color-primary-bg)]',
  'plain-danger':  'text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)]',
  'soft-neutral':  'bg-[var(--color-bg-muted)] text-[var(--color-text-default)] hover:bg-[var(--color-gray-200)]',
  'soft-brand':    'bg-[var(--color-primary-bg)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]',
  'soft-danger':   'bg-[var(--color-danger-bg)] text-[var(--color-danger)] hover:bg-[var(--color-red-100)]',
  'solid-neutral': 'bg-[var(--color-gray-900)] text-[var(--color-text-inverse)]',
  'solid-brand':   'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)]',
  'solid-danger':  'bg-[var(--color-danger)] text-[var(--color-text-inverse)]',
};

export function IconButton({
  icon,
  ariaLabel,
  size = 'md',
  variant = 'plain',
  tone = 'neutral',
  disabled = false,
  badgeDot = false,
  onClick,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40',
        variantTone[`${variant}-${tone}`],
        disabled && 'cursor-not-allowed opacity-50'
      )}
      style={{ width: sizePx[size], height: sizePx[size] }}
    >
      <Icon name={icon} size={iconPx[size]} />
      {badgeDot && (
        <span
          aria-hidden
          className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--color-danger)] ring-2 ring-[var(--color-bg-surface)]"
        />
      )}
    </button>
  );
}
