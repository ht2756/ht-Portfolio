import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredPageFiles = [
  "src/app/[locale]/page.tsx",
  "src/app/[locale]/dev-zone/page.tsx",
  "src/app/[locale]/design-zone/page.tsx",
  "src/app/[locale]/ai-lab/page.tsx",
  "src/app/[locale]/growth-log/page.tsx",
  "src/app/[locale]/baby-zone/page.tsx",
];

const failures = [];
const read = (file) => readFileSync(join(root, file), "utf8");

const homepageContent = read("src/app/[locale]/page.tsx");
const layoutContent = read("src/app/[locale]/layout.tsx");
const homepageComponentChecks = [
  "HeroSection",
  "SectionsPreview",
  "AboutSection",
  "TechStackSection",
  "CTASection",
];

for (const componentName of homepageComponentChecks) {
  if (!homepageContent.includes(componentName)) {
    failures.push(`Homepage is missing ${componentName}.`);
  }
}

if (!homepageContent.includes("hasCompletedTerminalBoot")) {
  failures.push("Homepage does not persist terminal boot completion across client-side route remounts.");
}

if (!homepageContent.includes("hasHydrated")) {
  failures.push("Homepage should render a hydration-safe placeholder before reading sessionStorage.");
}

if (!homepageContent.includes("sessionStorage")) {
  failures.push("Homepage should persist terminal boot completion in sessionStorage across reloads.");
}

if (/useState\s*\(\s*getInitialBootState\s*\)/.test(homepageContent)) {
  failures.push("Homepage should not initialize React state directly from sessionStorage; it causes hydration mismatch.");
}

if (!homepageContent.includes("hasCompletedTerminalBoot = true")) {
  failures.push("Homepage does not mark terminal boot completion after the intro finishes.");
}

if (!homepageContent.includes("{!booted && <TerminalBoot")) {
  failures.push("Homepage should only mount TerminalBoot before the page is booted.");
}

if (!layoutContent.includes("generateMetadata") || !layoutContent.includes("全栈开发 × UI 设计")) {
  failures.push("Locale layout should localize document metadata for zh and en pages.");
}

const heroSection = read("src/components/HeroSection.tsx");
const sectionsPreview = read("src/components/SectionsPreview.tsx");
const canvasLabLayer = read("src/components/CanvasLabLayer.client.tsx");
const globalsCss = read("src/styles/globals.css");

if (sectionsPreview.includes("max-w-5xl mx-auto")) {
  failures.push("SectionsPreview still uses a narrow/two-column layout; expected full-width centered feature cards.");
}

const homepageEnhancementSources = [
  ["HeroSection.tsx", heroSection],
  ["SectionsPreview.tsx", sectionsPreview],
  ["CanvasLabLayer.client.tsx", canvasLabLayer],
];

for (const [file, content] of homepageEnhancementSources) {
  if (/pixi\.js\/html-source|html-source/i.test(content)) {
    failures.push(`${file} should not reference Pixi demo html-source assets.`);
  }
}

if (!heroSection.includes("CanvasLabLayer")) {
  failures.push("HeroSection should mount the optional CanvasLabLayer enhancement.");
}

if (!heroSection.includes("useReducedMotion")) {
  failures.push("HeroSection should respect reduced-motion preferences for animated homepage elements.");
}

if (!heroSection.includes("useLayoutEffect")) {
  failures.push("HeroSection should start initial GSAP reveal from useLayoutEffect to avoid first-paint flicker.");
}

