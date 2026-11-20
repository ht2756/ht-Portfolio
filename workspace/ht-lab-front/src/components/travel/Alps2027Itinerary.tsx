"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BusFront,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  MapPin,
  Mountain,
  Plane,
  Route,
  Sparkles,
  TrainFront,
} from "lucide-react";
import Alps2027Map from "./Alps2027Map";
import {
  alps2027Itinerary,
  localized,
  type AlpineItineraryDay,
  type Locale,
} from "@/data/siteContent";

function TransportIcon({ mode }: { mode: AlpineItineraryDay["transportMode"] }) {
  if (mode === "flight") return <Plane size={16} />;
  if (mode === "rail") return <TrainFront size={16} />;
  if (mode === "bus") return <BusFront size={16} />;
  if (mode === "cable") return <Mountain size={16} />;
  return <Route size={16} />;
}

export default function Alps2027Itinerary({ locale }: { locale: Locale }) {
  const [activeDayNumber, setActiveDayNumber] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const activeDay = alps2027Itinerary.find((day) => day.day === activeDayNumber) ?? alps2027Itinerary[0];

  const copy =
    locale === "zh"
      ? {
          section: "15 日交互行程",
          title: "地图是路线，日程是现场指挥。",
          description: "点地图或日期切换每天计划。每一天都写清楚为什么去、怎么走、必须预订什么，以及天气不配合时如何替换。",
          day: "第",
          dayUnit: "天",
          placeIntro: "目的地速写",
          transport: "移动方式",
          reserve: "出发前锁定",
          fallback: "天气 / 延误替代",
          alert: "原攻略校正",
          plan: "当天节奏",
        }
      : {
          section: "15-Day Interactive Plan",
          title: "The map is the route. The itinerary is mission control.",
          description: "Select a point or date to switch days. Every day explains why it matters, how to move, what to book, and what to do when weather changes.",
          day: "Day",
          dayUnit: "",
          placeIntro: "Place briefing",
          transport: "Transit",
          reserve: "Lock before departure",
          fallback: "Weather / delay fallback",
          alert: "Original plan corrected",
          plan: "Day rhythm",
        };

  return (
    <section id="expedition-plan" className="alps-planner-section">
      <div className="lab-container">
        <div className="alps-planner-heading">
          <div>
            <div className="travel-kicker"><CalendarDays size={14} /> {copy.section}</div>
            <h2>{copy.title}</h2>
          </div>
          <p>{copy.description}</p>
        </div>

        <div className="alps-command-grid">
          <Alps2027Map locale={locale} activeDay={activeDay} onDaySelect={setActiveDayNumber} />

          <div className="alps-day-rail" role="tablist" aria-label={copy.section}>
            {alps2027Itinerary.map((day) => (
              <button
                key={day.day}
                type="button"
                role="tab"
                aria-selected={day.day === activeDay.day}
                aria-controls="alps-day-panel"
                data-active={day.day === activeDay.day ? "true" : "false"}
                onClick={() => setActiveDayNumber(day.day)}
              >
                <span>{String(day.day).padStart(2, "0")}</span>
                <small>{day.date}</small>
                <b>{localized(day.base, locale)}</b>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            id="alps-day-panel"
            key={activeDay.day}
            role="tabpanel"
            className="alps-day-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.34 }}
          >
            <header className="alps-day-header">
              <div className="alps-day-number">
                <span>{copy.day}</span>
                <strong>{String(activeDay.day).padStart(2, "0")}</strong>
                <span>{copy.dayUnit}</span>
              </div>
              <div className="alps-day-title">
                <div className="travel-kicker">
                  {activeDay.date} / {localized(activeDay.weekday, locale)} / {localized(activeDay.base, locale)}
                </div>
                <h3>{localized(activeDay.focus, locale)}</h3>
                <p><MapPin size={15} /> {localized(activeDay.route, locale)}</p>
              </div>
              <div className="alps-day-progress" aria-label={`${activeDay.routeProgress}%`}>
                <span style={{ width: `${activeDay.routeProgress}%` }} />
                <b>{activeDay.routeProgress}%</b>
              </div>
            </header>

            <div className="alps-place-briefing">
              <div className="travel-kicker"><Sparkles size={14} /> {copy.placeIntro}</div>
              <p>{localized(activeDay.placeIntro, locale)}</p>
              <div>
                <TransportIcon mode={activeDay.transportMode} />
                <span>{copy.transport}</span>
                <strong>{localized(activeDay.transport, locale)}</strong>
              </div>
            </div>

            <div className="alps-day-body">
              <div className="alps-day-schedule">
                <div className="alps-panel-label"><Route size={14} /> {copy.plan}</div>
                {activeDay.steps.map((step, index) => (
                  <div className="alps-schedule-step" key={`${activeDay.day}-${step.time}`}>
                    <div className="alps-step-index">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {index < activeDay.steps.length - 1 && <i />}
                    </div>
                    <time>{step.time}</time>
                    <div>
                      <h4>{localized(step.title, locale)}</h4>
                      <p>{localized(step.detail, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="alps-field-notes">
                <div className="alps-note alps-note-reserve">
                  <CheckCircle2 size={18} />
                  <div><span>{copy.reserve}</span><p>{localized(activeDay.reserve, locale)}</p></div>
                </div>
                <div className="alps-note alps-note-weather">
                  <CloudSun size={18} />
                  <div><span>{copy.fallback}</span><p>{localized(activeDay.fallback, locale)}</p></div>
                </div>
                {activeDay.alert && (
                  <div className="alps-note alps-note-alert">
                    <AlertTriangle size={18} />
                    <div><span>{copy.alert}</span><p>{localized(activeDay.alert, locale)}</p></div>
                  </div>
                )}
              </aside>
            </div>

            <div className="alps-day-switcher">
              {activeDay.day > 1 && (
                <button type="button" onClick={() => setActiveDayNumber(activeDay.day - 1)}>
                  <ArrowRight size={15} /> Day {String(activeDay.day - 1).padStart(2, "0")}
                </button>
              )}
              {activeDay.day < alps2027Itinerary.length && (
                <button type="button" onClick={() => setActiveDayNumber(activeDay.day + 1)}>
                  Day {String(activeDay.day + 1).padStart(2, "0")} <ArrowRight size={15} />
                </button>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
