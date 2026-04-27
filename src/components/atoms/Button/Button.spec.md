# Button

## Description

Primary call-to-action and form-submission control. Used for booking,
payment, save, cancel-confirm, and generic actions across consumer, business,
and admin screens. Inherits brand pink as the primary; secondary outlines
the same brand color for less weighty CTAs.

## Props

| Name         | Type                                            | Required | Default   | Description |
|--------------|-------------------------------------------------|----------|-----------|-------------|
| variant      | 'primary' \| 'secondary' \| 'ghost' \| 'danger' | no       | 'primary' | Visual emphasis. `danger` for destructive confirms. |
| size         | 'sm' \| 'md' \| 'lg'                            | no       | 'md'      | Height + padding ramp. |
| block        | boolean                                         | no       | false     | Stretches to 100% width — used for sticky bottom CTAs. |
| loading      | boolean                                         | no       | false     | Replaces leading icon with a spinner; disables clicks. |
| disabled     | boolean                                         | no       | false     | Native disabled + reduced opacity. |
| leadingIcon  | string                                          | no       | —         | Material Symbols ligature shown before the label. |
| trailingIcon | string                                          | no       | —         | Material Symbols ligature shown after the label. |
| type         | 'button' \| 'submit' \| 'reset'                 | no       | 'button'  | Native button type. |
| children     | React.ReactNode                                 | yes      | —         | Label content. |
| onClick      | () => void                                      | no       | —         | Click handler. |

## Variants

- **primary** — solid brand pink. Default for the main action on a screen.
- **secondary** — white surface with brand border + brand text. Pairs with primary.
- **ghost** — transparent, neutral text. For list-row and toolbar actions.
- **danger** — solid red. Cancel-with-loss, delete, ban.

## States

`default | hover | focus-visible | active | disabled | loading`. Disabled
and loading both block clicks and dim to 50%. Focus-visible draws a 2px
ring in the brand color at 40% alpha.

## Examples

```tsx
<Button variant="primary" size="lg" block>결제하기 ₩120,000</Button>
<Button variant="secondary" leadingIcon="storefront">스튜디오 보기</Button>
<Button variant="danger" leadingIcon="delete">예약 취소</Button>
<Button loading>저장 중…</Button>
```

## Accessibility

- Native `<button>` — keyboard activation via Space/Enter.
- `aria-busy` set while loading.
- Disabled state surfaces via the native `disabled` attribute.
- Hit area meets 44px on `md` (40px) / `lg` (48px) — `sm` (32px) is reserved for inline use only.
