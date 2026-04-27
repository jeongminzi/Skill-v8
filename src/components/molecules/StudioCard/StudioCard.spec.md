# StudioCard

## Description

Card surface for one studio listing. Used in carousels (popular studios on
home), grids (search results), and admin previews. Surfaces image, name,
area, rating, price-per-hour, and promotional badges (HOT/AD).

## Props

| Name         | Type                   | Required | Default     | Description |
|--------------|------------------------|----------|-------------|-------------|
| name         | string                 | yes      | —           | Studio name. |
| area         | string                 | yes      | —           | Korean district label. |
| image        | string                 | no       | —           | Image URL; falls back to brand gradient. |
| rating       | number                 | no       | —           | 0–5 average rating. |
| reviewCount  | number                 | no       | —           | Number of reviews. |
| pricePerHour | number                 | no       | —           | KRW per hour, formatted with thousands separator. |
| hot          | boolean                | no       | false       | HOT promotional badge. |
| ad           | boolean                | no       | false       | AD label. |
| tags         | string[]               | no       | —           | Up to ~3 neutral tag chips. |
| layout       | 'grid' \| 'carousel'   | no       | 'carousel'  | `carousel` = fixed 176px width; `grid` = full-width. |
| onClick      | () => void             | no       | —           | Click handler — entire card is the hit area. |

## Variants

- **layout: carousel** — fixed-width card for horizontal scroll on home.
- **layout: grid** — full-width inside grid columns or stacked list.

## States

`default | hover` — hover deepens shadow.

## Accessibility

- Wraps a `<button>` so the card is keyboard-actionable.
- Image is decorative (`alt=""`); the title carries semantics.
