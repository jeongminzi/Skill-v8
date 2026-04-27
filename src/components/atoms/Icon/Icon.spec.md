# Icon

## Description

Centralized icon primitive — wraps `lucide-react`. Components and pages
pass a stable string `name` so that swapping the underlying icon library
(or aliasing names) is a one-file change.

## Props

| Name        | Type                          | Required | Default | Description |
|-------------|-------------------------------|----------|---------|-------------|
| name        | string                        | yes      | —       | Logical name (e.g. `bell`, `search`, `chevron_right`). Resolved via the internal map; unknown names fall back to `HelpCircle`. |
| size        | 16 \| 18 \| 20 \| 24 \| 32    | no       | 20      | Icon size in pixels. |
| strokeWidth | number                        | no       | 1.75    | Lucide stroke weight. Use 2.25 for emphasis on active states. |
| filled      | boolean                       | no       | false   | Sets `fill="currentColor"` — used for selected/rated star, favorite heart. |
| className   | string                        | no       | —       | Tailwind escape hatch (color, positioning). |

## Variants

- **size** — 16, 18, 20, 24, 32. Match the type ramp.
- **strokeWidth** — 1.5 (default ish), 1.75 (default here), 2.25 (active emphasis).

## States

Decorative; state is owned by the parent control.

## Accessibility

- Always `aria-hidden`. If the icon conveys meaning, the parent must supply `aria-label`.
- Color and contrast inherited from the wrapping component.
