'use client';
import React from 'react';
import { Icon } from '../Icon/Icon';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface StarRatingProps {
  value: number;
  max?: number;
  size?: 16 | 20 | 24 | 32;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}
// @spec-managed:end

export function StarRating({
  value,
  max = 5,
  size = 20,
  readOnly = false,
  onChange,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div className="inline-flex items-center gap-0.5" role={readOnly ? 'img' : 'radiogroup'} aria-label={`평점 ${value} / ${max}`}>
      {stars.map((s) => {
        const filled = s <= value;
        const Tag = readOnly ? 'span' : 'button';
        return (
          <Tag
            key={s}
            {...(readOnly
              ? {}
              : {
                  type: 'button' as const,
                  'aria-label': `${s}점`,
                  onClick: () => onChange?.(s),
                })}
            className={cn(
              'leading-none',
              !readOnly && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 rounded'
            )}
          >
            <Icon
              name="star"
              size={size}
              filled={filled}
              className={filled ? 'text-[var(--color-yellow-500)]' : 'text-[var(--color-gray-300)]'}
            />
          </Tag>
        );
      })}
    </div>
  );
}
