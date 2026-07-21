"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { Baby, Bot, BriefcaseBusiness, Code2, PenTool, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const zones = [
  {
    titleKey: "devTitle",
    descKey: "devDesc",
    number: "01",
    href: "/dev-zone",
    from: "#58a6ff",
    to: "#3fb950",
    glow: "rgba(88, 166, 255, 0.14)",
    icon: Code2,
  },
  {
    titleKey: "designTitle",
    descKey: "designDesc",
    number: "02",
    href: "/design-zone",
    from: "#ec4899",
    to: "#f59e0b",
    glow: "rgba(236, 72, 153, 0.12)",
    icon: PenTool,
  },
  {
    titleKey: "aiTitle",
    descKey: "aiDesc",
    number: "03",
    href: "/ai-lab",
    from: "#a78bfa",
    to: "#22d3ee",
    glow: "rgba(167, 139, 250, 0.14)",
    icon: Bot,
  },
  {
    titleKey: "growthTitle",
    descKey: "growthDesc",
    number: "04",
    href: "/growth-log",
    from: "#d97706",
    to: "#14b8a6",
    glow: "rgba(217, 119, 6, 0.12)",
    icon: BriefcaseBusiness,
  },
  {
    titleKey: "babyTitle",
    descKey: "babyDesc",
    number: "05",
    href: "/baby-zone",
    from: "#fb7185",
    to: "#2dd4bf",
    glow: "rgba(251, 113, 133, 0.12)",
    icon: Baby,
  },
] as const;

export default function SectionsPreview() {
  const t = useTranslations("home.explore");
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // Section heading animation
      gsap.from(".explore-heading", {
        scrollTrigger: {
          trigger: ".explore-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Stagger entrance with rotation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 100,
          rotateX: 8,
          scale: 0.95,
          duration: 0.9,
          delay: index * 0.12,
          ease: "power3.out",
        });

        // Parallax: different speeds for each card
        gsap.to(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          y: index % 2 === 0 ? -30 : -15,
          ease: "none",
        });

        // Image/content parallax inside each card
        const inner = card.querySelector(".card-inner-content");
        if (inner) {
          gsap.to(inner, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -20,
            ease: "none",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      id="sections"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="lab-container relative">
        {/* Section heading */}
        <div className="explore-heading text-center mb-16">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-3 font-mono"
            style={{ color: "var(--text-tertiary)" }}
          >
            {t("label")}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
          {zones.map((zone, index) => {
            const Icon = zone.icon;
            const title = t(zone.titleKey);
            const description = t(zone.descKey);

            return (
              <div
                key={zone.href}
                className="h-full"
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <motion.article
                  className="zone-tile group h-full cursor-pointer"
                  style={
                    {
                      "--zone-from": zone.from,
                      "--zone-to": zone.to,
                      "--zone-glow": zone.glow,
                    } as React.CSSProperties
                  }
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.015, y: -3 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                >
                  <Link
                    href={zone.href}
                    className="zone-tile-link absolute inset-0 z-20"
                    aria-label={t("cardAria", { title })}
                  />
                  <div
                    className="absolute right-5 top-4 text-7xl font-black leading-none opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1] group-focus-within:opacity-[0.1]"
                    style={{ color: zone.from }}
                  >
                    {zone.number}
                  </div>

                  <div
                    className="absolute left-0 right-0 top-0 h-px scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
                    style={{ background: `linear-gradient(90deg, ${zone.from}, ${zone.to})` }}
                  />

                  <div className="card-inner-content pointer-events-none relative z-10 flex h-full flex-col justify-between p-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-color)]"
                      style={{
                        backgroundColor: `${zone.from}14`,
                        color: zone.from,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em]" style={{ color: zone.from }}>
                        {zone.number} / {t("zoneLabel")}
                      </div>
                      <h3
                        className="mb-3 text-2xl font-black leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {title}
                      </h3>
                      <p
                        className="mb-5 max-w-[250px] text-sm leading-6"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1" style={{ color: zone.from }}>
                        {t("cardCta")}
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
