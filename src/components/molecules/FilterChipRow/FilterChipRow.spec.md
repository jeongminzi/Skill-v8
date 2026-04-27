# FilterChipRow

## Description

Horizontal scrollable row of filter pills. Selected pill is filled brand;
inactive pills carry a muted background. Used for booking-status filters
and admin tab toggles.

## Props

| Name     | Type                       | Required | Default | Description |
|----------|----------------------------|----------|---------|-------------|
| options  | FilterChipOption[]         | yes      | —       | Each `{ value, label, count? }`. |
| value    | string                     | yes      | —       | Currently selected `value`. |
| onChange | (value: string) => void    | yes      | —       | Selection handler. |
| size     | 'sm' \| 'md'               | no       | 'md'    | Compact vs default. |

## Variants & States

- **active** — filled brand, white text.
- **inactive** — muted background, hover lifts text color.

Scrolls horizontally with hidden scrollbar (mobile-friendly).

## Accessibility

- Container is `role="tablist"`; each chip is `role="tab"` with `aria-selected`.
