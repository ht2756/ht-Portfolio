"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import TerminalBoot from "@/components/TerminalBoot";
import HeroSection from "@/components/HeroSection";
import SectionsPreview from "@/components/SectionsPreview";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let hasCompletedTerminalBoot = false;
const terminalBootStorageKey = "ht-lab-terminal-booted";

function getStoredBootState() {
  if (hasCompletedTerminalBoot) return true;
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(terminalBootStorageKey) === "true";
}

export default function HomePage() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [booted, setBooted] = useState(hasCompletedTerminalBoot);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getStoredBootState()) {
      hasCompletedTerminalBoot = true;
      setBooted(true);
    }
    setHasHydrated(true);
  }, []);

  const handleBootComplete = useCallback(() => {
    hasCompletedTerminalBoot = true;
    window.sessionStorage.setItem(terminalBootStorageKey, "true");
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!booted) return;

    const ctx = gsap.context(() => {
      // Global smooth section reveals
      gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            end: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0.7,
          duration: 0.5,
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [booted]);

  if (!hasHydrated) {
    return <div className="fixed inset-0 bg-[#0a0a0a]" aria-hidden="true" />;
  }

  return (
    <>
      {!booted && <TerminalBoot onComplete={handleBootComplete} />}
      {booted && (
        <div ref={mainRef} className="min-h-screen">
          <Navigation />
          <main>
            <HeroSection />
            <SectionsPreview />
            <AboutSection />
            <TechStackSection />
            <CTASection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
