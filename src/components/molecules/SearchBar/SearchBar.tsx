'use client';
import React, { useState } from 'react';
import { TextField } from '../../atoms/TextField/TextField';
import { Button } from '../../atoms/Button/Button';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  showSubmit?: boolean;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
}
// @spec-managed:end

export function SearchBar({
  initialValue = '',
  placeholder = '스튜디오, 지역, 키워드를 검색해보세요',
  showSubmit = false,
  onSubmit,
  onChange,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const update = (v: string) => {
    setValue(v);
    onChange?.(v);
  };
  return (
    <form
      className={cn('flex items-center gap-2 w-full')}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <div className="flex-1">
        <TextField
          value={value}
          onChange={update}
          placeholder={placeholder}
          shape="pill"
          leadingIcon="search"
          trailingIcon={value ? 'close' : undefined}
          onTrailingClick={() => update('')}
          ariaLabel="검색어 입력"
          type="search"
        />
      </div>
      {showSubmit && (
        <Button type="submit" variant="primary" size="md">검색</Button>
      )}
    </form>
  );
}
