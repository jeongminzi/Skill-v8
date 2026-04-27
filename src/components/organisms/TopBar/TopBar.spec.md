# TopBar

## Description

Mobile screen header. Renders inside `MobileFrame`. Optional back button on
the left, title in the middle, optional notifications bell + custom trailing
content on the right.

## Props

| Name          | Type                                                 | Required | Default | Description |
|---------------|------------------------------------------------------|----------|---------|-------------|
| title         | string                                               | no       | —       | Header title text. |
| align         | 'left' \| 'center'                                   | no       | 'left'  | Title alignment. Detail screens use `center`. |
| onBack        | () => void                                           | no       | —       | If provided, back IconButton appears. |
| notifications | TopBarNotifications                                  | no       | —       | If provided, bell IconButton appears with optional unread dot when `count > 0`. Sub-type: `{ count?: number; onClick?: () => void }`. |
| trailing      | React.ReactNode                                      | no       | —       | Custom right-side actions (e.g., share IconButton). |

## Variants

- **home** — title left, no back, with notifications.
- **detail** — back + centered title.

## Accessibility

- Notification bell aria-label includes the count when present.
- Title renders as `<h1>` so the screen has a top-level landmark.
