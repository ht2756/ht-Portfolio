"use client";

import React, { useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ExternalLink, Sparkles } from "lucide-react";
import StatStrip from "./StatStrip";
import { homeHighlights, type Locale } from "@/data/siteContent";

gsap.registerPlugin(ScrollTrigger);

const CanvasLabLayer = dynamic(() => import("./CanvasLabLayer.client"), {
  ssr: false,
});

const missionSignals = [
  "dev",
  "design",
  "ai",
  "growth",
  "baby",
] as const;

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale() as Locale;
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // Hero title split animation
      const title = titleRef.current;
      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // Subtitle
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
        });
      }

      // Description
      if (descRef.current) {
        gsap.from(descRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          delay: 0.9,
        });
      }

      // CTA
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.2,
        });
      }

      // Parallax scroll effect on hero
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        opacity: 0.3,
      });

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "35% top",
            scrub: true,
          },
          opacity: 0,
          y: 18,
          pointerEvents: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-[8%] top-[16%] h-72 w-72 rounded-full opacity-20 blur-[90px]"
          style={{ backgroundColor: "var(--accent-primary)" }}
        />
        <div
          className="absolute right-[10%] top-[18%] h-80 w-80 rounded-full opacity-15 blur-[90px]"
          style={{ backgroundColor: "var(--accent-secondary)" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="lab-container relative z-10 grid min-h-[calc(100vh-96px)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.1 }}
            className="eyebrow-pill mb-6"
          >
            <Sparkles size={14} />
            {t("greeting")}
          </motion.p>

        <h1
          ref={titleRef}
          aria-label={`${t("title")} ${t("titleSuffix")}`}
          className="mb-6 text-balance text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl md:text-8xl lg:text-9xl"
        >
          <span className="gradient-text">{t("title")}</span>
          <span className="sr-only"> </span>
          <span className="block text-[var(--text-primary)]">{t("titleSuffix")}</span>
        </h1>

        <div ref={subtitleRef}>
          <p
            className="mb-5 text-xl font-semibold tracking-wide md:text-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        <p
          ref={descRef}
          className="mb-10 max-w-2xl text-base leading-8 md:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("description")}
        </p>

        <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row">
          <motion.a
            href="#sections"
            className="link-cta text-white"
            style={{ backgroundColor: "var(--accent-primary)" }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
                  }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          >
            {t("explore")}
            <ArrowDown size={17} />
          </motion.a>

          <motion.a
            href="#about"
            className="link-cta border"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    borderColor: "var(--accent-primary)",
                    color: "var(--accent-primary)",
                  }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          >
            {t("learnMore")}
            <ExternalLink size={16} />
          </motion.a>
        </div>

        <div className="mt-10 max-w-2xl">
          <StatStrip stats={homeHighlights} locale={locale} />
        </div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.45 }}
          className="home-ambient-panel hidden lg:block"
        >
          <CanvasLabLayer />
          <div className="home-signal-panel panel-card relative overflow-hidden rounded-[28px] p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-300 opacity-80" />
            <div className="mb-8 flex items-start justify-between border-b border-[var(--border-color)] pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                  {t("signals.label")}
                </p>
                <h2 className="mt-2 text-2xl font-black">{t("signals.heading")}</h2>
              </div>
              <div className="h-12 w-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-tertiary)]" />
            </div>

            <div className="space-y-3">
              {missionSignals.map((key) => (
                <div key={key} className="rounded-2xl border border-[var(--border-color)] bg-[rgba(255,255,255,0.03)] p-3.5">
                  <div className="font-bold">{t(`signals.items.${key}.name`)}</div>
                  <div className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{t(`signals.items.${key}.desc`)}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        ref={scrollIndicatorRef}
        href="#sections"
        aria-label={locale === "zh" ? "滚动到空间导航" : "Scroll to spaces"}
        className="fixed bottom-7 left-1/2 z-30 hidden -translate-x-1/2 md:block"
        animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="flex h-11 w-7 items-start justify-center rounded-full border bg-[var(--glass-bg)] pt-2 shadow-lg backdrop-blur"
          style={{ borderColor: "var(--border-color)" }}
        >
          <motion.div
            className="h-2.5 w-1 rounded-full"
            style={{ backgroundColor: "var(--accent-primary)" }}
            animate={shouldReduceMotion ? undefined : { opacity: [1, 0], y: [0, 8] }}
            transition={
              shouldReduceMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </div>
      </motion.a>
    </section>
  );
}
