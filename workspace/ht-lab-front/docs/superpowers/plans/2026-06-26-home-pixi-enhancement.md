# Home Pixi Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a restrained DOM-first home page enhancement with unified entry cards and an optional desktop-only Pixi atmosphere layer.

**Architecture:** Keep all meaningful home content in existing DOM components. Add one client-only Pixi component that loads only after runtime gating passes and never imports `pixi.js/html-source`. Keep zone card structure unified and share lightweight tokens between DOM cards and the Canvas layer.

**Tech Stack:** Next 15, React 19, TypeScript, Tailwind v4 CSS, GSAP, Framer Motion, lucide-react, PixiJS 8.19.0.

**Repository Note:** `/Users/huangtao/Desktop/ht-Portfolio/workspace/ht-lab-front` is not currently a git repository. Workers should skip commit steps and report changed files instead.

---

## File Structure

- Modify `package.json` and `package-lock.json`: add `pixi.js` dependency.
- Create `src/components/CanvasLabLayer.client.tsx`: isolated decorative Pixi layer with gating, dynamic import, cleanup, and zero-impact failure behavior.
- Modify `src/components/HeroSection.tsx`: remove fake progress/status bars, add dynamic client-only Canvas layer wrapper, and keep hero copy/CTA as DOM.
- Modify `src/components/SectionsPreview.tsx`: convert all current home entry cards, including Baby Zone, into unified zone tiles with one hover/focus feedback and no fake progress bars.
- Modify `src/styles/globals.css`: add reusable classes for the Canvas host and zone tiles, including reduced-motion fallbacks and keyboard focus styling.
- Modify `scripts/validate-fullsite.mjs`: add static validation for no `pixi.js/html-source`, no fake progress percentages in home cards, Canvas accessibility attributes, and Pixi mobile/reduced-motion gating tokens.

## Task 1: Add Pixi Dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install PixiJS**

Run:

```bash
npm install pixi.js@8.19.0
```

Expected: `package.json` contains `"pixi.js": "^8.19.0"` or `"pixi.js": "8.19.0"`, and `package-lock.json` is updated.

- [ ] **Step 2: Verify the forbidden subpath is not used**

Run:

```bash
rg "pixi\\.js/html-source|html-source" src package.json package-lock.json
```

Expected: no matches in `src`; `package-lock.json` may contain package export metadata only if npm records it.

- [ ] **Step 3: Run dependency-aware build check**

Run:

```bash
npm run build
```

Expected: build succeeds. If unrelated pre-existing build failures appear, record the exact failure before moving on.

## Task 2: Implement Client-Only CanvasLabLayer

**Files:**
- Create: `src/components/CanvasLabLayer.client.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/CanvasLabLayer.client.tsx` with this implementation:

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type ZoneSignal = {
  id: string;
  accent: string;
};

type CanvasLabLayerProps = {
  activeZone?: ZoneSignal | null;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const ENABLED_FLAG = process.env.NEXT_PUBLIC_ENABLE_PIXI_HOME_LAYER;
const MAX_PARTICLES = 34;
const TARGET_FPS = 30;

function isEnhancementEnabled() {
  return ENABLED_FLAG !== "0";
}

function hasWebGLSupport() {
  const canvas = document.createElement("canvas");
  return Boolean(
    canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl"),
  );
}

function shouldSkipBeforeImport() {
  const nav = navigator as NavigatorWithConnection;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const isWideEnough = window.matchMedia("(min-width: 1024px)").matches;
  const reducesMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    !isEnhancementEnabled() ||
    !hasFinePointer ||
    !isWideEnough ||
    reducesMotion ||
    Boolean(nav.connection?.saveData) ||
    !hasWebGLSupport()
  );
}

