"use client";

import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface SiteShellProps {
  children: React.ReactNode;
  variant?: "default" | "dev" | "design" | "ai" | "growth" | "baby";
}

export default function SiteShell({ children, variant = "default" }: SiteShellProps) {
  return (
    <div className={`site-shell site-shell-${variant} min-h-screen`}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
