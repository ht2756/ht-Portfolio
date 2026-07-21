"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const t = useTranslations("home.about");
  const statsT = useTranslations("home.stats");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      // Cards animation
      gsap.utils.toArray<HTMLElement>(".about-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });

      // Stats animation
      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((stat, i) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const stats = [
    { value: "50+", label: statsT("projects") },
    { value: "8+", label: statsT("years") },
    { value: "30+", label: statsT("clients") },
    { value: "100+", label: statsT("designs") },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "var(--border-color)" }} />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.2em] uppercase mb-3 font-mono"
            style={{ color: "var(--text-tertiary)" }}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Two-column: Dev + Designer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Developer card */}
          <div className="about-card">
            <motion.div
              className="relative rounded-xl border p-6 md:p-8 transition-all duration-300 h-full"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
              }}
              whileHover={shouldReduceMotion ? undefined : {
                borderColor: "#6366f1",
                y: -2,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ backgroundColor: "#6366f115", color: "#6366f1" }}
                >
                  {"</>"}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {t("devName")}
                  </h3>
                  <p className="text-xs font-medium mb-3" style={{ color: "#6366f1" }}>
                    {t("devRole")}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t("devBio")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Designer card */}
          <div className="about-card">
            <motion.div
              className="relative rounded-xl border p-6 md:p-8 transition-all duration-300 h-full"
              style={{
                borderColor: "var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
              }}
              whileHover={shouldReduceMotion ? undefined : {
                borderColor: "#ec4899",
                y: -2,
              }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ backgroundColor: "#ec489915", color: "#ec4899" }}
                >
                  ◇
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {t("designerName")}
                  </h3>
                  <p className="text-xs font-medium mb-3" style={{ color: "#ec4899" }}>
                    {t("designerRole")}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {t("designerBio")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats - horizontal layout */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
