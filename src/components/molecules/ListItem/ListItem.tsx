import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface ListItemProps {
  title: string;
  subtitle?: string;
  meta?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  showChevron?: boolean;
  divider?: boolean;
  onClick?: () => void;
}
// @spec-managed:end

export function ListItem({
  title,
  subtitle,
  meta,
  leading,
  trailing,
  showChevron = false,
  divider = true,
  onClick,
}: ListItemProps) {
  const interactive = typeof onClick === 'function';
  const Tag = interactive ? 'button' : 'div';
  return (
    <Tag
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-3.5 text-left',
        divider && 'border-b border-[var(--color-border-subtle)]',
        interactive && 'transition-colors hover:bg-[var(--color-bg-subtle)]'
      )}
    >
      {leading && <span className="shrink-0">{leading}</span>}
      <span className="flex-1 min-w-0">
        <span className="block truncate text-sm font-semibold text-[var(--color-text-strong)]">{title}</span>
        {subtitle && <span className="mt-0.5 block truncate text-xs text-[var(--color-text-muted)]">{subtitle}</span>}
      </span>
      {meta && <span className="shrink-0 text-xs text-[var(--color-text-subtle)]">{meta}</span>}
      {trailing && <span className="shrink-0">{trailing}</span>}
      {showChevron && <Icon name="chevron_right" size={20} className="shrink-0 text-[var(--color-text-subtle)]" />}
    </Tag>
  );
}
