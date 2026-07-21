import React from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent-primary)]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-black leading-tight text-[var(--text-primary)] md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
