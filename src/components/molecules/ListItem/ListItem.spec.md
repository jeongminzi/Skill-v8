# ListItem

## Description

Generic row primitive: leading slot (avatar/icon), title + optional subtitle,
optional meta text, optional trailing slot (badge/button), optional
chevron. Used for booking lists, settings, member lists, settlement rows.

## Props

| Name        | Type            | Required | Default | Description |
|-------------|-----------------|----------|---------|-------------|
| title       | string          | yes      | —       | Primary line. |
| subtitle    | string          | no       | —       | Secondary line. |
| meta        | string          | no       | —       | Right-aligned meta string (date/amount/status). |
| leading     | React.ReactNode | no       | —       | Left adornment (icon, avatar). |
| trailing    | React.ReactNode | no       | —       | Right adornment before the chevron. |
| showChevron | boolean         | no       | false   | Right-edge chevron when row navigates. |
| divider     | boolean         | no       | true    | Bottom hairline. |
| onClick     | () => void      | no       | —       | If provided, row renders as `<button>` and gets hover affordance. |

## Variants & States

- **interactive** — `<button>` with hover bg.
- **static** — `<div>`, no hover.

## Accessibility

- Interactive rows are real buttons (keyboard-focusable).
- Long content truncates; full text is announced via DOM (no `aria-hidden` overrides).
