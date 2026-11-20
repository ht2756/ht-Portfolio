"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "./ThemeProvider";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import clsx from "clsx";

const navItems = [
  { key: "devZone", href: "/dev-zone", from: "#0369a1", to: "#047857" },
  { key: "designZone", href: "/design-zone", from: "#db2777", to: "#7c3aed" },
  { key: "aiLab", href: "/ai-lab", from: "#7c3aed", to: "#0e7490" },
  { key: "growthLog", href: "/growth-log", from: "#b45309", to: "#0f766e" },
  { key: "babyZone", href: "/baby-zone", from: "#e11d48", to: "#0f766e" },
  { key: "travelZone", href: "/travel-zone", from: "#d49a33", to: "#0f766e" },
] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isMobileOpen]);

  const switchLocale = () => {
    const next = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
        data-scrolled={isScrolled ? "true" : "false"}
        className="nav-shell fixed inset-x-0 top-0 z-[1000]"
      >
        <nav className="nav-inner mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            className="nav-logo text-xl font-bold tracking-tight"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
          >
            <Link href="/">
              <span className="gradient-text">HT</span>
              <span style={{ color: "var(--text-primary)" }}> Lab</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="nav-rail hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.key}
                  data-active={isActive ? "true" : "false"}
                  className={clsx("nav-item relative isolate text-sm font-semibold", {
                    "nav-item-active": isActive,
                  })}
                  style={
                    {
                      "--nav-from": item.from,
                      "--nav-to": item.to,
                    } as React.CSSProperties
                  }
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className="nav-link relative z-10 block px-4 py-2"
                  >
                    {t(item.key)}
                  </Link>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden="true"
                      className="nav-active-indicator absolute inset-0 -z-10"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 32 }
                      }
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              onClick={switchLocale}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
              whileHover={{ borderColor: "var(--accent-primary)" }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            >
              {locale === "zh" ? "EN" : "中文"}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
              }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
              aria-label={t("toggleTheme")}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
              aria-label={t("toggleNavigationMenu")}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
            >
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="w-5 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--text-primary)" }}
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="w-5 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--text-primary)" }}
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="w-5 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--text-primary)" }}
              />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            className="nav-mobile-panel fixed inset-0 z-[999] lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 pt-14 sm:gap-5">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;

                return (
                  <motion.div
                    key={item.key}
                    data-active={isActive ? "true" : "false"}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : i * 0.08 }}
                    className="mobile-nav-item text-xl font-bold sm:text-2xl"
                    style={
                      {
                        "--nav-from": item.from,
                        "--nav-to": item.to,
                      } as React.CSSProperties
                    }
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className="mobile-nav-link block px-6 py-3"
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
