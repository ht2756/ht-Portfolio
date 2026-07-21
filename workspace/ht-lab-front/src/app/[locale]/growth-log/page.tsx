import type { Metadata } from "next";
import { BookOpen, CalendarDays, ExternalLink, FileText, Sprout } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import { growthEntries, growthStats, localized, type Locale } from "@/data/siteContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "成长日志 - HT Lab" : "Growth Log - HT Lab",
    description:
      locale === "zh"
        ? "记录学习笔记、技能路径、外链收藏和成长复盘的个人日志。"
        : "Learning notes, skill records, links, and long-form growth entries.",
  };
}

export default async function GrowthLogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const groups = [
    { month: locale === "zh" ? "2026 / 3 月" : "2026 / March", items: growthEntries.slice(0, 3) },
    { month: locale === "zh" ? "2026 / 1-2 月" : "2026 / January-February", items: growthEntries.slice(3) },
  ];
  const copy =
    locale === "zh"
      ? {
          eyebrow: "成长日志 / 学习时间线",
          title: "记录技能、笔记和灵感线索的温暖时间轴。",
          description: "这里记录学习路径、技术复盘、设计灵感和外链收藏。它让个人站不只展示结果，也展示持续成长的过程。",
          timelineEyebrow: "时间线",
          timelineTitle: "按月份整理的成长日志",
          timelineDescription: "包含笔记、外链和详细记录三种卡片类型，方便后续持续扩展。",
        }
      : {
          eyebrow: "Growth Log / Learning Timeline",
          title: "A warm Timeline for skills, notes, and useful trails.",
          description:
            "A place for learning paths, technical reviews, design inspiration, and useful links. It makes the site show not only outcomes, but the process of getting better.",
          timelineEyebrow: "Timeline",
          timelineTitle: "Growth Log by Month",
          timelineDescription: "Includes notes, links, and deep-dive cards so the log can keep growing over time.",
        };

  const iconFor = (type: string) => {
    if (type.includes("外") || type.includes("Link")) return ExternalLink;
    if (type.includes("详细") || type.includes("Deep")) return FileText;
    return BookOpen;
  };

  return (
    <SiteShell variant="growth">
      <section className="lab-section pt-32 text-amber-950">
        <div className="lab-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <span className="eyebrow-pill border-amber-200 bg-white/60 text-amber-700">
                <Sprout size={14} />
                {copy.eyebrow}
              </span>
              <h1 className="mt-6 text-balance text-5xl font-black leading-tight md:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-amber-900/75 md:text-lg">
                {copy.description}
              </p>
            </div>
            <StatStrip stats={growthStats} locale={locale} compact />
          </div>
        </div>
      </section>

      <section className="lab-section pt-0 text-amber-950">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.timelineEyebrow}
            title={copy.timelineTitle}
            description={copy.timelineDescription}
          />
          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <div key={group.month} className="relative border-l border-amber-300/60 pl-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                    <CalendarDays size={13} />
                  </span>
                  <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-amber-700">{group.month}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((entry) => {
                    const Icon = iconFor(localized(entry.type, locale));
                    return (
                      <article key={localized(entry.title, locale)} className="rounded-[22px] border border-amber-200 bg-white/75 p-5 shadow-xl shadow-amber-200/30">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                            <Icon size={14} />
                            {localized(entry.type, locale)}
                          </span>
                          <span className="font-mono text-xs text-amber-700/70">{entry.date}</span>
                        </div>
                        <h3 className="text-lg font-black">{localized(entry.title, locale)}</h3>
                        <p className="mt-3 min-h-[72px] text-sm leading-7 text-amber-900/70">{localized(entry.description, locale)}</p>
                        <div className="mt-5 border-t border-amber-100 pt-4">
                          <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                            {entry.skill}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
