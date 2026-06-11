'use client';

import { docsRoute } from '@/lib/shared';
import { ArrowRight, CircleCheck, CircleX } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Scene = {
  /** Short pixel-label for the tab. */
  tag: string;
  /** Plain-language goal the user actually has. */
  goal: string;
  weak: string;
  strong: string;
  /** One line on what the upgrade buys you. */
  payoff: string;
};

const SCENES: Scene[] = [
  {
    tag: 'WORK',
    goal: '写周报',
    weak: '帮我写一篇周报。',
    strong:
      '你是我的职场写作搭子。帮我把这几件事写成周报：① 上线了登录功能 ② 修了 3 个支付 bug ③ 和设计对了新首页。\n要求：分「本周完成 / 下周计划」两段，语气专业但不浮夸，控制在 200 字内。',
    payoff: '给足背景和格式，AI 才能直接交付，而不是还你一句空话。',
  },
  {
    tag: 'LIFE',
    goal: '做攻略',
    weak: '帮我做个成都旅游攻略。',
    strong:
      '帮我规划成都 3 天 2 晚行程，预算 2000 元 / 人。我爱吃辣、想看熊猫、不爱赶路。\n请按「每天上午 / 下午 / 晚上」排，标注人均花费和地铁怎么坐。',
    payoff: '说清预算、口味和节奏，结果就从「百度同款」变成「为你定制」。',
  },
  {
    tag: 'STUDY',
    goal: '学概念',
    weak: '区块链是什么？',
    strong:
      '我完全不懂技术。请用「记账本」的比喻给我讲清楚区块链，控制在 3 句话。\n讲完再举一个我日常生活里能用到的例子。',
    payoff: '指定比喻、长度和受众，再难的概念也能被「翻译」成人话。',
  },
];

export function PromptDuel() {
  const [active, setActive] = useState(0);
  const scene = SCENES[active];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Scenario tabs — styled as game stage selectors */}
      <div
        role="tablist"
        aria-label="提问场景"
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        {SCENES.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.tag}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 ${selected
                ? 'border-(--color-island-coral)/50 bg-(--color-island-coral)/10 text-fd-foreground shadow-[0_0_24px_-6px_var(--color-island-coral)]'
                : 'border-fd-border bg-fd-card/40 text-fd-muted-foreground hover:border-(--color-island-coral)/30 hover:text-fd-foreground'
                }`}
            >
              <span className="font-pixel text-[9px] text-(--color-island-coral)">{s.tag}</span>
              <span className="font-medium">{s.goal}</span>
            </button>
          );
        })}
      </div>

      {/* The matchup */}
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* Weak side */}
        <PromptCard
          variant="weak"
          label="随口一问"
          badge="LV.1"
          body={scene.weak}
        />

        {/* VS divider */}
        <div className="flex items-center justify-center md:flex-col md:py-0">
          <span className="font-pixel rounded-md border border-fd-border bg-fd-card/60 px-3 py-2 text-[10px] text-fd-muted-foreground backdrop-blur-md">
            VS
          </span>
        </div>

        {/* Strong side */}
        <PromptCard
          variant="strong"
          label="黄金 Prompt"
          badge="LV.99"
          body={scene.strong}
        />
      </div>

      {/* Payoff + CTA */}
      <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-fd-border bg-fd-card/30 px-6 py-5 text-center backdrop-blur-md sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-fd-muted-foreground">
          <CircleCheck className="mr-1.5 inline size-4 text-emerald-400 align-text-bottom" />
          {scene.payoff}
        </p>
        <Link
          href={`${docsRoute}/claude`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-linear-to-r from-(--color-island-coral) to-(--color-island-gold) px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_var(--color-island-coral)]"
        >
          学会这套魔法
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

function PromptCard({
  variant,
  label,
  badge,
  body,
}: {
  variant: 'weak' | 'strong';
  label: string;
  badge: string;
  body: string;
}) {
  const isStrong = variant === 'strong';

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-fd-card/40 p-1 backdrop-blur-md transition-all duration-300 ${isStrong
        ? 'border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-[0_0_40px_-12px_theme(colors.emerald.500)]'
        : 'border-fd-border opacity-80 hover:opacity-100'
        }`}
    >
      {/* pixel title bar */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          {isStrong ? (
            <CircleCheck className="size-4 text-emerald-400" />
          ) : (
            <CircleX className="size-4 text-fd-muted-foreground" />
          )}
          <span className="text-xs font-medium text-fd-muted-foreground">{label}</span>
        </div>
        <span
          className={`font-pixel rounded px-1.5 py-1 text-[8px] ${isStrong
            ? 'bg-emerald-500/15 text-emerald-300'
            : 'bg-fd-muted text-fd-muted-foreground'
            }`}
        >
          {badge}
        </span>
      </div>

      {/* prompt body — terminal style */}
      <div className="flex-1 rounded-xl bg-fd-background/60 p-4">
        <p className="whitespace-pre-line text-left text-sm leading-relaxed text-fd-foreground/90">
          <span
            className={`mr-1.5 select-none ${isStrong ? 'text-emerald-400' : 'text-fd-muted-foreground'}`}
          >
            {isStrong ? '+' : '−'}
          </span>
          {body}
        </p>
      </div>
    </div>
  );
}
