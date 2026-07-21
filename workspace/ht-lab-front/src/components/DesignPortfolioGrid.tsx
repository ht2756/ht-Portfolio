"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  X,
} from "lucide-react";
import { localized, type Locale, type PresentationWork } from "@/data/siteContent";

type DesignPortfolioGridProps = {
  works: PresentationWork[];
  locale: Locale;
};

export default function DesignPortfolioGrid({ works, locale }: DesignPortfolioGridProps) {
  const [activeWork, setActiveWork] = useState<PresentationWork | null>(null);
  const dialogTitleId = useId();
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const labels =
    locale === "zh"
      ? {
          coverType: "演示作品",
          pageSuffix: "页",
        }
      : {
          coverType: "Presentation",
          pageSuffix: "pages",
        };

  useEffect(() => {
    if (!activeWork) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveWork(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerButtonRef.current?.focus({ preventScroll: true });
    };
  }, [activeWork]);

  const closePreview = () => setActiveWork(null);

  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {works.map((work, index) => {
          const title = localized(work.title, locale);
          const category = localized(work.category, locale);

          return (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04, duration: 0.42, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={(event) => {
                  triggerButtonRef.current = event.currentTarget;
                  setActiveWork(work);
                }}
                aria-label={
                  locale === "zh" ? `预览 ${title} PDF` : `Preview ${title} PDF`
                }
                className="group block h-full w-full overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-xl shadow-slate-200/60 outline-none transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/70 focus-visible:ring-4 focus-visible:ring-blue-400/25"
              >
                <div className={`relative h-56 bg-gradient-to-br ${work.palette} p-5`}>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    {category}
                  </span>
                  <div className="absolute inset-x-8 bottom-8 rounded-xl border border-white/30 bg-white/18 p-5 text-white shadow-2xl backdrop-blur">
                    <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
                      {labels.coverType}
                    </div>
                    <div className="mt-2 text-xl font-black leading-tight">{title}</div>
                  </div>
                  <span className="absolute bottom-5 right-5 rounded-lg bg-black/25 px-2.5 py-1 text-xs font-bold text-white">
                    {work.pages} {labels.pageSuffix}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-black leading-snug">{title}</h3>
                    <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                      <Maximize2 size={16} />
                    </span>
                  </div>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {localized(work.description, locale)}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                    <span>{work.date}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <FileText size={14} />
                      {category}
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {activeWork && (
          <PdfPreviewDialog
            dialogTitleId={dialogTitleId}
            locale={locale}
            work={activeWork}
            onClose={closePreview}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function PdfPreviewDialog({
  dialogTitleId,
  locale,
  work,
  onClose,
}: {
  dialogTitleId: string;
  locale: Locale;
  work: PresentationWork;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const title = localized(work.title, locale);
  const category = localized(work.category, locale);
  const description = localized(work.description, locale);
  const previewSrc = `${work.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const labels =
    locale === "zh"
      ? {
          portfolio: "PDF 作品集",
          pages: "页数",
          date: "日期",
          type: "类型",
          preview: "实时预览",
        }
      : {
          portfolio: "PDF Portfolio",
          pages: "Pages",
          date: "Date",
          type: "Type",
          preview: "Live Preview",
        };

  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelectors) ?? [],
    ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        onKeyDown={handleDialogKeyDown}
        className="relative flex h-[min(86vh,820px)] w-[min(1180px,calc(100vw-32px))] overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-[0_32px_120px_rgba(15,23,42,0.34)] max-md:h-[calc(100vh-32px)]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={locale === "zh" ? "关闭 PDF 预览" : "Close PDF preview"}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg shadow-slate-900/10 transition hover:bg-slate-950 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/30"
        >
          <X size={18} />
        </button>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[0.72fr_1fr]">
          <aside
            className={`relative flex min-h-0 flex-col justify-between overflow-hidden bg-gradient-to-br ${work.palette} p-7 text-white md:p-9`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24),transparent_42%),linear-gradient(180deg,transparent,rgba(15,23,42,0.26))]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/18 px-3 py-1.5 text-xs font-bold backdrop-blur">
                <FileText size={14} />
                {labels.portfolio}
              </span>
              <h2 id={dialogTitleId} className="mt-6 text-3xl font-black leading-tight md:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/82 md:text-base">
                {description}
              </p>
            </div>

            <div className="relative mt-8 grid grid-cols-3 gap-3 text-white">
              <div className="rounded-2xl border border-white/24 bg-white/16 p-4 backdrop-blur">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                  {labels.pages}
                </div>
                <div className="mt-2 text-2xl font-black">{work.pages}</div>
              </div>
              <div className="rounded-2xl border border-white/24 bg-white/16 p-4 backdrop-blur">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                  {labels.date}
                </div>
                <div className="mt-2 text-xl font-black">{work.date}</div>
              </div>
              <div className="rounded-2xl border border-white/24 bg-white/16 p-4 backdrop-blur">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                  {labels.type}
                </div>
                <div className="mt-2 truncate text-sm font-black">{category}</div>
              </div>
            </div>
          </aside>

          <section className="flex min-h-0 flex-col bg-slate-50">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white/82 px-5 py-4 backdrop-blur md:px-6">
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {labels.preview}
                </div>
                <div className="truncate text-sm font-black text-slate-950">{title}.pdf</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={work.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/25"
                  aria-label={locale === "zh" ? "新窗口打开 PDF" : "Open PDF in a new tab"}
                >
                  <ExternalLink size={17} />
                </a>
                <a
                  href={work.pdfUrl}
                  download
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/25"
                  aria-label={locale === "zh" ? "下载 PDF" : "Download PDF"}
                >
                  <Download size={17} />
                </a>
              </div>
            </div>

            <div className="min-h-0 flex-1 p-3 md:p-5">
              <div className="h-full overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-inner shadow-slate-200">
                <iframe
                  title={locale === "zh" ? `${title} PDF 预览` : `${title} PDF preview`}
                  src={previewSrc}
                  className="h-full w-full bg-white"
                  loading="lazy"
                  tabIndex={-1}
                />
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
