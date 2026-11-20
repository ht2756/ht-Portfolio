import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Camera,
  Compass,
  MapPin,
  Navigation2,
  PlaneTakeoff,
  Route,
  Sparkles,
} from "lucide-react";
import SiteShell from "@/components/SiteShell";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import TravelMap from "@/components/travel/TravelMap";
import {
  localized,
  travelDestinations,
  travelStats,
  type Locale,
} from "@/data/siteContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "旅途档案 - HT Lab" : "Travel Atlas - HT Lab",
    description:
      locale === "zh"
        ? "以交互世界地图记录中国、西班牙、葡萄牙、马来西亚与俄罗斯的旅行足迹。"
        : "An interactive travel atlas across China, Spain, Portugal, Malaysia, and Russia.",
  };
}

export default async function TravelZonePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const copy =
    locale === "zh"
      ? {
          eyebrow: "旅途档案 / 世界坐标",
          overline: "THE GRAND TOUR",
          title: "把世界，走成自己的坐标。",
          description:
            "从中国的古城与江岸，到伊比利亚的热烈、赤道海岛的纯蓝，再到俄罗斯北境。这里收藏已经抵达的地方，也为下一段旅程留出地平线。",
          mapCta: "展开全球足迹",
          routeCode: "HT / TRAVEL LOG 001",
          atlasEyebrow: "全球地图",
          atlasTitle: "去过的地方，正在发光。",
          atlasDescription:
            "五个国家已经点亮。点击国家轮廓、城市坐标或国家标签，查看对应的旅行路线与目的地。",
          storiesEyebrow: "目的地档案",
          storiesTitle: "每一次抵达，都有自己的温度。",
          storiesDescription:
            "城市、岛屿、表演、建筑与味觉被收进同一条旅行时间线，未来照片会在这些坐标继续生长。",
          photoArchive: "影像档案",
          memoryNotes: "旅途切片",
          placeUnit: "站",
          endingEyebrow: "下一站 / 未完待续",
          endingTitle: "地图还有大片留白，脚步不会停在这里。",
          endingDescription:
            "旅行不是完成清单，而是不断更新自己看待世界的方式。新的城市、新的照片和新的故事，会继续点亮这张地图。",
          expeditionEyebrow: "下一次远征 / 2027",
          expeditionTitle: "奥地利与意大利北部，十五天沿阿尔卑斯山脊推进。",
          expeditionDescription: "一份已经完成路线审阅的交互攻略：真实地图、每日弹窗、交通衔接、预约雷达和天气替代方案。",
          expeditionCta: "打开 15 日远征地图",
        }
      : {
          eyebrow: "Travel Atlas / World Coordinates",
          overline: "THE GRAND TOUR",
          title: "Turning the world into personal coordinates.",
          description:
            "From ancient Chinese cities and riverbanks to Iberian heat, equatorial blue, and Russia's northern expanse. This atlas holds the places already reached and keeps the horizon open.",
          mapCta: "Open the world atlas",
          routeCode: "HT / TRAVEL LOG 001",
          atlasEyebrow: "World Map",
          atlasTitle: "Every place reached is now alight.",
          atlasDescription:
            "Five countries are illuminated. Select a country shape, city point, or destination label to explore each route.",
          storiesEyebrow: "Destination Archive",
          storiesTitle: "Every arrival has its own temperature.",
          storiesDescription:
            "Cities, islands, performance, architecture, and taste form one travel timeline, ready for future photographs to join the coordinates.",
          photoArchive: "Image archive",
          memoryNotes: "Field notes",
          placeUnit: "stops",
          endingEyebrow: "Next / To be continued",
          endingTitle: "The map holds plenty of blank space. The journey does not end here.",
          endingDescription:
            "Travel is less a checklist than a way to keep changing how the world is seen. New cities, photographs, and stories will keep lighting up this atlas.",
          expeditionEyebrow: "Next Expedition / 2027",
          expeditionTitle: "Fifteen days across Austria and Northern Italy along the Alpine spine.",
          expeditionDescription: "A reviewed, interactive itinerary with a live map, daily popups, transit logic, booking radar, and weather fallbacks.",
          expeditionCta: "Open the 15-day expedition",
        };

  return (
    <SiteShell variant="travel">
      <section className="travel-hero">
        <div className="travel-hero-grid" aria-hidden="true" />
        <div className="travel-hero-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="lab-container travel-hero-content">
          <div className="travel-hero-copy">
            <div className="travel-kicker travel-hero-kicker">
              <Compass size={15} />
              {copy.eyebrow}
            </div>
            <p className="travel-overline">{copy.overline}</p>
            <h1>{copy.title}</h1>
            <p className="travel-hero-description">{copy.description}</p>

            <div className="travel-hero-actions">
              <a href="#travel-atlas" className="travel-primary-action">
                <MapPin size={17} />
                {copy.mapCta}
                <ArrowDown size={16} />
              </a>
              <span>
                <Route size={15} />
                {copy.routeCode}
              </span>
            </div>
          </div>

          <div className="travel-hero-instrument" aria-hidden="true">
            <div className="travel-instrument-ring">
              <span className="travel-instrument-north">N</span>
              <Navigation2 size={46} />
              <div className="travel-instrument-route">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="travel-instrument-caption">
              <span>31.2304° N</span>
              <span>121.4737° E</span>
            </div>
          </div>
        </div>

        <div className="travel-hero-marquee" aria-hidden="true">
          中国 · 西班牙 · 葡萄牙 · 马来西亚 · 俄罗斯 · CHINA · SPAIN · PORTUGAL · MALAYSIA · RUSSIA
        </div>
      </section>

      <section className="travel-stat-band">
        <div className="lab-container">
          <StatStrip stats={travelStats} locale={locale} compact />
        </div>
      </section>

      <section id="travel-atlas" className="travel-atlas-section">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.atlasEyebrow}
            title={copy.atlasTitle}
            description={copy.atlasDescription}
          />
          <div className="mt-10">
            <TravelMap locale={locale} />
          </div>
        </div>
      </section>

      <section className="travel-stories-section">
        <div className="lab-container">
          <SectionHeading
            eyebrow={copy.storiesEyebrow}
            title={copy.storiesTitle}
            description={copy.storiesDescription}
          />
        </div>

        <div className="travel-story-list">
          {travelDestinations.map((destination, index) => (
            <article
              key={destination.code}
              className="travel-story"
              style={{ "--country-accent": destination.accent } as React.CSSProperties}
            >
              <div className="lab-container travel-story-inner">
                <div className="travel-story-copy">
                  <div className="travel-story-heading">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="travel-kicker">
                        <PlaneTakeoff size={14} />
                        {localized(destination.region, locale)}
                      </div>
                      <h2>{localized(destination.country, locale)}</h2>
                    </div>
                  </div>

                  <p>{localized(destination.summary, locale)}</p>

                  <div className="travel-story-cities">
                    {destination.cities.map((city) => (
                      <span key={localized(city.name, locale)}>
                        <MapPin size={13} />
                        {localized(city.name, locale)}
                      </span>
                    ))}
                  </div>

                  <div className="travel-memory-list">
                    <div className="travel-memory-title">
                      <Sparkles size={15} /> {copy.memoryNotes}
                    </div>
                    {destination.memories.map((memory) => (
                      <p key={localized(memory, locale)}>{localized(memory, locale)}</p>
                    ))}
                  </div>
                </div>

                <figure className={`travel-photo-field ${destination.visual}`}>
                  <div className="travel-photo-topline">
                    <span>
                      <Camera size={15} /> {copy.photoArchive}
                    </span>
                    <span>{destination.code} / {destination.cities.length} {copy.placeUnit}</span>
                  </div>
                  <div className="travel-photo-coordinate">
                    <MapPin size={20} />
                    <span>{localized(destination.country, locale)}</span>
                  </div>
                  <figcaption>
                    {destination.cities.map((city) => localized(city.name, locale)).join(" · ")}
                  </figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="travel-expedition-feature">
        <div className="travel-expedition-contours" aria-hidden="true" />
        <div className="lab-container travel-expedition-inner">
          <div className="travel-expedition-index">2027</div>
          <div>
            <div className="travel-kicker"><Route size={14} /> {copy.expeditionEyebrow}</div>
            <h2>{copy.expeditionTitle}</h2>
            <p>{copy.expeditionDescription}</p>
          </div>
          <Link href={`/${locale}/travel-zone/alps-2027`} className="travel-expedition-link">
            <MapPin size={16} /> {copy.expeditionCta} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="travel-ending-section">
        <div className="lab-container travel-ending-inner">
          <div>
            <div className="travel-kicker">
              <PlaneTakeoff size={14} />
              {copy.endingEyebrow}
            </div>
            <h2>{copy.endingTitle}</h2>
            <p>{copy.endingDescription}</p>
          </div>
          <div className="travel-ending-compass" aria-hidden="true">
            <Compass size={64} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
