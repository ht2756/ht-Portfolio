import React from "react";
import type { Stat, Locale } from "@/data/siteContent";
import { localized } from "@/data/siteContent";

interface StatStripProps {
  stats: Stat[];
  locale: Locale;
  compact?: boolean;
}

export default function StatStrip({ stats, locale, compact = false }: StatStripProps) {
  return (
    <div className={compact ? "grid grid-cols-2 gap-3 md:grid-cols-4" : "grid grid-cols-1 gap-4 sm:grid-cols-3"}>
      {stats.map((stat) => (
        <div key={`${stat.value}-${localized(stat.label, locale)}`} className="metric-card">
          <div className="text-3xl font-black text-[var(--text-primary)]">{stat.value}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            {localized(stat.label, locale)}
          </div>
        </div>
      ))}
    </div>
  );
}
