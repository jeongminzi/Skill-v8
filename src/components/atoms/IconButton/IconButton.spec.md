# IconButton

## Description

Square circular hit-area for a single icon action. Used in headers (back,
notifications), list rows (more, edit, delete), and toolbar areas. The
`badgeDot` flag overlays a red unread dot used for the bell-with-notifications
pattern.

## Props

| Name      | Type                                | Required | Default   | Description |
|-----------|-------------------------------------|----------|-----------|-------------|
| icon      | string                              | yes      | —         | Material Symbols ligature. |
| ariaLabel | string                              | yes      | —         | Required: assistive label for the action. |
| size      | 'sm' \| 'md' \| 'lg'                | no       | 'md'      | 28 / 36 / 44 px hit area. |
| variant   | 'plain' \| 'soft' \| 'solid'        | no       | 'plain'   | Background treatment. |
| tone      | 'neutral' \| 'brand' \| 'danger'    | no       | 'neutral' | Color role. |
| disabled  | boolean                             | no       | false     | Native disabled. |
| badgeDot  | boolean                             | no       | false     | Tiny red unread dot at top-right. |
| onClick   | () => void                          | no       | —         | Click handler. |

## Variants

- **plain** — no background, hover-only tint.
- **soft** — tinted background, used for primary inline action.
- **solid** — filled, used for floating action / sticky CTA.

## States

`default | hover | focus | disabled`. Focus ring matches Button.

## Accessibility

- `aria-label` is **required**. Screen readers must always announce the action.
- `lg` (44px) meets WCAG touch target — prefer it on the mobile frame.
