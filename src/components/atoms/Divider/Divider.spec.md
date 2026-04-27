# Divider

## Description

Thin separator used between list rows, between sections, and as inline
splitter inside metadata strips.

## Props

| Name        | Type                                         | Required | Default      | Description |
|-------------|----------------------------------------------|----------|--------------|-------------|
| orientation | 'horizontal' \| 'vertical'                   | no       | 'horizontal' | Layout axis. |
| weight      | 'subtle' \| 'default' \| 'strong'            | no       | 'subtle'     | Border-color ramp. |
| inset       | boolean                                      | no       | false        | Adds gutter so the line doesn't touch container edges. |
| className   | string                                       | no       | —            | Tailwind escape hatch. |

## Variants & States

Static. No interactive states.

## Accessibility

- `role="separator"` with `aria-orientation`.
