# BottomTabBar

## Description

Mobile bottom navigation. Pinned at the bottom of `MobileFrame`. Active tab
gets brand color and a filled icon. Each item can carry an optional unread
count badge.

## Props

| Name     | Type                       | Required | Default | Description |
|----------|----------------------------|----------|---------|-------------|
| items    | BottomTabItem[]            | yes      | —       | 3–5 items: `{ value, label, icon, badgeCount? }`. |
| value    | string                     | yes      | —       | Currently active tab value. |
| onChange | (value: string) => void    | yes      | —       | Tab selection handler. |

## Variants

- **consumerHome** vs **businessHome** — same component, different items.

## States

`default | active`. Active tab fills the icon and tints text brand pink.

## Accessibility

- `role="tablist"` with `aria-label="하단 메뉴"`. Each tab is a `role="tab"` with `aria-selected`.
- Badge counts cap at `99+` to keep width predictable.
