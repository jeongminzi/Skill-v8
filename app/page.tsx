"use client";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "../src/components/atoms/Icon/Icon";

const tiles = [
  { href: "/consumer", icon: "smartphone", title: "소비자 화면", desc: "스튜디오 탐색 → 예약 → 결제" },
  { href: "/business", icon: "building",   title: "업체 화면",   desc: "스튜디오 관리 → 예약 달력 → 정산" },
  { href: "/admin",    icon: "monitor",    title: "어드민 웹",   desc: "입점 관리 → 수동 정산 → 광고" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[var(--color-brand-50)] via-[var(--color-bg-app)] to-[var(--color-bg-surface)] p-6">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-[var(--radius-2xl)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-card)] ring-1 ring-[var(--color-brand-100)]">
          <Image src="/photopop-logo.png" alt="포토팟 로고" width={72} height={72} className="h-[72px] w-[72px] object-contain" />
        </div>
        <p className="mb-2 text-sm font-medium text-[var(--color-text-brand)]">Photopot Prototype</p>
        <h1 className="mb-2 text-4xl font-bold text-[var(--color-text-strong)]">포토팟</h1>
        <p className="text-base text-[var(--color-text-muted)]">촬영 스튜디오 예약과 운영 관리를 연결하는 플랫폼</p>
      </div>

      <div className="mb-8 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-bg)] text-[var(--color-primary)]">
              <Icon name={t.icon} size={24} />
            </div>
            <h2 className="mb-1 text-lg font-bold text-[var(--color-text-strong)]">{t.title}</h2>
            <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-subtle)]">{t.desc}</p>
            <span className="text-sm font-medium text-[var(--color-primary)] group-hover:underline">열기 →</span>
          </Link>
        ))}
      </div>

      <div className="mb-4 w-full max-w-4xl rounded-[var(--radius-lg)] border border-[var(--color-brand-100)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-card)]">
        <div className="mb-2 flex items-center gap-2">
          <Icon name="smartphone" size={16} className="text-[var(--color-text-default)]" />
          <span className="text-sm font-bold text-[var(--color-text-strong)]">앱 구조</span>
        </div>
        <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
          소비자와 업체는 <strong className="text-[var(--color-primary)]">하나의 앱</strong>에서 동작합니다.
          하단 탭은 공통 구조를 유지하고, 마지막 탭만 계정 유형에 맞는 개인/업체 메뉴로 전환됩니다.
        </p>
      </div>

      <div className="w-full max-w-4xl rounded-[var(--radius-lg)] border border-[var(--color-brand-100)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-card)]">
        <div className="mb-2 flex items-center gap-2">
          <Icon name="sparkles" size={16} className="text-[var(--color-primary)]" />
          <span className="text-sm font-bold text-[var(--color-text-strong)]">현재 반영 범위</span>
        </div>
        <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
          홈 구조 리디자인, 로고 교체, 브랜드 톤 정리, 소비자/업체 주요 진입 화면 리브랜딩을 우선 반영했습니다.
          이후 검색, 예약, 상세 운영 흐름도 같은 톤으로 확장할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