if (/useEffect\s*\(\s*\(\)\s*=>[\s\S]*?gsap\.from/.test(heroSection)) {
  failures.push("HeroSection should not start initial gsap.from reveal from useEffect.");
}

const hardcodedHomepageEnglish = [
  "Portfolio Signals",
  "Build useful systems",
  "Full-stack systems",
  "Presentation and visual",
  "Family growth",
];

for (const token of hardcodedHomepageEnglish) {
  if (heroSection.includes(token) || sectionsPreview.includes(token)) {
    failures.push(`Homepage components should localize visible copy instead of hardcoding: ${token}`);
  }
}

if (/(?:["'`>])\s*(?:[1-9]\d|100)%\s*(?:["'`<])/.test(heroSection)) {
  failures.push("HeroSection should not render fake percentage copy or progress metrics.");
}

if (/progress(?:-|_)?bar|loadingProgress|progressValue/i.test(heroSection)) {
  failures.push("HeroSection should not use fake progress bar UI.");
}

if (!sectionsPreview.includes("zone-tile")) {
  failures.push("SectionsPreview should render the upgraded zone-tile card surface.");
}

if (!sectionsPreview.includes("useReducedMotion")) {
  failures.push("SectionsPreview should respect reduced-motion preferences for card animation.");
}

if (!sectionsPreview.includes('/baby-zone') || !heroSection.includes('"baby"')) {
  failures.push("Home entry cards/signals must preserve the baby zone.");
}

const staticPixiImportPattern =
  /^import\s+(?!type\b)(?:[^;]|\n)*\bfrom\s+["']pixi\.js["'];?/m;
const staticPixiSideEffectPattern = /^import\s+["']pixi\.js["'];?/m;
if (staticPixiImportPattern.test(canvasLabLayer) || staticPixiSideEffectPattern.test(canvasLabLayer)) {
  failures.push("CanvasLabLayer should not statically import pixi.js at runtime; use a gated dynamic import.");
}

const pixiDynamicImportIndex = canvasLabLayer.indexOf('await import("pixi.js")');
const pixiGateIndex = canvasLabLayer.indexOf("if (!host || shouldSkipBeforeImport()) return;");
if (pixiDynamicImportIndex === -1) {
  failures.push("CanvasLabLayer should dynamically import pixi.js after runtime gating.");
} else if (pixiGateIndex === -1 || pixiGateIndex > pixiDynamicImportIndex) {
  failures.push("CanvasLabLayer should run runtime gates before importing pixi.js.");
}

if (!canvasLabLayer.includes('aria-hidden="true"')) {
  failures.push("CanvasLabLayer must remain decorative with aria-hidden=true.");
}

if (!/\.canvas-lab-layer\s*\{[\s\S]*?pointer-events:\s*none\s*;[\s\S]*?\}/.test(globalsCss)) {
  failures.push("CanvasLabLayer CSS must keep the ambient canvas non-interactive with pointer-events: none.");
}

const canvasRuntimeGates = [
  ["(pointer: fine)", "fine pointer"],
  ["(min-width: 1024px)", "desktop viewport"],
  ["(prefers-reduced-motion: reduce)", "reduced motion"],
  ["saveData", "data saver"],
  ["requestIdleCallback", "idle startup"],
  ["hasWebGLSupport", "WebGL support"],
];

for (const [token, label] of canvasRuntimeGates) {
  if (!canvasLabLayer.includes(token)) {
    failures.push(`CanvasLabLayer is missing the ${label} runtime gate.`);
  }
}

const aboutSection = read("src/components/AboutSection.tsx");
if (!aboutSection.includes('useTranslations("home.stats")')) {
  failures.push("AboutSection should read statistic labels from home.stats instead of missing home.about keys.");
}

const reducedMotionComponents = [
  ["src/components/AboutSection.tsx", aboutSection],
  ["src/components/TechStackSection.tsx", read("src/components/TechStackSection.tsx")],
  ["src/components/CTASection.tsx", read("src/components/CTASection.tsx")],
];

for (const [file, content] of reducedMotionComponents) {
  if (!content.includes("useReducedMotion")) {
    failures.push(`${file} should respect prefers-reduced-motion.`);
  }
  if (!/if\s*\(\s*shouldReduceMotion\s*\)\s*return/.test(content)) {
    failures.push(`${file} should skip GSAP scroll animations when reduced motion is requested.`);
  }
}

const techStackSection = read("src/components/TechStackSection.tsx");
if (/hover:-translate-[^\s"']+/.test(techStackSection)) {
  failures.push("TechStackSection should not apply CSS hover movement outside reduced-motion controls.");
}

const navigation = read("src/components/Navigation.tsx");
if (/aria-label="Toggle theme"|aria-label="Toggle navigation menu"/.test(navigation)) {
  failures.push("Navigation control aria labels should be locale-aware instead of hardcoded English.");
}

const navigationVisualChecks = [
  ["nav-shell", "Navigation should use its dedicated borderless shell."],
  ["nav-rail", "Desktop navigation should use a quiet visual rail."],
  ["nav-active-indicator", "Active navigation items should use the spectrum indicator."],
  ["--nav-from", "Navigation items should expose a spectrum start color."],
  ["--nav-to", "Navigation items should expose a spectrum end color."],
  ["useReducedMotion", "Navigation motion should respect prefers-reduced-motion."],
  ['data-scrolled={isScrolled ? "true" : "false"}', "Navigation should expose its scrolled state without a generic glass border."],
];

for (const [token, message] of navigationVisualChecks) {
  if (!navigation.includes(token)) {
    failures.push(message);
  }
}

if (navigation.includes("glass shadow-lg")) {
  failures.push("Scrolled navigation should not reuse the bordered generic glass utility.");
}

if ((navigation.match(/aria-current=/g) ?? []).length < 2) {
  failures.push("Desktop and mobile navigation should both expose the active route with aria-current.");
}

const navigationCssChecks = [
  ['.nav-shell[data-scrolled="true"]', "Navigation CSS should define the lightweight scrolled surface."],
  ["border: 0", "The navigation shell should explicitly remove hard edge borders."],
  [".nav-rail", "Navigation CSS should style the desktop rail."],
  [".nav-active-indicator", "Navigation CSS should style the active spectrum indicator."],
];

for (const [token, message] of navigationCssChecks) {
  if (!globalsCss.includes(token)) {
    failures.push(message);
  }
}

const requiredContent = {
  "src/app/[locale]/dev-zone/page.tsx": ["SiteShell", "devProjects", "techTracks"],
  "src/app/[locale]/design-zone/page.tsx": ["SiteShell", "designWorks", "categories"],
  "src/app/[locale]/ai-lab/page.tsx": ["SiteShell", "aiCapabilities", "learning"],
  "src/app/[locale]/growth-log/page.tsx": ["SiteShell", "growthEntries", "groups"],
  "src/app/[locale]/baby-zone/page.tsx": ["SiteShell", "babyMilestones", "babyMoments", "babyFavorites"],
};

const bareEnglishCopyChecks = [
  [
    "src/app/[locale]/dev-zone/page.tsx",
    [
      />\s*Dev Zone \/ Project OS\s*</,
      />\s*Full-stack systems with a control-room finish\.\s*</,
      />\s*System pulse\s*</,
      />\s*Engineering Activity\s*</,
      /\["RBAC", "Charts", "Workflow"\]/,
      />\s*online\s*</,
      /eyebrow="Project Archive"/,
      /eyebrow="Tech Matrix"/,
    ],
  ],
  [
    "src/app/[locale]/design-zone/page.tsx",
    [
      />\s*Design Zone \/ Presentation Portfolio\s*</,
      />\s*Presentation systems with gallery-grade covers\.\s*</,
      /eyebrow="Gallery"/,
    ],
  ],
  [
    "src/app/[locale]/ai-lab/page.tsx",
    [
      />\s*AI Lab \/ Dify Assistant\s*</,
      />\s*AI experiments that feel like they are already online\.\s*</,
      />\s*Powered by Dify \/ static demo\s*</,
      />\s*GPT-4o ready\s*</,
      /eyebrow="Capability Grid"/,
      /aria-label="Send demo message"/,
    ],
  ],
  [
    "src/app/[locale]/growth-log/page.tsx",
    [
      />\s*Growth Log \/ Learning Timeline\s*</,
      />\s*A warm Timeline for skills, notes, and useful trails\.\s*</,
      /eyebrow="Timeline"/,
      /title=\{locale === "zh" \? "按月份整理的 Growth Log"/,
    ],
  ],
  [
    "src/app/[locale]/baby-zone/page.tsx",
    [
      />\s*Baby Zone \/ Tiny Garden\s*</,
      />\s*Tiny Garden\s*</,
      />\s*Memory OS\s*</,
      /eyebrow="Milestone Timeline"/,
      /eyebrow="Memory Cards"/,
    ],
  ],
  [
    "src/components/DesignPortfolioGrid.tsx",
    [
      />\s*Presentation\s*</,
      />\s*PDF Portfolio\s*</,
      />\s*Pages\s*</,
      />\s*Date\s*</,
      />\s*Type\s*</,
      />\s*Live Preview\s*</,
      /\{work\.pages\} pages/,
    ],
  ],
];

const localeFiles = ["src/i18n/locales/zh.json", "src/i18n/locales/en.json"];
const requiredLocaleKeys = ["nav", "home", "footer", "common"];

for (const file of requiredPageFiles) {
  const content = read(file);
  if (/Coming Soon|Under Construction/i.test(content)) {
    failures.push(`${file} still contains placeholder copy.`);
  }
}

for (const [file, tokens] of Object.entries(requiredContent)) {
  const content = read(file);
  for (const token of tokens) {
    if (!content.includes(token)) {
      failures.push(`${file} is missing required content token: ${token}`);
    }
  }
}

for (const [file, patterns] of bareEnglishCopyChecks) {
  const content = read(file);
  for (const pattern of patterns) {
    if (pattern.test(content)) {
      failures.push(`${file} still renders bare English copy instead of locale-aware Chinese/English copy: ${pattern}`);
    }
  }
}

const terminalBoot = read("src/components/TerminalBoot.tsx");
const terminalLocalizedChecks = [
  ["useLocale", "TerminalBoot should read the active locale."],
  ["欢迎来到 HT Lab", "TerminalBoot should localize the welcome line for zh."],
  ["编译中", "TerminalBoot should localize the loading line for zh."],
  ["所有系统已上线", "TerminalBoot should localize the final success line for zh."],
];

for (const [token, message] of terminalLocalizedChecks) {
  if (!terminalBoot.includes(token)) {
    failures.push(message);
  }
}

for (const file of localeFiles) {
  const content = read(file);
  const parsed = JSON.parse(content);
  for (const key of requiredLocaleKeys) {
    if (!(key in parsed)) {
      failures.push(`${file} does not appear to include ${key}.`);
    }
  }

  if (!parsed.home?.hero?.titleSuffix || !parsed.home?.hero?.signals?.items?.baby?.name) {
    failures.push(`${file} is missing localized home hero signal copy.`);
  }

  if (!parsed.home?.explore?.cardCta || !parsed.home?.explore?.zoneLabel) {
    failures.push(`${file} is missing localized home card action copy.`);
  }
}

const zhLocale = JSON.parse(read("src/i18n/locales/zh.json"));
if (/All rights reserved|Built with/i.test(zhLocale.footer?.copyright ?? "")) {
  failures.push("zh.json footer copyright should be localized instead of using English legal copy.");
}

const zhEnglishCopyChecks = [
  ["nav.devZone", zhLocale.nav?.devZone],
  ["nav.designZone", zhLocale.nav?.designZone],
  ["nav.growthLog", zhLocale.nav?.growthLog],
  ["nav.babyZone", zhLocale.nav?.babyZone],
  ["home.explore.devTitle", zhLocale.home?.explore?.devTitle],
  ["home.explore.designTitle", zhLocale.home?.explore?.designTitle],
  ["home.explore.growthTitle", zhLocale.home?.explore?.growthTitle],
  ["home.explore.babyTitle", zhLocale.home?.explore?.babyTitle],
];

for (const [label, value] of zhEnglishCopyChecks) {
  if (typeof value !== "string" || /Zone|Growth Log|Design Zone|Dev Zone|Baby Zone/.test(value)) {
    failures.push(`zh.json should localize ${label}; found ${JSON.stringify(value)}.`);
  }
}

const siteContent = read("src/data/siteContent.ts");
if (/date:\s*"soon"/.test(siteContent)) {
  failures.push("Baby milestone dates should be localized so zh pages do not render SOON.");
}

const dataChecks = [
  ["devProjects", 3],
  ["designWorks", 6],
  ["aiCapabilities", 4],
  ["growthEntries", 6],
  ["babyMilestones", 4],
  ["babyMoments", 4],
];

for (const [name, minimum] of dataChecks) {
  const match = siteContent.match(new RegExp(`export const ${name}[\\s\\S]*?= \\[([\\s\\S]*?)\\];`));
  if (!match) {
    failures.push(`src/data/siteContent.ts is missing ${name}.`);
    continue;
  }
  const itemCount = (match[1].match(/title:\s*\{/g) || []).length;
  if (itemCount < minimum) {
    failures.push(`${name} has ${itemCount} items; expected at least ${minimum}.`);
  }
}

if (failures.length > 0) {
  console.error("Full-site validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Full-site validation passed.");
