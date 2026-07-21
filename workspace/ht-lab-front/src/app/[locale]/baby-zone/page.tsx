import type { Metadata } from "next";
import {
  Baby,
  Camera,
  CalendarHeart,
  Footprints,
  Heart,
  Milk,
  Moon,
  Ruler,
  Sparkles,
  Star,
  Sticker,
} from "lucide-react";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import {
  babyFavorites,
  babyMilestones,
  babyMoments,
  babyStats,
  localized,
  type Locale,
} from "@/data/siteContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "宝宝空间 - HT Lab" : "Baby Zone - HT Lab",
    description:
      locale === "zh"
        ? "记录宝宝成长里程碑、家庭记忆、喜欢清单和未来小纸条的温柔角落。"
        : "A warm family growth corner for baby milestones, memories, favorites, and future notes.",
  };
}

export default async function BabyZonePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tinySignals = [
    {
      icon: Milk,
      label: locale === "zh" ? "今日状态" : "Today",
      value: locale === "zh" ? "吃饱睡好" : "Fed and cozy",
    },
    {
      icon: Moon,
      label: locale === "zh" ? "睡前仪式" : "Night ritual",
      value: locale === "zh" ? "抱抱 + 故事" : "Hug + story",
    },
    {
      icon: Ruler,
      label: locale === "zh" ? "成长记录" : "Growth log",
      value: locale === "zh" ? "每月更新" : "Monthly update",
    },
  ];
  const copy =
    locale === "zh"
      ? {
          eyebrow: "宝宝空间 / 小小花园",
          title: "把宝宝的每一天，收藏成软软的小星球。",
          description:
            "这里是 HT Lab 里最温柔的第五展区：记录宝宝成长、家庭相册、可爱偏好和未来愿望。现在用插画化占位承载内容，之后可以直接替换成真实照片和真实数据。",
          gardenBadge: "小小花园",
          memoryLabel: "记忆面板",
          growthBoard: "宝宝成长面板",
          milestoneEyebrow: "里程碑时间线",
          milestoneTitle: "小小成长时间线",
          milestoneDescription:
            "每一张卡片记录一个阶段：可以是月龄、技能、第一次尝试，也可以替换成真实日期。",
          memoryEyebrow: "记忆卡片",
          memoryTitle: "家庭相册占位",
          memoryDescription: "当前用柔和渐变和图标模拟相册。之后把卡片背景换成真实照片，就能变成宝宝照片墙。",
        }
      : {
          eyebrow: "Baby Zone / Tiny Garden",
          title: "A soft little planet for every tiny day.",
          description:
            "The gentlest fifth zone in HT Lab: baby growth, family memories, tiny favorites, and future wishes. It uses illustrated placeholders now, ready for real photos and real data later.",
          gardenBadge: "Tiny Garden",
          memoryLabel: "Memory OS",
          growthBoard: "Baby growth board",
          milestoneEyebrow: "Milestone Timeline",
          milestoneTitle: "Tiny Growth Timeline",
          milestoneDescription:
            "Each card marks one stage: month age, a skill, a first attempt, or a real date later.",
          memoryEyebrow: "Memory Cards",
          memoryTitle: "Family Memory Cards",
          memoryDescription:
            "Soft gradients and icons stand in for photos now. Replace the card backgrounds later to turn this into a real baby gallery.",
        };

  return (
    <SiteShell variant="baby">
      <section className="lab-section relative overflow-hidden pt-32 text-[var(--text-primary)]">
        <div className="baby-doodle-grid absolute inset-0 opacity-40" />
        <div className="lab-container relative grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div>
            <span className="eyebrow-pill border-orange-200 bg-white/65 text-rose-500">
              <Baby size={14} />
              {copy.eyebrow}
            </span>
            <h1 className="mt-6 text-balance text-[2.35rem] font-black leading-[1.12] [overflow-wrap:anywhere] sm:text-5xl md:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
              {copy.description}
            </p>
            <div className="mt-10">
              <div className="[&>div]:grid-cols-1 [&>div]:sm:grid-cols-2 [&>div]:md:grid-cols-4">
                <StatStrip stats={babyStats} locale={locale} compact />
              </div>
            </div>
          </div>

          <div className="panel-card relative overflow-hidden rounded-[32px] border-orange-200/80 bg-white/72 p-5 shadow-2xl shadow-rose-200/35">
            <div className="absolute right-6 top-6 rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-500">
              {copy.gardenBadge}
            </div>
            <div className="relative min-h-[430px] rounded-[26px] bg-gradient-to-br from-rose-100 via-orange-50 to-teal-50 p-5">
              <div className="absolute left-6 top-8 h-20 w-20 rounded-[28px] bg-white/70 shadow-xl shadow-rose-200/50 rotate-[-8deg]" />
              <div className="absolute right-9 top-20 h-16 w-16 rounded-full bg-teal-200/70 shadow-xl shadow-teal-200/50" />
              <div className="absolute bottom-10 left-8 h-24 w-24 rounded-[32px] bg-amber-200/70 shadow-xl shadow-amber-200/50 rotate-[10deg]" />
              <div className="absolute bottom-16 right-8 h-28 w-20 rounded-full bg-rose-200/80 shadow-xl shadow-rose-200/50" />

              <div className="relative z-10 flex min-h-[390px] flex-col justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-white text-rose-500 shadow-lg shadow-rose-200/60">
                    <Baby size={32} />
                  </div>
                  <div className="rounded-[24px] bg-white/70 p-4 shadow-lg shadow-orange-100/70 backdrop-blur">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400">{copy.memoryLabel}</p>
                    <h2 className="mt-2 text-2xl font-black">
                      {copy.growthBoard}
                    </h2>
                  </div>
                </div>

                <div className="grid gap-3">
                  {tinySignals.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <div key={signal.label} className="flex items-center justify-between rounded-[22px] border border-white/70 bg-white/72 p-4 shadow-lg shadow-orange-100/60 backdrop-blur">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                            <Icon size={19} />
                          </span>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{signal.label}</div>
                            <div className="mt-1 font-black">{signal.value}</div>
                          </div>
                        </div>
                        <Sparkles className="text-amber-400" size={18} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-section pt-0 text-[var(--text-primary)]">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.milestoneEyebrow}
            title={copy.milestoneTitle}
            description={copy.milestoneDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {babyMilestones.map((milestone, index) => (
              <article key={localized(milestone.title, locale)} className="panel-card relative overflow-hidden rounded-[26px] bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1">
                <div
                  className="absolute right-4 top-4 text-6xl font-black leading-none opacity-10"
                  style={{ color: milestone.accent }}
                >
                  0{index + 1}
                </div>
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg" style={{ backgroundColor: milestone.accent }}>
                  <Footprints size={22} />
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: milestone.accent }}>
                  {localized(milestone.age, locale)} · {localized(milestone.date, locale)}
                </div>
                <h3 className="mt-3 text-xl font-black">{localized(milestone.title, locale)}</h3>
                <p className="mt-3 min-h-[96px] text-sm leading-7 text-[var(--text-secondary)]">
                  {localized(milestone.description, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-section pt-0 text-[var(--text-primary)]">
        <div className="lab-container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow={copy.memoryEyebrow}
                title={copy.memoryTitle}
                description={copy.memoryDescription}
              />
              <div className="mt-8 rounded-[28px] border border-orange-200 bg-white/70 p-5 shadow-xl shadow-orange-100/70">
                <div className="mb-4 flex items-center gap-3">
                  <CalendarHeart className="text-rose-500" />
                  <h3 className="text-xl font-black">{locale === "zh" ? "本月家庭便签" : "Family note this month"}</h3>
                </div>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {locale === "zh"
                    ? "多拍一点日常，少追求完美。宝宝长大的速度很快，最值得收藏的是那些看似普通的小瞬间。"
                    : "Capture more ordinary days, not only perfect ones. Baby grows quickly, and the everyday moments become the ones worth keeping."}
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {babyMoments.map((moment) => (
                <article key={localized(moment.title, locale)} className="overflow-hidden rounded-[28px] border border-orange-200 bg-white/80 shadow-xl shadow-orange-100/60">
                  <div className={`baby-photo-placeholder flex h-52 items-center justify-center bg-gradient-to-br ${moment.color}`}>
                    <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-white/70 text-rose-500 shadow-xl shadow-white/60 backdrop-blur">
                      <Camera size={30} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-500">
                      <Sticker size={14} />
                      {localized(moment.note, locale)}
                    </div>
                    <h3 className="text-lg font-black">{localized(moment.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                      {localized(moment.description, locale)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lab-section pt-0 text-[var(--text-primary)]">
        <div className="lab-container">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="panel-card rounded-[30px] bg-white/75 p-6">
              <div className="mb-6 flex items-center gap-3">
                <Heart className="text-rose-500" />
                <h2 className="text-2xl font-black">{locale === "zh" ? "宝宝喜欢清单" : "Baby Favorites"}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {babyFavorites.map((favorite) => (
                  <div key={localized(favorite.label, locale)} className="rounded-[22px] border border-orange-100 bg-orange-50/70 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                      {localized(favorite.label, locale)}
                    </p>
                    <p className="mt-3 text-lg font-black">{localized(favorite.value, locale)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] border border-teal-200 bg-teal-50/80 p-6 shadow-xl shadow-teal-100/70">
              <Star className="mb-8 text-teal-500" size={30} />
              <h2 className="text-2xl font-black">{locale === "zh" ? "给未来的小纸条" : "A Note for the Future"}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {locale === "zh"
                  ? "愿你一直保有好奇心，也愿这个小小页面慢慢长大，装下越来越多真实的照片、声音和故事。"
                  : "May curiosity stay with you, and may this little page grow with more real photos, sounds, and stories over time."}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-black text-teal-600">
                <Sparkles size={16} />
                {locale === "zh" ? "下一次更新：真实相册" : "Next update: real gallery"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
