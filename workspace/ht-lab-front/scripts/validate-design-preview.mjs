import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const read = (file) => readFileSync(join(root, file), "utf8");

const siteContent = read("src/data/siteContent.ts");
const pdfUrlMatches = [...siteContent.matchAll(/pdfUrl:\s*"([^"]+)"/g)];

if (pdfUrlMatches.length < 6) {
  failures.push(`Expected every design work to define a pdfUrl, found ${pdfUrlMatches.length}.`);
}

for (const [, pdfUrl] of pdfUrlMatches) {
  if (!pdfUrl.startsWith("/design-pdfs/")) {
    failures.push(`PDF preview should use local /design-pdfs assets, found ${pdfUrl}.`);
    continue;
  }

  const publicPath = join(root, "public", pdfUrl);
  if (!existsSync(publicPath)) {
    failures.push(`Missing PDF preview asset: public${pdfUrl}.`);
  }
}

const pageContent = read("src/app/[locale]/design-zone/page.tsx");
if (!pageContent.includes("DesignPortfolioGrid")) {
  failures.push("Design Zone page should render the DesignPortfolioGrid client component.");
}

const generatorContent = read("scripts/create-design-preview-pdfs.py");
const englishPdfPlaceholderCopy = [
  "DESIGN PREVIEW",
  "Click preview modal from Design Zone",
  "PDF PREVIEW",
  "A compact PDF placeholder",
  "The modal keeps the deck visible",
  "Swap in the final client deck",
];

for (const token of englishPdfPlaceholderCopy) {
  if (generatorContent.includes(token)) {
    failures.push(`PDF preview generator should not render English placeholder copy: ${token}`);
  }
}

if (!generatorContent.includes("设计预览") || !generatorContent.includes("PDF 预览")) {
  failures.push("PDF preview generator should contain localized Chinese preview labels.");
}

const componentPath = "src/components/DesignPortfolioGrid.tsx";
if (!existsSync(join(root, componentPath))) {
  failures.push(`${componentPath} is missing.`);
} else {
  const componentContent = read(componentPath);
  const componentChecks = [
    ['"use client"', "DesignPortfolioGrid must be a client component."],
    ["AnimatePresence", "Preview dialog should animate in and out."],
    ['role="dialog"', "Preview must expose dialog semantics."],
    ['aria-modal="true"', "Preview dialog must be marked modal."],
    ["<iframe", "Preview dialog should embed the PDF."],
    ["Escape", "Preview dialog should close on Escape."],
    ["focusableSelectors", "Preview dialog should define focusable elements for keyboard trapping."],
    ["querySelectorAll<HTMLElement>(focusableSelectors)", "Preview dialog should resolve its focusable controls."],
    ["event.preventDefault()", "Preview dialog should prevent focus from leaving at loop boundaries."],
    ["firstElement.focus()", "Preview dialog should wrap forward focus to the first control."],
    ["lastElement.focus()", "Preview dialog should wrap reverse focus to the last control."],
    ["onKeyDown={handleDialogKeyDown}", "Preview dialog should bind its keyboard focus handler."],
    ["closeButtonRef.current?.focus", "Preview dialog should focus the close button on open."],
    ["triggerButtonRef.current?.focus", "Preview dialog should restore focus to the preview trigger on close."],
    ["z-[1100]", "Preview dialog should sit above the global navigation layer."],
  ];

  for (const [token, message] of componentChecks) {
    if (!componentContent.includes(token)) {
      failures.push(message);
    }
  }

  if (
    !componentContent.includes('event.key === "Tab"') &&
    !componentContent.includes('event.key !== "Tab"')
  ) {
    failures.push("Preview dialog should trap Tab focus while open.");
  }

  const focusableSelectorBlock =
    componentContent.match(/const focusableSelectors = \[([\s\S]*?)\]\.join/)?.[1] ?? "";
  if (focusableSelectorBlock.includes('"iframe"')) {
    failures.push("Embedded PDF iframe should not be part of the modal Tab loop.");
  }

  if (!componentContent.includes("tabIndex={-1}")) {
    failures.push("Embedded PDF iframe should be removed from the modal Tab order.");
  }
}

if (failures.length > 0) {
  console.error("Design preview validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Design preview validation passed.");