export default function CanvasLabLayer({ activeZone }: CanvasLabLayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<{ destroy: (removeView?: boolean, options?: unknown) => void } | null>(null);
  const frameRef = useRef(0);
  const activeZoneRef = useRef<ZoneSignal | null>(activeZone ?? null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    activeZoneRef.current = activeZone ?? null;
  }, [activeZone]);

  useEffect(() => {
    let disposed = false;
    let visibilityHandler: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    async function start() {
      const host = hostRef.current;
      if (!host || shouldSkipBeforeImport()) return;

      try {
        const PIXI = await import("pixi.js");
        if (disposed || !hostRef.current) return;

        const app = new PIXI.Application();
        await app.init({
          backgroundAlpha: 0,
          antialias: true,
          autoDensity: true,
          resolution: Math.min(window.devicePixelRatio || 1, 1.5),
          resizeTo: host,
          powerPreference: "low-power",
        });

        appRef.current = app;
        app.canvas.setAttribute("aria-hidden", "true");
        app.canvas.style.width = "100%";
        app.canvas.style.height = "100%";
        app.canvas.style.display = "block";
        host.appendChild(app.canvas);

        const particles = Array.from({ length: MAX_PARTICLES }, (_, index) => {
          const graphic = new PIXI.Graphics();
          const size = 1.5 + (index % 5) * 0.35;
          const x = Math.random() * app.screen.width;
          const y = Math.random() * app.screen.height;
          graphic.circle(0, 0, size);
          graphic.fill({ color: 0x7dd3fc, alpha: 0.28 });
          graphic.x = x;
          graphic.y = y;
          app.stage.addChild(graphic);
          return {
            graphic,
            baseX: x,
            baseY: y,
            speed: 0.14 + (index % 7) * 0.018,
            phase: index * 0.73,
          };
        });

        const field = new PIXI.Graphics();
        app.stage.addChildAt(field, 0);

        const drawField = (accent = "#7dd3fc") => {
          field.clear();
          const color = Number.parseInt(accent.replace("#", ""), 16) || 0x7dd3fc;
          field.circle(app.screen.width * 0.7, app.screen.height * 0.34, Math.min(app.screen.width, app.screen.height) * 0.34);
          field.fill({ color, alpha: 0.08 });
          field.circle(app.screen.width * 0.32, app.screen.height * 0.7, Math.min(app.screen.width, app.screen.height) * 0.2);
          field.fill({ color: 0xa78bfa, alpha: 0.05 });
        };

        drawField(activeZoneRef.current?.accent);

        let lastFrame = 0;
        app.ticker.add((ticker) => {
          const now = performance.now();
          if (now - lastFrame < 1000 / TARGET_FPS) return;
          lastFrame = now;

          frameRef.current += ticker.deltaTime;
          const active = activeZoneRef.current;
          drawField(active?.accent);

          particles.forEach((particle, index) => {
            const pulse = Math.sin(frameRef.current * particle.speed + particle.phase);
            particle.graphic.x = particle.baseX + pulse * 8;
            particle.graphic.y = particle.baseY + Math.cos(frameRef.current * particle.speed + particle.phase) * 6;
            particle.graphic.alpha = active ? 0.42 : 0.24 + (index % 4) * 0.035;
          });
        });

        visibilityHandler = () => {
          if (document.hidden) {
            app.ticker.stop();
          } else {
            app.ticker.start();
          }
        };

        document.addEventListener("visibilitychange", visibilityHandler);
        resizeObserver = new ResizeObserver(() => drawField(activeZoneRef.current?.accent));
        resizeObserver.observe(host);
        setIsMounted(true);
      } catch {
        if (hostRef.current) {
          hostRef.current.replaceChildren();
        }
      }
    }

    const idleWindow = window as IdleWindow;
    const idle = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(() => void start(), { timeout: 1800 })
      : window.setTimeout(() => void start(), 500);

    return () => {
      disposed = true;
      setIsMounted(false);
      if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
      if (visibilityHandler) {
        document.removeEventListener("visibilitychange", visibilityHandler);
      }
      resizeObserver?.disconnect();
      appRef.current?.destroy(true, { children: true, texture: true });
      appRef.current = null;
      hostRef.current?.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="canvas-lab-layer"
      aria-hidden="true"
      data-mounted={isMounted ? "true" : "false"}
    />
  );
}
```

- [ ] **Step 2: Run TypeScript/build check**

Run:

```bash
npm run build
```

Expected: build succeeds. If TypeScript complains about `requestIdleCallback`, add a local typed alias inside the component instead of disabling type checking.

- [ ] **Step 3: Confirm no forbidden import exists**

Run:

```bash
rg "pixi\\.js/html-source|html-source" src/components/CanvasLabLayer.client.tsx src
```

Expected: no output.

## Task 3: Add Canvas Host Styling

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Append Canvas and zone tile styles**

Append this block near the component utility classes in `src/styles/globals.css`, after `.panel-card`:

```css
.home-ambient-panel {
  position: relative;
  isolation: isolate;
}

.canvas-lab-layer {
  position: absolute;
  inset: -12%;
  z-index: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  transition: opacity 0.8s ease;
  mask-image: radial-gradient(circle at 62% 42%, black, transparent 74%);
}

.canvas-lab-layer[data-mounted="true"] {
  opacity: 0.72;
}

.home-signal-panel {
  position: relative;
  z-index: 1;
}

.zone-tile {
  position: relative;
  min-height: 250px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid var(--border-color);
  background:
    linear-gradient(145deg, var(--zone-glow), color-mix(in srgb, var(--bg-secondary) 88%, transparent));
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.zone-tile:focus-within,
.zone-tile:hover {
  border-color: var(--zone-from);
  box-shadow: 0 22px 70px color-mix(in srgb, var(--zone-from) 14%, transparent);
}

.zone-tile::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background:
    linear-gradient(90deg, transparent, color-mix(in srgb, var(--zone-from) 32%, transparent), transparent),
    radial-gradient(circle at 24% 18%, color-mix(in srgb, var(--zone-to) 18%, transparent), transparent 36%);
  transition: opacity 0.25s ease;
}

.zone-tile:focus-within::before,
.zone-tile:hover::before {
  opacity: 1;
}

.zone-tile-link:focus-visible {
  outline: 2px solid var(--zone-from);
  outline-offset: -6px;
  border-radius: 24px;
}

@media (prefers-reduced-motion: reduce) {
  .canvas-lab-layer {
    display: none;
  }

  .zone-tile,
  .zone-tile::before {
    transition: none;
  }
}
```

- [ ] **Step 2: Verify CSS references are ASCII and valid**

Run:

```bash
rg -n "canvas-lab-layer|zone-tile|home-ambient-panel|home-signal-panel" src/styles/globals.css
```

Expected: all four class names appear.

## Task 4: Refine HeroSection and Integrate CanvasLabLayer

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Add dynamic import and helper data**

Update the imports at the top of `src/components/HeroSection.tsx` so they include `next/dynamic` and remove no existing required imports:

```tsx
import dynamic from "next/dynamic";
```

Then add this after `gsap.registerPlugin(ScrollTrigger);`:

```tsx
const CanvasLabLayer = dynamic(() => import("./CanvasLabLayer.client"), {
  ssr: false,
});

const missionSignals = [
  ["Dev Zone", "Full-stack systems and mini programs"],
  ["Design Zone", "Presentation and visual storytelling"],
  ["AI Lab", "Dify workflows and prompt experiments"],
  ["Growth Log", "Learning notes and craft records"],
  ["Baby Zone", "Family growth and tiny moments"],
] as const;
```

- [ ] **Step 2: Replace the right hero panel content**

In `HeroSection.tsx`, replace the current right-side `<motion.div ... className="panel-card relative hidden min-h-[520px] ...">...</motion.div>` with:

```tsx
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="home-ambient-panel hidden min-h-[520px] lg:block"
        >
          <CanvasLabLayer />
          <div className="home-signal-panel panel-card relative min-h-[520px] overflow-hidden rounded-[28px] p-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-300 opacity-80" />
            <div className="mb-8 flex items-start justify-between border-b border-[var(--border-color)] pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                  Portfolio Signals
                </p>
                <h2 className="mt-2 text-2xl font-black">Build useful systems with a designed finish.</h2>
              </div>
              <div className="h-12 w-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-tertiary)]" />
            </div>

            <div className="space-y-3">
              {missionSignals.map(([name, desc]) => (
                <div key={name} className="rounded-2xl border border-[var(--border-color)] bg-[rgba(255,255,255,0.03)] p-4">
                  <div className="font-bold">{name}</div>
                  <div className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{desc}</div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-[rgba(125,211,252,0.08)] p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              &gt; portfolio_status: clear, personal, production-ready
            </div>
          </div>
        </motion.div>
```

This removes fake percentages and progress bars while preserving Baby Zone.

- [ ] **Step 3: Run static checks for removed fake progress UI**

Run:

```bash
rg -n "\"[0-9]+%\"|width\\]|h-1\\.5|portfolio_status" src/components/HeroSection.tsx
```

Expected: no percentage strings or progress bar class matches; `portfolio_status` may still appear once.

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: build succeeds.

## Task 5: Unify Home Entry Cards

**Files:**
- Modify: `src/components/SectionsPreview.tsx`

- [ ] **Step 1: Replace card token arrays with unified zone data**

In `SectionsPreview.tsx`, replace `sectionColors`, `sectionNumbers`, and `sectionLinks` with:

```tsx
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
```

- [ ] **Step 2: Replace title/description arrays**

Remove:

```tsx
  const titles = [t("devTitle"), t("designTitle"), t("aiTitle"), t("growthTitle"), t("babyTitle")];
  const descriptions = [t("devDesc"), t("designDesc"), t("aiDesc"), t("growthDesc"), t("babyDesc")];
```

Then iterate over `zones` directly in the JSX.

- [ ] **Step 3: Replace the card JSX**

Replace the current `{titles.map(...)}` block with:

```tsx
          {zones.map((zone, index) => {
            const Icon = zone.icon;
            const title = t(zone.titleKey);
            const description = t(zone.descKey);

            return (
              <div
                key={zone.href}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <motion.article
                  className="zone-tile group cursor-pointer"
                  style={
                    {
                      "--zone-from": zone.from,
                      "--zone-to": zone.to,
                      "--zone-glow": zone.glow,
                    } as React.CSSProperties
                  }
                  whileHover={{
                    scale: 1.015,
                    y: -3,
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link href={zone.href} className="zone-tile-link absolute inset-0 z-20" aria-label={`Explore ${title}`} />
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
                        {zone.number} / Zone
                      </div>
                      <h3 className="mb-3 text-2xl font-black md:text-[1.65rem]" style={{ color: "var(--text-primary)" }}>
                        {title}
                      </h3>
                      <p className="mb-5 max-w-[250px] text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                        {description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1" style={{ color: zone.from }}>
                        Explore
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
```

- [ ] **Step 4: Keep the grid stable with five current entries**

Keep the container grid as:

```tsx
<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
```

Expected: current Baby Zone entry remains visible and linked.

- [ ] **Step 5: Run build**

Run:

```bash
npm run build
```

Expected: build succeeds.

## Task 6: Add Static Validation Guardrails

**Files:**
- Modify: `scripts/validate-fullsite.mjs`

- [ ] **Step 1: Add new file reads**

After the existing `const sectionsPreview = ...` line, add:

```js
const heroSection = readFileSync(join(root, "src/components/HeroSection.tsx"), "utf8");
const canvasLabLayerPath = "src/components/CanvasLabLayer.client.tsx";
const canvasLabLayer = readFileSync(join(root, canvasLabLayerPath), "utf8");
```

- [ ] **Step 2: Add validation rules**

After the existing `if (sectionsPreview.includes("max-w-5xl mx-auto")) { ... }` block, add:

```js
if (/pixi\\.js\\/html-source|html-source/.test(canvasLabLayer) || /pixi\\.js\\/html-source|html-source/.test(heroSection) || /pixi\\.js\\/html-source|html-source/.test(sectionsPreview)) {
  failures.push("Home Pixi MVP must not import or reference pixi.js/html-source.");
}

if (!canvasLabLayer.includes('aria-hidden="true"')) {
  failures.push("CanvasLabLayer must be aria-hidden because it is decorative.");
}

if (!canvasLabLayer.includes("pointer-events: none") && !readFileSync(join(root, "src/styles/globals.css"), "utf8").includes("pointer-events: none")) {
  failures.push("CanvasLabLayer must not capture pointer events.");
}

for (const token of ["prefers-reduced-motion", "(pointer: fine)", "min-width: 1024px", "saveData", "requestIdleCallback"]) {
  if (!canvasLabLayer.includes(token)) {
    failures.push(`CanvasLabLayer is missing runtime gate token: ${token}.`);
  }
}

if (/"[0-9]+%"/.test(heroSection)) {
  failures.push("HeroSection still contains fake percentage signal copy.");
}

if (heroSection.includes("h-1.5 overflow-hidden rounded-full")) {
  failures.push("HeroSection still contains progress-bar styling.");
}

if (!sectionsPreview.includes("zone-tile")) {
  failures.push("SectionsPreview should use unified zone-tile cards.");
}

if (!sectionsPreview.includes('href: "/baby-zone"')) {
  failures.push("SectionsPreview must preserve the Baby Zone entry.");
}
```

- [ ] **Step 3: Run validation**

Run:

```bash
npm run validate:fullsite
```

Expected: `Full-site validation passed.`

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: build succeeds.

## Task 7: Visual and Behavioral Verification

**Files:**
- No code files expected unless verification finds defects.

- [ ] **Step 1: Run full verification commands**

Run:

```bash
npm run validate:fullsite
npm run build
```

Expected: validation passes and build succeeds.

- [ ] **Step 2: Start dev server**

Run:

```bash
npm run dev
```

Expected: Next dev server starts on the default available port.

- [ ] **Step 3: Inspect desktop home routes**

Open:

```text
http://localhost:3000/zh
http://localhost:3000/en
```

Verify:

- Hero text and CTAs are visible before any Canvas load.
- Right hero panel has no percentages or progress bars.
- Canvas does not intercept clicks.
- Entry cards show Dev, Design, AI, Growth, and Baby.
- Entry cards share the same structure and only use restrained accent differences.
- Keyboard tab focus is visible on each card.
- Page feels refined rather than busy.

- [ ] **Step 4: Inspect mobile**

Use a 390x844 viewport on `/zh`.

Verify:

- No Pixi canvas is loaded.
- Entry cards do not overlap.
- Button text does not overflow.
- Baby Zone remains reachable.

- [ ] **Step 5: Inspect reduced motion**

Enable reduced motion in browser or emulate it in DevTools.

Verify:

- `CanvasLabLayer` does not load.
- DOM content remains complete and readable.

- [ ] **Step 6: Stop dev server**

Stop the running `npm run dev` process with `Ctrl-C`.

Expected: no long-running process remains.
