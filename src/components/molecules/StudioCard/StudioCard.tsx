import React from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import { Icon } from '../../atoms/Icon/Icon';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface StudioCardProps {
  name: string;
  area: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  pricePerHour?: number;
  hot?: boolean;
  ad?: boolean;
  tags?: string[];
  layout?: 'grid' | 'carousel';
  onClick?: () => void;
}
// @spec-managed:end

export function StudioCard({
  name,
  area,
  image,
  rating,
  reviewCount,
  pricePerHour,
  hot = false,
  ad = false,
  tags,
  layout = 'carousel',
  onClick,
}: StudioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex shrink-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-pop)]',
        layout === 'carousel' ? 'w-44' : 'w-full'
      )}
    >
      <div
        className={cn(
          'relative w-full bg-gradient-to-br from-[var(--color-primary-bg)] to-[var(--color-brand-100)]',
          layout === 'carousel' ? 'h-28' : 'h-36'
        )}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute left-2 top-2 flex gap-1">
          {hot && <Badge tone="hot" shape="square">HOT</Badge>}
          {ad && <Badge tone="ad" shape="square">AD</Badge>}
        </div>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <div className="line-clamp-1 text-sm font-semibold text-[var(--color-text-strong)]">{name}</div>
        <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)]">
          <Icon name="location_on" size={16} className="text-[var(--color-text-subtle)]" />
          <span>{area}</span>
        </div>
        {(typeof rating === 'number' || typeof reviewCount === 'number') && (
          <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-default)]">
            <Icon name="star" size={14} filled className="text-[var(--color-yellow-500)]" />
            {typeof rating === 'number' && <span className="font-semibold">{rating.toFixed(1)}</span>}
            {typeof reviewCount === 'number' && (
              <span className="text-[var(--color-text-subtle)]">({reviewCount})</span>
            )}
          </div>
        )}
        {typeof pricePerHour === 'number' && (
          <div className="text-xs font-semibold text-[var(--color-text-strong)]">
            {pricePerHour.toLocaleString('ko-KR')}원<span className="font-normal text-[var(--color-text-muted)]"> / 시간</span>
          </div>
        )}
        {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.map((t) => (
              <Badge key={t} tone="neutral">{t}</Badge>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
