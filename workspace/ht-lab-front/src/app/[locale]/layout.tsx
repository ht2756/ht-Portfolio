import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/ThemeProvider";
import "maplibre-gl/dist/maplibre-gl.css";
import "@/styles/globals.css";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "HT Lab — 全栈开发 × UI 设计" : "HT Lab — Full-Stack Dev × UI Design",
    description:
      locale === "zh"
        ? "一个探索技术、设计与生活的个人创意实验室，展示全栈开发、UI 设计、AI 实验、成长记录与旅行足迹。"
        : "A creative lab exploring technology, design, and life through full-stack work, visual design, AI experiments, growth records, and travel stories.",
    keywords:
      locale === "zh"
        ? ["HT Lab", "个人官网", "全栈开发", "UI 设计", "AI 实验", "旅行地图"]
        : ["HT Lab", "portfolio", "full-stack", "developer", "UI design", "AI", "travel atlas"],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../i18n/locales/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="noise-overlay">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
