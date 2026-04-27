# TextField

## Description

Single-line text input with optional leading icon and trailing action
button (commonly a clear-input X). Used for search bars, login,
profile-edit, and policy-form inputs.

## Props

| Name            | Type                                                            | Required | Default     | Description |
|-----------------|-----------------------------------------------------------------|----------|-------------|-------------|
| value           | string                                                          | yes      | —           | Controlled value. |
| onChange        | (value: string) => void                                         | yes      | —           | Change handler. |
| placeholder     | string                                                          | no       | —           | Placeholder text. |
| shape           | 'rounded' \| 'pill'                                             | no       | 'rounded'   | 12px radius vs full pill. |
| leadingIcon     | string                                                          | no       | —           | Material Symbols name. |
| trailingIcon    | string                                                          | no       | —           | Trailing button icon (e.g. `close`). |
| onTrailingClick | () => void                                                      | no       | —           | Click handler for trailing icon. |
| disabled        | boolean                                                         | no       | false       | Native disabled. |
| invalid         | boolean                                                         | no       | false       | Red border + `aria-invalid`. |
| type            | 'text' \| 'search' \| 'tel' \| 'email' \| 'password' \| 'number' | no       | 'text'      | Native input type. |
| ariaLabel       | string                                                          | no       | —           | Accessible name when no visible label. |

## Variants

- **shape: rounded** — form fields.
- **shape: pill** — search bars on mobile home screen.

## States

`default | focus | invalid | disabled`. Focus ring re-uses brand color via
border swap (no outline) to match the prototype's existing look.

## Accessibility

- Provide `ariaLabel` whenever the field has no visible label.
- `aria-invalid` automatically applied when `invalid`.
