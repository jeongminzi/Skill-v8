# AdCard

## Description

Promotional banner card with gradient background and `AD` label. Used in
the consumer home ad carousel.

## Props

| Name     | Type                                        | Required | Default | Description |
|----------|---------------------------------------------|----------|---------|-------------|
| title    | string                                      | yes      | —       | Headline (up to ~30 chars). |
| subtitle | string                                      | no       | —       | Secondary line. |
| gradient | 'rose' \| 'peach' \| 'mint' \| 'sky'        | no       | 'rose'  | Background gradient palette. |
| onClick  | () => void                                  | no       | —       | Tap handler. |

## Variants

- **gradient** — picks a tonal pair from the primitive palette. `rose` matches brand; the other three rotate.

## Accessibility

- Whole card is a `<button>`. The `AD` Badge surfaces sponsorship visually; assistive readers announce title text.
