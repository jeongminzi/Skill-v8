# MobileFrame

## Description

Phone-shaped wrapper that simulates the app viewport in a desktop browser
(prototype only — production app is React Native, not this component).
Provides a fixed header slot, scrollable body, and fixed footer slot
(typically `BottomTabBar`).

## Props

| Name        | Type                       | Required | Default              | Description |
|-------------|----------------------------|----------|----------------------|-------------|
| width       | 360 \| 375 \| 390          | no       | 390                  | Viewport width matching common iPhone breakpoints. |
| height      | number                     | no       | 780                  | Viewport height. |
| background  | string                     | no       | `var(--color-bg-app)`| Body background. |
| header      | React.ReactNode            | no       | —                    | Sticky top slot — use `TopBar`. |
| footer      | React.ReactNode            | no       | —                    | Sticky bottom slot — use `BottomTabBar`. |
| children    | React.ReactNode            | yes      | —                    | Scrollable body content. |

## Variants

- **width** — 360 (small Android), 375 (older iPhone), 390 (iPhone 14/15 default).

## Accessibility

- The frame is purely visual. Focus order is determined by header → children → footer.
- `aria` semantics belong to inner components (`<header>`, `<nav>`).
