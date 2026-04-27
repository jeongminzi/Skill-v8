'use client';
import React from 'react';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface FilterChipRowProps {
  options: FilterChipOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}
// @spec-managed:end

const sizeCls = {
  sm: 'px-3 py-1 text-[11px]',
  md: 'px-3.5 py-1.5 text-xs',
};

export function FilterChipRow({ options, value, onChange, size = 'md' }: FilterChipRowProps) {
  return (
    <div role="tablist" className="no-scrollbar flex gap-2 overflow-x-auto">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'shrink-0 rounded-[var(--radius-pill)] font-medium transition-colors',
              sizeCls[size],
              active
                ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)]'
                : 'bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text-default)]'
            )}
          >
            {o.label}
            {typeof o.count === 'number' && (
              <span className={cn('ml-1', active ? 'opacity-80' : 'opacity-60')}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
