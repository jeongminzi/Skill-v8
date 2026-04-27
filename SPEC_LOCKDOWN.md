# Spec Lockdown

이 디자인 시스템은 각 컴포넌트마다 옆에 있는 `<Component>.spec.md`를
**API 단일 소스 (single source of truth)** 로 사용합니다. 코드와 스펙이
어긋나면 pre-commit 훅이 커밋을 거부합니다 — 이 구조 자체가 Storybook과
실제 화면이 어긋나지 않도록 막아줍니다.

## 디자이너 / PM이 Prop·Variant·State를 바꾸려면

1. 해당 컴포넌트의 `.spec.md`를 수정합니다.
   예: `src/components/atoms/Button/Button.spec.md`
2. 다음 명령으로 코드를 재생성합니다.

   ```bash
   npm run regen:from-spec Button
   ```

3. `Button.tsx`의 Props 인터페이스, `Button.stories.tsx`의 `argTypes`와
   per-variant 스토리가 자동으로 업데이트됩니다. Storybook을 새로고침해서
   확인하세요.

## 개발자가 구현을 바꾸려면

JSX 렌더링, 핸들러, 내부 상태, CSS 클래스는 자유롭게 수정할 수 있습니다.
다만 `// @spec-managed:start … @spec-managed:end` 사이는 codegen 영역이라
손으로 고치면 안 됩니다.

새 Prop이나 Variant가 필요하면:

1. `.spec.md`를 먼저 수정.
2. `npm run regen:from-spec <Name>` 실행.
3. 새 Prop을 컴포넌트 본문에서 구현.

## Pre-commit 훅이 검사하는 것

`check:spec-drift`는 API 표면(Prop 이름·타입·required·기본값, variant
union, story argTypes)만 비교합니다. JSX나 `@spec-managed` 밖의 코드는
건드리지 않습니다.

## 새 컴포넌트 추가

```bash
npm run spec:new Card
# 또는 layer 지정:
npm run spec:new Modal --layer organisms
```

`src/components/<layer>/<Name>/<Name>.spec.md`를 템플릿으로 생성합니다.
스펙을 채운 뒤 `npm run regen:from-spec <Name>`을 실행하면 `.tsx`와
`.stories.tsx`가 함께 만들어집니다 — JSX는 직접 채워 넣으세요.

## 자주 발생하는 에러

| 메시지 | 원인 | 해결 |
|--------|------|------|
| `spec block missing` | 누군가 `@spec-managed` 센티널을 지웠음 | `npm run regen:from-spec <Name>` 다시 실행 |
| `props union diverges from spec` | `.tsx`에 spec에 없는 variant를 추가함 | spec을 수정하거나, 변경을 되돌리기 |
| `dirty working tree` | 작업중인 파일이 있는 상태에서 regen 시도 | 변경사항을 커밋·stash 한 뒤 다시 |

## 우회하지 말 것

`git commit --no-verify`로 훅을 건너뛰지 마세요. 훅이 실패하는 건 spec과
코드가 다르다는 뜻이고, 이걸 우회하면 V6에서 겪었던 "Storybook과 실제
화면이 따로 노는" 문제가 다시 시작됩니다.
