"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const t = useTranslations("home.cta");
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, var(--accent-primary) 0%, transparent 70%)",
        }}
      />

      <div className="cta-content relative z-10 max-w-2xl mx-auto text-center px-6">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {t("heading")}
        </h2>
        <p
          className="text-base md:text-lg mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.a
            href="#sections"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-sm transition-all"
            style={{ 
              backgroundColor: "var(--accent-primary)",
              color: "#ffffff",
            }}
            whileHover={shouldReduceMotion ? undefined : {
              scale: 1.02,
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
            }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            {t("getStarted")}
          </motion.a>

          <motion.a
            href="mailto:hello@htlab.dev"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-sm border transition-all"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
            whileHover={shouldReduceMotion ? undefined : {
              borderColor: "var(--accent-primary)",
              color: "var(--accent-primary)",
            }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            {t("contactUs")}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
