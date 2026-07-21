import type { Metadata } from "next";
import { Activity, ArrowUpRight, GitBranch, LockKeyhole, ServerCog } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import {
  devProjects,
  devStats,
  localized,
  techTracks,
  type Locale,
} from "@/data/siteContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "开发空间 - HT Lab" : "Dev Zone - HT Lab",
    description:
      locale === "zh"
        ? "展示全栈系统、小程序、AI 工具和工程能力矩阵的个人开发作品集。"
        : "Full-stack development portfolio with systems, mini-programs, AI tools, and technical tracks.",
  };
}

export default async function DevZonePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const activityNodes = Array.from({ length: 68 }, (_, index) => (index * 7 + 3) % 5);
  const copy =
    locale === "zh"
      ? {
          eyebrow: "开发空间 / 项目中台",
          title: "面向真实交付的全栈系统作品。",
          description:
            "这里展示 HT 的工程能力档案：B 端系统、小程序、AI 工具、权限模型、数据看板和交付节奏。页面内容为高质量样例，可替换为真实项目。",
          pulseLabel: "系统脉冲",
          pulseTitle: "工程活动",
          status: "在线",
          projectEyebrow: "项目档案",
          projectTitle: "精选项目案例",
          projectDescription:
            "这些虚构案例用于展示作品集结构：每张卡片都包含业务背景、技术标签和可量化指标。",
          techEyebrow: "技术矩阵",
          techTitle: "工程能力矩阵",
          techDescription: "从前端系统到交付链路，展示可以独立推进完整产品的工程组合。",
          signalLabels: ["RBAC", "图表", "工作流"],
        }
      : {
          eyebrow: "Dev Zone / Project OS",
          title: "Full-stack systems with a control-room finish.",
          description:
            "A technical dossier for HT: B2B systems, mini programs, AI tools, permission models, dashboards, and delivery rhythm. Content is polished sample material ready to be replaced with real work.",
          pulseLabel: "System pulse",
          pulseTitle: "Engineering Activity",
          status: "online",
          projectEyebrow: "Project Archive",
          projectTitle: "Selected Project Cases",
          projectDescription:
            "These sample cases demonstrate the portfolio structure: each card includes business context, technology tags, and measurable signals.",
          techEyebrow: "Tech Matrix",
          techTitle: "Tech Capability Matrix",
          techDescription:
            "From frontend systems to delivery pipelines, this matrix shows the ability to ship complete product surfaces.",
          signalLabels: [
            "RBAC",
            "Charts",
            "Workflow",
          ],
        };

  return (
    <SiteShell variant="dev">
      <section className="lab-section pt-32">
        <div className="lab-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="eyebrow-pill">
              <ServerCog size={14} />
              {copy.eyebrow}
            </span>
            <h1 className="mt-6 text-balance text-5xl font-black leading-tight text-[var(--text-primary)] md:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
              {copy.description}
            </p>
          </div>
          <div className="panel-card rounded-[28px] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  {copy.pulseLabel}
                </p>
                <h2 className="mt-2 text-2xl font-black">{copy.pulseTitle}</h2>
              </div>
              <Activity className="text-[var(--accent-primary)]" />
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(17, minmax(0, 1fr))" }}>
              {activityNodes.map((level, index) => (
                <div
                  key={index}
                  className="h-4 rounded-[4px] border border-[var(--border-color)]"
                  style={{
                    backgroundColor:
                      level === 0
                        ? "var(--bg-tertiary)"
                        : `color-mix(in srgb, var(--accent-tertiary) ${18 + level * 16}%, var(--bg-tertiary))`,
                  }}
                />
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {copy.signalLabels.map((item) => (
                <div key={item} className="rounded-2xl bg-[rgba(255,255,255,0.04)] p-4">
                  <div className="font-mono text-xs text-[var(--accent-primary)]">{item}</div>
                  <div className="mt-2 text-sm text-[var(--text-secondary)]">{copy.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lab-section pt-0">
        <div className="lab-container">
          <StatStrip stats={devStats} locale={locale} compact />
        </div>
      </section>

      <section className="lab-section pt-0">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.projectEyebrow}
            title={copy.projectTitle}
            description={copy.projectDescription}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {devProjects.map((project) => (
              <article key={localized(project.title, locale)} className="panel-card group rounded-[24px] p-5 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full border border-[var(--border-color)] px-3 py-1 font-mono text-xs text-[var(--text-tertiary)]">
                    {localized(project.category, locale)}
                  </span>
                  <ArrowUpRight className="text-[var(--text-tertiary)] transition-colors group-hover:text-[var(--accent-primary)]" size={18} />
                </div>
                <div className="h-32 rounded-2xl border border-[var(--border-color)] p-4" style={{ background: `linear-gradient(135deg, ${project.accent}28, transparent)` }}>
                  <GitBranch size={26} style={{ color: project.accent }} />
                  <div className="mt-8 h-2 w-3/4 rounded-full bg-[rgba(255,255,255,0.18)]" />
                  <div className="mt-3 h-2 w-1/2 rounded-full bg-[rgba(255,255,255,0.12)]" />
                </div>
                <h3 className="mt-5 text-xl font-black">{localized(project.title, locale)}</h3>
                <p className="mt-3 min-h-[96px] text-sm leading-7 text-[var(--text-secondary)]">
                  {localized(project.description, locale)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.value} className="rounded-2xl border border-[var(--border-color)] p-3">
                      <div className="text-2xl font-black">{metric.value}</div>
                      <div className="text-xs text-[var(--text-tertiary)]">{localized(metric.label, locale)}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-section pt-0">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.techEyebrow}
            title={copy.techTitle}
            description={copy.techDescription}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {techTracks.map((track) => (
              <div key={localized(track.title, locale)} className="panel-card rounded-[22px] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <LockKeyhole size={17} className="text-[var(--accent-primary)]" />
                  <h3 className="font-black">{localized(track.title, locale)}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {track.items.map((item) => (
                    <span key={item} className="rounded-lg border border-[var(--border-color)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
