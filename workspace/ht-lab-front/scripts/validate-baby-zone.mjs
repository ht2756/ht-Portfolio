import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const read = (file) => readFileSync(join(root, file), "utf8");

const requiredFiles = [
  "src/app/[locale]/baby-zone/page.tsx",
  "src/data/siteContent.ts",
  "src/components/Navigation.tsx",
  "src/components/SectionsPreview.tsx",
  "src/components/Footer.tsx",
  "src/components/SiteShell.tsx",
  "src/styles/globals.css",
  "src/i18n/locales/zh.json",
  "src/i18n/locales/en.json",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

if (failures.length === 0) {
  const nav = read("src/components/Navigation.tsx");
  const footer = read("src/components/Footer.tsx");
  const sections = read("src/components/SectionsPreview.tsx");
  const shell = read("src/components/SiteShell.tsx");
  const styles = read("src/styles/globals.css");
  const data = read("src/data/siteContent.ts");
  const babyPage = read("src/app/[locale]/baby-zone/page.tsx");
  const zh = JSON.parse(read("src/i18n/locales/zh.json"));
  const en = JSON.parse(read("src/i18n/locales/en.json"));

  const contentChecks = [
    [nav, "/baby-zone", "Navigation does not link to Baby Zone."],
    [footer, "/baby-zone", "Footer does not link to Baby Zone."],
    [sections, "babyTitle", "SectionsPreview does not include Baby Zone title copy."],
    [sections, "Baby", "SectionsPreview does not use the Baby icon."],
    [shell, '"baby"', "SiteShell does not allow the baby visual variant."],
    [styles, ".site-shell-baby", "Global styles do not define the baby shell theme."],
    [data, "babyMilestones", "siteContent is missing babyMilestones."],
    [data, "babyMoments", "siteContent is missing babyMoments."],
    [data, "babyFavorites", "siteContent is missing babyFavorites."],
    [data, "babyStats", "siteContent is missing babyStats."],
    [babyPage, "宝宝空间 / 小小花园", "Baby Zone page is missing localized Chinese hero identity."],
    [babyPage, "babyMilestones", "Baby Zone page does not render milestone data."],
    [babyPage, "babyMoments", "Baby Zone page does not render memory cards."],
    [babyPage, "babyFavorites", "Baby Zone page does not render favorites."],
  ];

  for (const [content, token, message] of contentChecks) {
    if (!content.includes(token)) failures.push(message);
  }

  const localeChecks = [
    [zh.nav?.babyZone, "宝宝", "zh nav.babyZone is missing localized baby copy."],
    [en.nav?.babyZone, "Baby Zone", "en nav.babyZone is missing."],
    [zh.home?.explore?.babyTitle, "宝宝", "zh home.explore.babyTitle is missing localized baby copy."],
    [en.home?.explore?.babyTitle, "Baby Zone", "en home.explore.babyTitle is missing."],
    [zh.home?.explore?.babyDesc, "宝宝", "zh home.explore.babyDesc should describe the baby area."],
    [en.home?.explore?.babyDesc, "baby", "en home.explore.babyDesc should describe the baby area."],
  ];

  for (const [value, token, message] of localeChecks) {
    if (typeof value !== "string" || !value.includes(token)) failures.push(message);
  }
}

if (failures.length > 0) {
  console.error("Baby Zone validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Baby Zone validation passed.");
