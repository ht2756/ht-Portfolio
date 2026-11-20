import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  CircleAlert,
  Compass,
  MapPin,
  Mountain,
  Route,
  ShieldCheck,
  TicketCheck,
  TrainFront,
} from "lucide-react";
import SiteShell from "@/components/SiteShell";
import Alps2027Itinerary from "@/components/travel/Alps2027Itinerary";
import type { Locale } from "@/data/siteContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "2027 阿尔卑斯远征 - HT Lab" : "Alpine Expedition 2027 - HT Lab",
    description:
      locale === "zh"
        ? "维也纳至米兰的 15 天奥地利与意大利北部交互旅行攻略。"
        : "A 15-day interactive Austria and Northern Italy itinerary from Vienna to Milan.",
  };
}

export default async function Alps2027Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const copy =
    locale === "zh"
      ? {
          back: "返回世界旅行档案",
          kicker: "下一次远征 / 计划中",
          title: "沿着阿尔卑斯山脊，走完十五天。",
          intro: "从维也纳的帝国轴线出发，穿过湖区、因斯布鲁克与多洛米蒂，最终落在米兰。这不是景点清单，而是一份可以真正执行、也适合拿给别人看的旅行作战图。",
          date: "2027.06.05 - 06.19",
          people: "3 人同行",
          transit: "全程公共交通",
          countries: "奥地利 / 德国 / 意大利",
          review: "行程审阅结论",
          score: "结构成立",
          scoreNote: "主线由东向西南推进，15 天覆盖城市、湖区与山地，节奏有张有弛。问题不在路线，而在个别日程写得过满。",
          fixedTitle: "四处关键校正，换来真正的可执行性。",
          fixedDescription: "保留原攻略的精华，但把公共交通换乘、山区天气与预约窗口当成硬条件处理。",
          corrections: [
            { index: "01", title: "湖区改为 Bad Ischl 双夜", text: "Hallstatt 与沙夫山分属两天，避免从 St. Wolfgang 午后往返 Hallstatt 的高风险折返。", icon: TrainFront },
            { index: "02", title: "国王湖只留一个主任务", text: "Salet 与 Obersee 已经足够完整，鹰巢、盐矿和魔法森林不再叠加。", icon: Compass },
            { index: "03", title: "山地日允许天气互换", text: "Nordkette、Seceda 与 Alpe di Siusi 保持可交换，不用坏天气去赌昂贵缆车。", icon: Mountain },
            { index: "04", title: "米兰门票向后留缓冲", text: "奥蒂塞伊到米兰当天，大教堂改订 15:30 之后，避免巴士或火车延误导致废票。", icon: ShieldCheck },
          ],
          radarEyebrow: "预订雷达",
          radarTitle: "2027 的时刻与价格尚未全部发布，先锁结构，再锁票。",
          radarDescription: "当前页面用 2026 官方规则校验风险，不把旧价格伪装成 2027 的确定信息。真正下单前还需要按下面四个节点复核。",
          budgetEyebrow: "预算仪表",
          budgetTitle: "先看口径，再看数字。三人总预算建议按 ¥4.2 万起准备。",
          budgetDescription: "原稿逐日合计约 ¥28,730；补回 D13 缆车、按原稿机票估算后约 ¥42,218。住宿汇总少算约 ¥1,000，通票也必须按 2027 价格重算。",
          budgetCards: [
            { label: "原稿逐日合计", value: "¥28,730", note: "不含国际机票，D13 缆车口径未完全落地" },
            { label: "校正后基准", value: "¥42,218", note: "含 ¥12,000 机票 + D13 单买缆车补项" },
            { label: "建议准备区间", value: "¥42,000–48,000", note: "按汇率、山地票价与住宿浮动留出余量" },
          ],
          budgetFlags: [
            "住宿逐日相加约 ¥12,200，不是汇总表的 ¥11,200。",
            "Seceda、Alpe di Siusi、Rasciesa 的单买与 Gardena Card 不能同时计入。",
            "餐饮与城际交通是估算项，不能当成已锁定价格。",
          ],
          radar: [
            { time: "2026.12", title: "签证窗口开启", text: "6 月 5 日出发，最早约提前六个月递交；本行程奥地利停留更长，按主目的地规则准备奥地利签证。" },
            { time: "2027.02-03", title: "住宿与航班成型", text: "优先锁奥蒂塞伊、Bad Ischl 和可免费取消房源，再确定开口航班。" },
            { time: "2027.04-05", title: "跨城交通与硬预约", text: "ÖBB / 意大利火车、厄兹博物馆、米兰大教堂、国王湖游船依次确认。" },
            { time: "出发前 14 天", title: "山区最终校验", text: "确认 2027 缆车季、Seceda 预约、Gardena Card 比价、湖区与南蒂罗尔公交时刻。" },
          ],
          linksTitle: "官方核验入口",
          links: [
            { label: "奥地利签证", href: "https://visa.vfsglobal.com/chn/zh/aut/" },
            { label: "Schafbergbahn", href: "https://www.5schaetze.at/en/schafbergbahn/prices-and-timetables.html" },
            { label: "Gardena Card", href: "https://www.gardena-card.com/en/prices.asp" },
            { label: "Südtirolmobil", href: "https://www.suedtirolmobil.info/en/my-journey/timetables" },
          ],
          ending: "路线已定，细节会随着 2027 时刻表继续更新。",
          endingText: "下一步不是继续塞景点，而是等交通与缆车开放后，把每个预订链接、酒店地址和照片放回对应的 Day 弹窗。",
        }
      : {
          back: "Back to the world atlas",
          kicker: "Next Expedition / In Planning",
          title: "Fifteen days along the Alpine spine.",
          intro: "Starting with Vienna's imperial axis, crossing the lakes, Innsbruck, and the Dolomites, then landing in Milan. This is not a checklist but an itinerary built to be used and shared.",
          date: "2027.06.05 - 06.19",
          people: "3 travelers",
          transit: "Public transit throughout",
          countries: "Austria / Germany / Italy",
          review: "Itinerary verdict",
          score: "Structure works",
          scoreNote: "The route moves cleanly from east to southwest. Fifteen days balance cities, lakes, and mountains; the real problem was overloading a handful of days.",
          fixedTitle: "Four critical corrections make the route executable.",
          fixedDescription: "The original highlights remain, but public transport, mountain weather, and booking windows are now treated as hard constraints.",
          corrections: [
            { index: "01", title: "Two nights based in Bad Ischl", text: "Hallstatt and Schafberg get separate days, removing the risky St. Wolfgang-Hallstatt afternoon return.", icon: TrainFront },
            { index: "02", title: "One headline at Konigssee", text: "Salet and Obersee fill the day; Eagle's Nest, salt mine, and extra forest walks no longer stack on top.", icon: Compass },
            { index: "03", title: "Mountain days can swap", text: "Nordkette, Seceda, and Alpe di Siusi remain weather-flexible rather than wasting expensive lift tickets.", icon: Mountain },
            { index: "04", title: "Milan gets a real buffer", text: "The Duomo slot moves after 15:30 so bus or rail delays do not destroy a timed ticket.", icon: ShieldCheck },
          ],
          radarEyebrow: "Booking Radar",
          radarTitle: "2027 schedules and prices are not all live yet. Lock the structure before the tickets.",
          radarDescription: "This page uses current official rules to identify risk without pretending 2026 prices are confirmed for 2027. Recheck at four points before purchase.",
          budgetEyebrow: "Budget Instrument",
          budgetTitle: "Read the accounting rules first. Prepare from ¥42k for three.",
          budgetDescription: "The original daily total is about ¥28,730. Adding the estimated flights and the missing D13 lift allowance brings the corrected baseline to about ¥42,218. Lodging and pass math still need a 2027 recheck.",
          budgetCards: [
            { label: "Original daily total", value: "¥28,730", note: "Excludes international flights; D13 lift cost is not fully resolved" },
            { label: "Corrected baseline", value: "¥42,218", note: "Includes ¥12,000 flights and a D13 single-ticket allowance" },
            { label: "Recommended range", value: "¥42k–48k", note: "Room for exchange rates, mountain tickets, and lodging swings" },
          ],
          budgetFlags: [
            "Daily lodging adds to roughly ¥12,200, not the summary's ¥11,200.",
            "Single rides and the Gardena Card cannot both be counted for Seceda, Alpe di Siusi, and Rasciesa.",
            "Food and intercity transit remain estimates, not locked prices.",
          ],
          radar: [
            { time: "2026.12", title: "Visa window opens", text: "For a 5 June departure, applications open roughly six months earlier; Austria is the main destination by stay length." },
            { time: "2027.02-03", title: "Lodging and flights", text: "Secure Ortisei, Bad Ischl, and refundable rooms first, then settle the open-jaw flights." },
            { time: "2027.04-05", title: "Rail and timed entries", text: "Confirm OBB / Italian trains, Otzi, Duomo, and Konigssee in that order." },
            { time: "14 days before", title: "Final mountain audit", text: "Recheck 2027 lift seasons, Seceda reservations, Gardena Card value, and regional bus schedules." },
          ],
          linksTitle: "Official check points",
          links: [
            { label: "Austria Visa", href: "https://visa.vfsglobal.com/chn/en/aut/" },
            { label: "Schafbergbahn", href: "https://www.5schaetze.at/en/schafbergbahn/prices-and-timetables.html" },
            { label: "Gardena Card", href: "https://www.gardena-card.com/en/prices.asp" },
            { label: "Südtirolmobil", href: "https://www.suedtirolmobil.info/en/my-journey/timetables" },
          ],
          ending: "The route is set. Details will evolve with the 2027 timetables.",
          endingText: "The next step is not adding sights, but attaching booking links, hotel addresses, and future photographs to the right Day popup as official schedules open.",
        };

  const routeStops = ["Vienna", "Salzburg", "Bad Ischl", "Innsbruck", "Bolzano", "Ortisei", "Milano"];

  return (
    <SiteShell variant="travel">
      <section className="alps-expedition-hero">
        <div className="alps-hero-contours" aria-hidden="true" />
        <div className="lab-container alps-hero-inner">
          <Link href={`/${locale}/travel-zone`} className="alps-back-link"><ArrowLeft size={15} /> {copy.back}</Link>
          <div className="alps-hero-copy">
            <div className="travel-kicker"><Mountain size={15} /> {copy.kicker}</div>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </div>

          <div className="alps-mission-data">
            {[copy.date, copy.people, copy.transit, copy.countries].map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
            ))}
          </div>

          <div className="alps-hero-route" aria-label={copy.countries}>
            {routeStops.map((stop, index) => (
              <div key={stop} className="alps-hero-stop">
                <i />
                <span>{stop}</span>
                {index < routeStops.length - 1 && <b />}
              </div>
            ))}
          </div>

          <a href="#expedition-plan" className="alps-hero-action">
            <MapPin size={17} /> 15 DAYS / OPEN ROUTE <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="alps-verdict-band">
        <div className="lab-container alps-verdict-inner">
          <div className="alps-verdict-score"><span>8.4</span><small>/ 10</small></div>
          <div><div className="travel-kicker"><CheckCircle2 size={14} /> {copy.review}</div><h2>{copy.score}</h2><p>{copy.scoreNote}</p></div>
          <div className="alps-verdict-code"><Route size={24} /><span>15D / 07 BASES</span><b>ROUTE AUDITED</b></div>
        </div>
      </section>

      <section className="alps-corrections-section">
        <div className="lab-container">
          <div className="alps-section-heading"><div><div className="travel-kicker"><CircleAlert size={14} /> ROUTE REBUILD</div><h2>{copy.fixedTitle}</h2></div><p>{copy.fixedDescription}</p></div>
          <div className="alps-correction-grid">
            {copy.corrections.map((item) => {
              const Icon = item.icon;
              return <article key={item.index}><span>{item.index}</span><Icon size={22} /><h3>{item.title}</h3><p>{item.text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <Alps2027Itinerary locale={locale} />

      <section className="alps-budget-section">
        <div className="lab-container">
          <div className="alps-section-heading">
            <div><div className="travel-kicker"><CircleDollarSign size={14} /> {copy.budgetEyebrow}</div><h2>{copy.budgetTitle}</h2></div>
            <p>{copy.budgetDescription}</p>
          </div>
          <div className="alps-budget-grid">
            {copy.budgetCards.map((card, index) => (
              <article key={card.label} data-tone={index === 2 ? "accent" : "default"}>
                <span>{String(index + 1).padStart(2, "0")} / {card.label}</span>
                <strong>{card.value}</strong>
                <p>{card.note}</p>
              </article>
            ))}
          </div>
          <div className="alps-budget-flags">
            {copy.budgetFlags.map((flag) => <span key={flag}><CircleAlert size={14} /> {flag}</span>)}
          </div>
        </div>
      </section>

      <section className="alps-booking-section">
        <div className="lab-container">
          <div className="alps-section-heading"><div><div className="travel-kicker"><TicketCheck size={14} /> {copy.radarEyebrow}</div><h2>{copy.radarTitle}</h2></div><p>{copy.radarDescription}</p></div>
          <div className="alps-radar-grid">
            {copy.radar.map((item, index) => (
              <article key={item.time}><span>{item.time}</span><i>{String(index + 1).padStart(2, "0")}</i><h3>{item.title}</h3><p>{item.text}</p></article>
            ))}
          </div>
          <div className="alps-official-links">
            <span><CalendarClock size={16} /> {copy.linksTitle}</span>
            {copy.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowRight size={13} /></a>)}
          </div>
        </div>
      </section>

      <section className="alps-expedition-ending">
        <div className="lab-container"><div className="travel-kicker"><MapPin size={14} /> FIELD NOTE / 2027</div><h2>{copy.ending}</h2><p>{copy.endingText}</p></div>
      </section>
    </SiteShell>
  );
}
