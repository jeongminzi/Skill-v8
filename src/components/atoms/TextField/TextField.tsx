'use client';
import React from 'react';
import { cn } from '../../../lib/cn';
import { Icon } from '../Icon/Icon';

// @spec-managed:start props
export interface TextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  shape?: 'rounded' | 'pill';
  leadingIcon?: string;
  trailingIcon?: string;
  onTrailingClick?: () => void;
  disabled?: boolean;
  invalid?: boolean;
  type?: 'text' | 'search' | 'tel' | 'email' | 'password' | 'number';
  ariaLabel?: string;
}
// @spec-managed:end

export function TextField({
  value,
  onChange,
  placeholder,
  shape = 'rounded',
  leadingIcon,
  trailingIcon,
  onTrailingClick,
  disabled = false,
  invalid = false,
  type = 'text',
  ariaLabel,
}: TextFieldProps) {
  return (
    <label
      className={cn(
        'flex w-full items-center gap-2 px-4 py-3 text-sm transition-colors',
        'bg-[var(--color-bg-subtle)] border',
        invalid
          ? 'border-[var(--color-danger)] focus-within:border-[var(--color-danger)]'
          : 'border-[var(--color-border-default)] focus-within:border-[var(--color-primary)]',
        shape === 'pill' ? 'rounded-[var(--radius-pill)]' : 'rounded-[var(--radius-md)]',
        disabled && 'opacity-60'
      )}
    >
      {leadingIcon && <Icon name={leadingIcon} size={20} className="text-[var(--color-text-muted)]" />}
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--color-text-subtle)] text-[var(--color-text-strong)]"
      />
      {trailingIcon && (
        <button
          type="button"
          onClick={onTrailingClick}
          aria-label="입력 지우기"
          className="rounded-full p-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-default)]"
        >
          <Icon name={trailingIcon} size={18} />
        </button>
      )}
    </label>
  );
}
