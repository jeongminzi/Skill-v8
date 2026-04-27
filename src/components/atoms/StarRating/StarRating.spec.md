# StarRating

## Description

Five-star rating control. Read-only for displaying review averages, interactive
for the review-write screen.

## Props

| Name     | Type                          | Required | Default | Description |
|----------|-------------------------------|----------|---------|-------------|
| value    | number                        | yes      | —       | Number of filled stars (0-max). |
| max      | number                        | no       | 5       | Total stars. |
| size     | 16 \| 20 \| 24 \| 32          | no       | 20      | Glyph size. |
| readOnly | boolean                       | no       | false   | Disables interaction; renders as `role=img`. |
| onChange | (value: number) => void       | no       | —       | Required for interactive mode. |

## Variants

- **readOnly** — display review averages, locked at given value.
- **interactive** — review write/edit, click sets value.

## States

`default | hover (interactive) | focus (interactive)`.

## Accessibility

- Read-only: `role="img"` with full-rating aria-label.
- Interactive: `role="radiogroup"` with one button per star, each labeled `${n}점`.
