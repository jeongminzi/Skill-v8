import React from 'react';
import { cn } from '../../../lib/cn';
import { Icon } from '../Icon/Icon';

// @spec-managed:start props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
}
// @spec-managed:end

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)]',
  secondary:
    'bg-[var(--color-bg-surface)] text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary-bg)]',
  ghost:
    'bg-transparent text-[var(--color-text-default)] hover:bg-[var(--color-bg-muted)]',
  danger:
    'bg-[var(--color-danger)] text-[var(--color-text-inverse)] hover:bg-[var(--color-red-600)]',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs rounded-[var(--radius-sm)] gap-1.5',
  md: 'h-10 px-4 text-sm rounded-[var(--radius-md)] gap-2',
  lg: 'h-12 px-5 text-base rounded-[var(--radius-md)] gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  type = 'button',
  children,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40',
        variantClasses[variant],
        sizeClasses[size],
        block && 'w-full',
        isDisabled && 'cursor-not-allowed opacity-50 hover:bg-current'
      )}
    >
      {loading ? (
        <Icon name="progress_activity" size={size === 'sm' ? 16 : 20} className="animate-spin" />
      ) : leadingIcon ? (
        <Icon name={leadingIcon} size={size === 'sm' ? 16 : 20} />
      ) : null}
      <span>{children}</span>
      {!loading && trailingIcon ? (
        <Icon name={trailingIcon} size={size === 'sm' ? 16 : 20} />
      ) : null}
    </button>
  );
}
