# SearchBar

## Description

Pill-shaped search input with leading magnifier icon, optional clear button,
and an optional submit Button. Used on consumer home, business studio
browse, and admin search filters.

## Props

| Name         | Type                       | Required | Default                                | Description |
|--------------|----------------------------|----------|----------------------------------------|-------------|
| initialValue | string                     | no       | ''                                     | Initial query. |
| placeholder  | string                     | no       | '스튜디오, 지역, 키워드를 검색해보세요' | Korean placeholder. |
| showSubmit   | boolean                    | no       | false                                  | Renders a primary Button after the field. |
| onSubmit     | (value: string) => void    | no       | —                                      | Form submit handler. |
| onChange     | (value: string) => void    | no       | —                                      | Live input change. |

## Variants

- **inline (default)** — search-as-you-type without explicit submit.
- **withSubmit** — discrete search button next to the field.

## States

Inherits TextField states. Submit button inherits Button states.

## Accessibility

- Wraps in a `<form>` so Enter triggers `onSubmit`.
- TextField has an `ariaLabel` of `검색어 입력` because the label is implicit (icon).
