"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techItems = {
  frontend: [
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#ffffff" },
    { name: "Vue.js", color: "#4FC08D" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind CSS", color: "#06B6D4" },
    { name: "GSAP", color: "#88CE02" },
    { name: "Framer Motion", color: "#0055FF" },
  ],
  backend: [
    { name: "Java", color: "#ED8B00" },
    { name: "Spring Boot", color: "#6DB33F" },
    { name: "MySQL", color: "#4479A1" },
    { name: "Node.js", color: "#339933" },
  ],
  tools: [
    { name: "Git", color: "#F05032" },
    { name: "Docker", color: "#2496ED" },
    { name: "Figma", color: "#F24E1E" },
    { name: "VS Code", color: "#007ACC" },
    { name: "阿里云", color: "#FF6A00" },
  ],
};

export default function TechStackSection() {
  const t = useTranslations("home.techStack");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".tech-category").forEach((cat, i) => {
        gsap.from(cat, {
          scrollTrigger: {
            trigger: cat,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const categories = [
    { key: "frontend" as const, label: t("frontend"), items: techItems.frontend },
    { key: "backend" as const, label: t("backend"), items: techItems.backend },
    { key: "tools" as const, label: t("tools"), items: techItems.tools },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
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
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {t("heading")}
          </motion.h2>
        </div>

        {/* Tech categories */}
        <div className="space-y-10">
          {categories.map((category) => (
            <div key={category.key} className="tech-category">
              <h3
                className="text-xs font-semibold tracking-widest uppercase mb-4 text-center"
                style={{ color: "var(--text-tertiary)" }}
              >
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border"
                    style={{
                      borderColor: "var(--border-color)",
                      backgroundColor: "var(--bg-primary)",
                    }}
                  >
                    {/* Color dot */}
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
