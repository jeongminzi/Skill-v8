# CategoryCircle

## Description

Round category chip with icon + label, used in the consumer home category
grid and the business category selector. Replaces `.cat-circle` legacy
class.

## Props

| Name    | Type                  | Required | Default | Description |
|---------|-----------------------|----------|---------|-------------|
| label   | string                | yes      | —       | Korean category name. |
| icon    | string                | yes      | —       | Material Symbols ligature. |
| active  | boolean               | no       | false   | Selected state — brand border + tinted bg + filled icon. |
| size    | 'sm' \| 'md' \| 'lg'  | no       | 'md'    | 48 / 56 / 64 px circle. |
| onClick | () => void            | no       | —       | If provided, the circle becomes a toggle button. |

## Variants

- **active** — selected category in a filter or grid.
- **size** — `sm` for inline chip rows, `md` for grids, `lg` for hero pickers.

## States

`default | hover | active | disabled (no onClick)`.

## Accessibility

- When `onClick` is supplied, renders as `<button aria-pressed>`.
- When omitted, falls back to a disabled button so the visual treatment is preserved.
