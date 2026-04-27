'use client';
import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface BottomTabBarProps {
  items: BottomTabItem[];
  value: string;
  onChange: (value: string) => void;
}
// @spec-managed:end

export function BottomTabBar({ items, value, onChange }: BottomTabBarProps) {
  return (
    <nav
      role="tablist"
      aria-label="하단 메뉴"
      className="absolute inset-x-0 bottom-0 flex border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] py-2"
    >
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-0.5 py-1 text-[11px] font-medium transition-colors',
              active ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]'
            )}
          >
            <span className="relative">
              <Icon name={it.icon} size={24} filled={active} />
              {typeof it.badgeCount === 'number' && it.badgeCount > 0 && (
                <span className="absolute -right-1.5 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-danger)] px-1 text-[9px] font-bold text-[var(--color-text-inverse)]">
                  {it.badgeCount > 99 ? '99+' : it.badgeCount}
                </span>
              )}
            </span>
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
