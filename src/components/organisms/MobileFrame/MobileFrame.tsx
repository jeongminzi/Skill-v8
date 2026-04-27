import React from 'react';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface MobileFrameProps {
  width?: 360 | 375 | 390;
  height?: number;
  background?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}
// @spec-managed:end

export function MobileFrame({
  width = 390,
  height = 780,
  background = 'var(--color-bg-app)',
  header,
  footer,
  children,
}: MobileFrameProps) {
  return (
    <div
      className={cn(
        'relative mx-auto overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-pop)]'
      )}
      style={{ width, height, borderRadius: 'var(--radius-2xl)' }}
    >
      {header}
      <div
        className="overflow-y-auto"
        style={{
          height: footer ? `calc(100% - ${header ? '76px' : '0px'} - 64px)` : `calc(100% - ${header ? '76px' : '0px'})`,
          background,
        }}
      >
        {children}
      </div>
      {footer}
    </div>
  );
}
