# Spec Bootstrap Report

draft-to-storybook-v8 스킬을 funni-prototype 브랜치에 적용한 결과입니다.

## 환경

- **Stack**: Next.js 16.2.3 · React 19.2.4 · Tailwind v4 · TypeScript 5
- **Storybook**: 10.3.5 (`@storybook/nextjs-vite` framework)
- **Tokens**: 단일 CSS 소스 (`app/globals.css`) — primitive(gray cool / brand pink / red / green / yellow / blue) → semantic(text·bg·border·state)
- **Font**: Pretendard Variable (CDN) · Material Symbols Rounded (이모지 사용 금지 정책 반영)

## 추출된 컴포넌트

| Layer | Name | 스펙 | 스토리 |
|-------|------|------|--------|
| Atom | Icon | ✓ | Default · Filled · Size16 · Size32 · Gallery |
| Atom | Button | ✓ | Primary · Secondary · Ghost · Danger · Disabled · Loading · Sizes · WithIcons · Block |
| Atom | Badge | ✓ | Neutral · Brand · Success · Warning · Danger · Hot · Best · Ad · Outline · Gallery |
| Atom | IconButton | ✓ | Plain · Soft · Solid · WithDot · Disabled |
| Atom | TextField | ✓ | Default · Pill · Search · Invalid · Disabled |
| Atom | CategoryCircle | ✓ | Default · Active · Small · Large · Grid |
| Atom | StarRating | ✓ | Default · ReadOnly · Large |
| Atom | Divider | ✓ | Subtle · Strong · Vertical |
| Molecule | SearchBar | ✓ | Default · WithSubmit · Prefilled |
| Molecule | FilterChipRow | ✓ | Default · Small |
| Molecule | StudioCard | ✓ | Default · Hot · Ad · Grid · HorizontalRow |
| Molecule | AdCard | ✓ | Rose · Peach · Mint · Sky |
| Molecule | ListItem | ✓ | Default · WithBadgeMeta · WithLeadingIcon · NoChevron |
| Molecule | BottomTabBar | ✓ | ConsumerHome · BusinessHome |
| Organism | TopBar | ✓ | Default · WithBack · Centered · NoNotifications |
| Organism | MobileFrame | ✓ | Empty · Width360/375/390 · ConsumerHome (live preview) |

**합계**: atoms 8 · molecules 6 · organisms 2 = **16개 컴포넌트, 16개 spec.md**

## Spec Lockdown 상태

- `npm run check:spec-drift` → `[spec-drift] all 16 components in sync`
- pre-commit 훅: `simple-git-hooks` 등록 완료. 커밋 시 자동으로 staged 컴포넌트 검사.
- 새 컴포넌트 시작: `npm run spec:new <Name> [--layer molecules|organisms]`
- 단일 컴포넌트 재생성: `npm run regen:from-spec <Name>`

## Legacy CSS

`globals.css`의 다음 임시 클래스는 token-driven 컴포넌트로 마이그레이션
대상입니다 (페이지 4개를 점진적으로 컴포넌트로 교체할 때 함께 제거):

- `.policy-badge` → `<Badge tone="warning">`
- `.policy-area` (Admin 전용 wrapper) → 추후 PolicyArea 컴포넌트로 추출
- `.badge-best` / `.badge-hot` → `<Badge tone="best|hot" shape="square">`
- `.keyword-pill` → `<Badge tone="brand" outline>`
- `.cat-circle` → `<CategoryCircle>`

## 미적용 / 후속 작업

- **Phase 7–9 (전체 페이지 codemod swap)**: `app/consumer`, `app/business`,
  `app/admin`, `app/feedback-admin`, `app/components/PolicyForm`은 인라인
  Tailwind와 ad-hoc CSS를 그대로 유지. 컴포넌트 일대일 매핑이 필요한
  부분은 `assets/scripts/swap-components.js`와 `swap-mapping.example.js`를
  참고해 점진적으로 적용.
- **Phase 6 (`detect-hardcoded.js`)**: 토큰 외 색상/사이즈가 남아있는
  지점을 찾아 다음 PR에서 정리 권장. 현재는 token migration이 페이지
  스왑보다 빠르게 끝나는 시나리오를 가정.
