import type { Metadata } from "next";
import { Bot, BrainCircuit, Radio, Send, Sparkles } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import { aiCapabilities, aiStats, localized, type Locale } from "@/data/siteContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "AI 实验室 - HT Lab" : "AI Lab - HT Lab",
    description:
      locale === "zh"
        ? "展示 Dify 助手、AI 工作流能力和学习实验的个人 AI 实验室。"
        : "Static Dify assistant demo, AI workflow capabilities, and learning experiments.",
  };
}

export default async function AILabPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const learning = [
    locale === "zh" ? "Dify 应用搭建与 API 接入路径" : "Dify app setup and API integration path",
    locale === "zh" ? "RAG 知识库分段、召回和回答约束" : "RAG chunking, retrieval, and answer constraints",
    locale === "zh" ? "Prompt 角色、边界、格式和示例沉淀" : "Prompt roles, boundaries, formats, and examples",
    locale === "zh" ? "AI 工作流在个人站中的展示方式" : "How AI workflows can be presented in a personal site",
  ];
  const copy =
    locale === "zh"
      ? {
          eyebrow: "AI 实验室 / Dify 助手",
          title: "把 AI 实验做成可以感知的产品界面。",
          description:
            "这里展示 AI 学习与实验能力：Dify、RAG、Prompt、工作流和未来 API 接入。当前聊天是静态演示，但结构为真实接入预留。",
          assistantName: "HT 助手",
          assistantMeta: "Dify 驱动 / 静态演示",
          modelState: "GPT-4o 就绪",
          sendLabel: "发送演示消息",
          capabilityEyebrow: "能力网格",
          capabilityTitle: "AI 能力卡片",
          capabilityDescription: "以真实可落地的 AI 工作流为边界，不把静态演示包装成已上线服务。",
        }
      : {
          eyebrow: "AI Lab / Dify Assistant",
          title: "AI experiments that feel like they are already online.",
          description:
            "A showcase for AI learning and experiments: Dify, RAG, prompts, workflows, and future API integration. The chat is static, but the interface is structured for a real connection later.",
          assistantName: "HT Assistant",
          assistantMeta: "Powered by Dify / static demo",
          modelState: "GPT-4o ready",
          sendLabel: "Send demo message",
          capabilityEyebrow: "Capability Grid",
          capabilityTitle: "AI Capability Cards",
          capabilityDescription:
            "Grounded in practical AI workflows, without pretending the static demo is already a production service.",
        };

  return (
    <SiteShell variant="ai">
      <section className="lab-section pt-32">
        <div className="lab-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow-pill">
              <Bot size={14} />
              {copy.eyebrow}
            </span>
            <h1 className="mt-6 text-balance text-5xl font-black leading-tight text-[var(--text-primary)] md:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
              {copy.description}
            </p>
            <div className="mt-10">
              <StatStrip stats={aiStats} locale={locale} compact />
            </div>
          </div>

          <div className="panel-card overflow-hidden rounded-[28px] border-violet-400/20 bg-[#0a0014]/80">
            <div className="flex items-center justify-between border-b border-violet-300/15 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-300 to-cyan-300 text-slate-950">
                  <Bot size={22} />
                </div>
                <div>
                  <h2 className="font-black text-indigo-50">{copy.assistantName}</h2>
                  <p className="font-mono text-xs text-violet-200/70">{copy.assistantMeta}</p>
                </div>
              </div>
              <span className="rounded-full border border-cyan-300/30 px-3 py-1 font-mono text-xs text-cyan-200">
                {copy.modelState}
              </span>
            </div>
            <div className="space-y-5 p-5">
              <div className="max-w-[82%] rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4 text-sm leading-7 text-indigo-50">
                {locale === "zh"
                  ? "你好，我是 HT Lab 的 AI 助手。你可以问我技术栈、作品、AI 实验和成长记录。"
                  : "Hi, I am the HT Lab assistant. Ask me about the stack, works, AI experiments, or growth notes."}
              </div>
              <div className="ml-auto max-w-[82%] rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-7 text-indigo-50">
                {locale === "zh" ? "这个站点最特别的地方是什么？" : "What makes this site distinctive?"}
              </div>
              <div className="max-w-[88%] rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4 text-sm leading-7 text-indigo-50">
                {locale === "zh"
                  ? "它不是单一作品集，而是开发、设计、AI 和成长记录的四区实验室。每个板块都有独立视觉性格，但都回到 HT Lab 的个人品牌。"
                  : "It is not a single portfolio page. It is a four-zone lab for development, design, AI, and growth, each with its own visual character under one personal brand."}
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-violet-300/15 p-5">
              <div className="flex-1 rounded-2xl border border-violet-300/20 bg-white/5 px-4 py-3 text-sm text-violet-100/60">
                {locale === "zh" ? "输入你的问题..." : "Type your question..."}
              </div>
              <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950" aria-label={copy.sendLabel}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-section pt-0">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.capabilityEyebrow}
            title={copy.capabilityTitle}
            description={copy.capabilityDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {aiCapabilities.map((capability) => (
              <article key={localized(capability.title, locale)} className="panel-card rounded-[24px] p-5">
                <div className="mb-8 flex items-center justify-between">
                  <BrainCircuit className="text-[var(--accent-primary)]" />
                  <span className="rounded-full border border-[var(--border-color)] px-3 py-1 font-mono text-xs text-[var(--text-tertiary)]">
                    {capability.signal}
                  </span>
                </div>
                <h3 className="text-lg font-black">{localized(capability.title, locale)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{localized(capability.description, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-section pt-0">
        <div className="lab-container">
          <div className="panel-card rounded-[28px] p-6">
            <div className="mb-6 flex items-center gap-3">
              <Radio className="text-[var(--accent-primary)]" />
              <h2 className="text-2xl font-black">{locale === "zh" ? "学习记录" : "Learning Log"}</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {learning.map((item, index) => (
                <div key={item} className="rounded-2xl border border-[var(--border-color)] p-4 text-sm text-[var(--text-secondary)]">
                  <Sparkles className="mb-4 text-[var(--accent-primary)]" size={17} />
                  <span className="font-mono text-xs text-[var(--text-tertiary)]">0{index + 1}</span>
                  <p className="mt-2">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
