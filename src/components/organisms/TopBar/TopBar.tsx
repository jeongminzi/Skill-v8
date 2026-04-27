import React from 'react';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { cn } from '../../../lib/cn';

export interface TopBarNotifications {
  count?: number;
  onClick?: () => void;
}

// @spec-managed:start props
export interface TopBarProps {
  title?: string;
  align?: 'left' | 'center';
  onBack?: () => void;
  notifications?: TopBarNotifications;
  trailing?: React.ReactNode;
}
// @spec-managed:end

export function TopBar({
  title,
  align = 'left',
  onBack,
  notifications,
  trailing,
}: TopBarProps) {
  return (
    <header className="flex items-center gap-2 bg-[var(--color-bg-surface)] px-4 pt-5 pb-3">
      {onBack && (
        <IconButton icon="back" ariaLabel="뒤로" variant="plain" tone="neutral" size="md" onClick={onBack} />
      )}
      <div className={cn('flex-1', align === 'center' && 'text-center')}>
        {title && <h1 className="truncate text-base font-bold text-[var(--color-text-strong)]">{title}</h1>}
      </div>
      {notifications && (
        <IconButton
          icon="notifications"
          ariaLabel={`알림${notifications.count ? ` ${notifications.count}건` : ''}`}
          variant="plain"
          tone="neutral"
          size="md"
          badgeDot={!!(notifications.count && notifications.count > 0)}
          onClick={notifications.onClick}
        />
      )}
      {trailing}
    </header>
  );
}
