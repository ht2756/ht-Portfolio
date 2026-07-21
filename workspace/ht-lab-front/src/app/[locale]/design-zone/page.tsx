import type { Metadata } from "next";
import { GalleryHorizontalEnd, Layers3 } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import DesignPortfolioGrid from "@/components/DesignPortfolioGrid";
import { designStats, designWorks, localized, type Locale } from "@/data/siteContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "设计空间 - HT Lab" : "Design Zone - HT Lab",
    description:
      locale === "zh"
        ? "展示品牌、商业、创意和教育类 PPT 作品的视觉设计作品集。"
        : "Presentation portfolio with brand, business, creative, and education decks.",
  };
}

export default async function DesignZonePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const categories = Array.from(new Set(designWorks.map((work) => localized(work.category, locale))));
  const copy =
    locale === "zh"
      ? {
          eyebrow: "设计空间 / PPT 作品集",
          title: "像画廊一样展示每一份演示作品。",
          description:
            "这里展示太太的 PPT 与视觉提案能力：封面、节奏、分类、商业表达和精致排版。当前为虚构样例，用于搭建完整作品集体验。",
          galleryEyebrow: "画廊",
          galleryTitle: "精选 PPT 作品",
          galleryDescription: "每个作品卡片都以封面视觉为主角，强调分类、页数、时间和故事表达。",
        }
      : {
          eyebrow: "Design Zone / Presentation Portfolio",
          title: "Presentation systems with gallery-grade covers.",
          description:
            "A gallery for Mrs. T's presentation and visual proposal craft: covers, pacing, categories, business storytelling, and refined layout. Current works are polished samples for the portfolio experience.",
          galleryEyebrow: "Gallery",
          galleryTitle: "Selected Presentation Portfolio",
          galleryDescription:
            "Each work card leads with cover art while retaining category, page count, date, and narrative context.",
        };

  return (
    <SiteShell variant="design">
      <section className="lab-section pt-32 text-slate-950">
        <div className="lab-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <span className="eyebrow-pill border-slate-200 bg-white/70 text-slate-500">
                <GalleryHorizontalEnd size={14} />
                {copy.eyebrow}
              </span>
              <h1 className="mt-6 text-balance text-5xl font-black leading-tight md:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {copy.description}
              </p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-200/70">
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div key={category} className="rounded-2xl bg-slate-50 p-4">
                    <Layers3 className="mb-8 text-blue-500" size={22} />
                    <div className="font-bold">{category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12">
            <StatStrip stats={designStats} locale={locale} compact />
          </div>
        </div>
      </section>

      <section className="lab-section pt-0 text-slate-950">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.galleryEyebrow}
            title={copy.galleryTitle}
            description={copy.galleryDescription}
          />
          <DesignPortfolioGrid works={designWorks} locale={locale} />
        </div>
      </section>
    </SiteShell>
  );
}
