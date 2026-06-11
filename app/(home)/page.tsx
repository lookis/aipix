import './home.css';

import { PromptDuel } from '@/components/home/prompt-duel';
import { appName, docsRoute } from '@/lib/shared';
import {
  ArrowRight,
  BookOpenCheck,
  Globe2,
  Send,
  Sparkles,
  TerminalSquare,
  WandSparkles,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';


/**
 * Single source of truth for site-wide identity copy.
 * Reference `siteConfig.*` in components instead of hardcoding strings.
 */
export const siteConfig = {
  name: appName,
  /** Short pixel-font label used in eyebrows / the hero badge. */
  label: 'AIPIX.LAND',
  tagline: '用大白话，把 AI 讲给你听',
  description:
    '一座为普通人准备的 AI 学习小岛。不用懂代码，从概念到上手，带你玩转海内外大模型。',
  docs: docsRoute,
} as const;


export const metadata: Metadata = {
  title: `${siteConfig.name} · ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      {/* signature: glow grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="island-glow absolute inset-0 opacity-60 dark:opacity-100" />
        <div className="island-grid absolute inset-0" />
      </div>

      <Hero />
      <Features />
      <DuelSection />
      <FinalCta />
    </main>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 pb-28 md:pt-32 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: the pitch */}
        <div className="anim-rise text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-(--color-island-coral)/30 bg-(--color-island-coral)/5 px-3 py-1.5 backdrop-blur-md">
            <Sparkles className="size-3.5 text-(--color-island-coral)" />
            <span className="font-pixel text-[9px] text-(--color-island-coral)">{siteConfig.label}</span>
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-fd-foreground sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-(--color-island-coral) to-(--color-island-gold) bg-clip-text text-transparent">
              {siteConfig.tagline}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fd-muted-foreground lg:mx-0">
            {siteConfig.description}不绕术语，不卖焦虑。从「这是什么」到「我会用了」，
            <span className="text-fd-foreground">{siteConfig.name}</span> 陪你一关一关通。
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href={siteConfig.docs}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-(--color-island-coral) to-(--color-island-gold) px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_var(--color-island-gold)] sm:w-auto"
            >
              进岛开始学
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fd-border bg-fd-card/40 px-7 py-3.5 font-semibold text-fd-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-(--color-island-coral)/40 sm:w-auto"
            >
              看看能学到啥
            </Link>
          </div>

          <p className="mt-5 text-sm text-fd-muted-foreground">
            零基础友好 · 中英文模型都讲 · 隐私党也有本地玩法
          </p>
        </div>

        {/* Right: live demo — AI speaking 大白话 */}
        <HeroDemo />
      </div>
    </section>
  );
}

/* The hero centerpiece: a floating glass chat window that demonstrates
   the whole product promise — a hard idea, explained like you're five. */
function HeroDemo() {
  return (
    <div className="anim-float relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-2xl border border-black/5 bg-white/70 p-1.5 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/50">
        {/* title bar with pixel dots */}
        <div className="flex items-center gap-1.5 px-3 py-2.5">
          <span className="size-2.5 rounded-[2px] bg-(--color-island-coral)/80" />
          <span className="size-2.5 rounded-[2px] bg-(--color-island-gold)/80" />
          <span className="size-2.5 rounded-[2px] bg-emerald-400/80" />
          <span className="ml-2 font-pixel text-[8px] text-fd-muted-foreground">
            ask-the-island
          </span>
        </div>

        <div className="space-y-4 rounded-xl bg-fd-card/50 p-5 dark:bg-fd-background/70">
          {/* user question */}
          <div className="flex justify-end">
            <p className="max-w-[80%] rounded-2xl rounded-tr-sm bg-(--color-island-coral)/10 px-4 py-2.5 text-sm text-fd-foreground">
              大语言模型到底是个啥？
            </p>
          </div>

          {/* AI answer in plain words */}
          <div className="flex gap-2.5">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-(--color-island-coral) to-(--color-island-gold)">
              <Sparkles className="size-4 text-white" />
            </span>
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm border border-black/5 bg-white/80 px-4 py-2.5 text-sm leading-relaxed text-fd-foreground/90 dark:border-white/10 dark:bg-fd-card/60">
              想象一个读完了大半个互联网的「超级接话王」。你起个头，它就猜下一个词最该是啥，一个接一个，凑成一整段话。
              <span className="anim-blink ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-(--color-island-coral)" />
            </p>
          </div>
        </div>

        {/* fake input row */}
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="flex-1 truncate text-sm text-fd-muted-foreground">
            换个问题问问看…
          </span>
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-(--color-island-coral) to-(--color-island-gold)">
            <Send className="size-4 text-white" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- FEATURES --------------------------- */
const FEATURES = [
  {
    icon: BookOpenCheck,
    name: '概念大白话',
    desc: '什么是 LLM？什么是 Token？拒绝术语轰炸，全用你听得懂的比喻讲清楚，看完就有「原来如此」。',
    href: '/docs',
    cta: '从第一课开始',
    span: 'lg:col-span-2',
  },
  {
    icon: Globe2,
    name: '玩转海内外模型',
    desc: 'ChatGPT、Claude 到文心一言、通义千问，注册、上手、避坑，一步步带你走通。',
    href: '/docs/overseas',
    cta: '挑个模型试试',
    span: '',
  },
  {
    icon: WandSparkles,
    name: 'Prompt 魔法学院',
    desc: '不止「帮我写个总结」。学会真正的提示词工程，把同一个 AI 用出两倍效果。',
    href: '/docs/claude',
    cta: '学几招魔法',
    span: '',
  },
  {
    icon: TerminalSquare,
    name: '硬核本地流',
    desc: '在意隐私？用 Ollama 把模型装进自己电脑，数据不出门，断网也照样能用。',
    href: '/docs',
    cta: '解锁硬核玩法',
    span: 'lg:col-span-2',
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28 lg:px-8">
      <div className="mb-14 text-center">
        <span className="font-pixel text-[10px] text-(--color-island-coral)">SELECT · STAGE</span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fd-foreground sm:text-4xl">
          四块岛屿，挑一块开始
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-fd-muted-foreground">
          每块岛对应一种学法。哪块离你最近，就先上哪块。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.name}
            href={f.href}
            className={`group relative flex flex-col rounded-2xl border border-black/5 bg-white/60 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-(--color-island-coral)/40 hover:shadow-[0_16px_50px_-20px_var(--color-island-coral)] dark:border-white/10 dark:bg-zinc-900/40 ${f.span}`}
          >
            <span className="flex size-11 items-center justify-center rounded-xl border border-black/5 bg-gradient-to-br from-(--color-island-coral)/15 to-(--color-island-gold)/15 text-(--color-island-coral) transition-colors duration-300 group-hover:text-(--color-island-gold) dark:border-white/10">
              <f.icon className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-fd-foreground">{f.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-fd-muted-foreground">
              {f.desc}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-island-coral)">
              {f.cta}
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- DUEL ----------------------------- */
function DuelSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 lg:px-8">
      <div className="mb-14 text-center">
        <span className="font-pixel text-[10px] text-(--color-island-gold)">BOSS FIGHT</span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fd-foreground sm:text-4xl">
          同一个 AI，问法差一点，结果差一截
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-fd-muted-foreground">
          切换场景看看：随口一问 vs 黄金 Prompt，到底差在哪。
        </p>
      </div>
      <PromptDuel />
    </section>
  );
}

/* --------------------------- FINAL CTA -------------------------- */
function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-(--color-island-coral)/10 via-transparent to-(--color-island-gold)/10 px-6 py-20 text-center backdrop-blur-md dark:border-white/10 dark:from-(--color-island-coral)/5 dark:to-(--color-island-gold)/10">
        <div aria-hidden className="island-glow pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight text-fd-foreground sm:text-4xl">
            准备好上岛了吗？
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-fd-muted-foreground">
            不用注册，不用付费，点开第一篇就能学。AI 没你想的那么难。
          </p>
          <Link
            href={siteConfig.docs}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-(--color-island-coral) to-(--color-island-gold) px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_var(--color-island-gold)]"
          >
            进岛开始学
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
