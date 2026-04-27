# Icon

## Description

Material Symbols Rounded glyph rendered as a font character. Project-wide icon
primitive — emoji and arbitrary unicode are forbidden by user policy. All
icons resolve through this component so weight, size, and fill stay
consistent.

## Props

| Name      | Type                                  | Required | Default | Description |
|-----------|---------------------------------------|----------|---------|-------------|
| name      | string                                | yes      | —       | Material Symbols ligature name (e.g. `home`, `favorite`). |
| size      | 16 \| 18 \| 20 \| 24 \| 32            | no       | 20      | Glyph size in pixels — matches the design ramp. |
| filled    | boolean                               | no       | false   | Toggles the filled axis via `font-variation-settings`. |
| className | string                                | no       | —       | Extra Tailwind classes for color or positioning. |

## Variants

- **size** — 16, 18, 20, 24, 32. Larger sizes used for empty-states and CTA icons; 16/18 for inline copy.
- **filled** — outlined (default) vs filled glyph. Selection states and active tabs use filled.

## States

Icons are decorative (`aria-hidden`); state is owned by the parent control.

## Accessibility

- Always `aria-hidden`. If the icon conveys meaning, the parent must supply `aria-label` text.
- Color contrast comes from the wrapping component, not the Icon itself.
