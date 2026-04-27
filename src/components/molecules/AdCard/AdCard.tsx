import React from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface AdCardProps {
  title: string;
  subtitle?: string;
  gradient?: 'rose' | 'peach' | 'mint' | 'sky';
  onClick?: () => void;
}
// @spec-managed:end

const gradientClass: Record<NonNullable<AdCardProps['gradient']>, string> = {
  rose:  'from-[var(--color-brand-100)] to-[var(--color-brand-200)]',
  peach: 'from-[var(--color-yellow-100)] to-[var(--color-red-100)]',
  mint:  'from-[var(--color-green-100)] to-[var(--color-blue-100)]',
  sky:   'from-[var(--color-blue-100)] to-[var(--color-info-bg)]',
};

export function AdCard({ title, subtitle, gradient = 'rose', onClick }: AdCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative h-32 w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] p-4 text-left',
        'bg-gradient-to-br',
        gradientClass[gradient]
      )}
    >
      <div className="absolute right-3 top-3"><Badge tone="ad" shape="square">AD</Badge></div>
      <div className="text-base font-bold leading-snug text-[var(--color-text-strong)]">{title}</div>
      {subtitle && <div className="mt-1 text-xs text-[var(--color-text-muted)]">{subtitle}</div>}
    </button>
  );
}
