# Badge

## Description

Compact label for status, taxonomy, and promotional flags (HOT, BEST, AD).
Replaces the legacy `.badge-best`, `.badge-hot`, `.policy-badge`, and
`.keyword-pill` ad-hoc classes.

## Props

| Name     | Type                                                                              | Required | Default   | Description |
|----------|-----------------------------------------------------------------------------------|----------|-----------|-------------|
| tone     | 'neutral' \| 'brand' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'hot' \| 'best' \| 'ad' | no | 'neutral' | Color role. |
| size     | 'sm' \| 'md'                                                                      | no       | 'sm'      | 10px text vs 12px text. |
| shape    | 'pill' \| 'square'                                                                | no       | 'pill'    | `square` = 4px radius for promotional flags (HOT/BEST). |
| outline  | boolean                                                                           | no       | false     | Border + transparent background. |
| children | React.ReactNode                                                                   | yes      | —         | Label. |

## Variants

- **status tones** — success / warning / danger / info / neutral / brand. Tinted bg, dark fg.
- **promotional tones** — hot, best, ad. Solid background, white text, square corners.
- **outline** — for keyword chips and category filters.

## States

Static. Interactivity belongs to the parent (e.g., `FilterChip`, `Tag`).

## Accessibility

- Decorative by default. When the badge is the only signal of state (e.g., `취소`),
  the consuming component is responsible for an `aria-label` on the row.
