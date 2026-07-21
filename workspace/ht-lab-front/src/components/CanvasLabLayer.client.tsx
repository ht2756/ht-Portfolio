"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Application, DestroyOptions, RendererDestroyOptions } from "pixi.js";

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

type IdleCallbacks = {
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
  const appRef = useRef<Application | null>(null);
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
    const cleanupHost = hostRef.current;

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

        if (disposed || !hostRef.current) {
          app.destroy(
            { removeView: true } satisfies RendererDestroyOptions,
            { children: true, texture: true, textureSource: true, context: true } satisfies DestroyOptions,
          );
          return;
        }

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
          field.circle(
            app.screen.width * 0.7,
            app.screen.height * 0.34,
            Math.min(app.screen.width, app.screen.height) * 0.34,
          );
          field.fill({ color, alpha: 0.08 });
          field.circle(
            app.screen.width * 0.32,
            app.screen.height * 0.7,
            Math.min(app.screen.width, app.screen.height) * 0.2,
          );
          field.fill({ color: 0xa78bfa, alpha: 0.05 });
        };

        let lastFieldAccent = activeZoneRef.current?.accent ?? "#7dd3fc";
        drawField(lastFieldAccent);

        let lastFrame = 0;
        app.ticker.add((ticker) => {
          const now = performance.now();
          if (now - lastFrame < 1000 / TARGET_FPS) return;
          lastFrame = now;

          frameRef.current += ticker.deltaTime;
          const active = activeZoneRef.current;
          const nextAccent = active?.accent ?? "#7dd3fc";
          if (nextAccent !== lastFieldAccent) {
            lastFieldAccent = nextAccent;
            drawField(nextAccent);
          }

          particles.forEach((particle, index) => {
            const pulse = Math.sin(frameRef.current * particle.speed + particle.phase);
            particle.graphic.x = particle.baseX + pulse * 8;
            particle.graphic.y =
              particle.baseY + Math.cos(frameRef.current * particle.speed + particle.phase) * 6;
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
        resizeObserver = new ResizeObserver(() => drawField(lastFieldAccent));
        resizeObserver.observe(host);
        setIsMounted(true);
      } catch {
        if (cleanupHost) {
          cleanupHost.replaceChildren();
        }
      }
    }

    const idleCallbacks = window as unknown as IdleCallbacks;
    const idle = idleCallbacks.requestIdleCallback
      ? idleCallbacks.requestIdleCallback(() => void start(), { timeout: 1800 })
      : window.setTimeout(() => void start(), 500);

    return () => {
      disposed = true;
      setIsMounted(false);
      if (idleCallbacks.requestIdleCallback && idleCallbacks.cancelIdleCallback) {
        idleCallbacks.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
      if (visibilityHandler) {
        document.removeEventListener("visibilitychange", visibilityHandler);
      }
      resizeObserver?.disconnect();
      appRef.current?.destroy(
        { removeView: true } satisfies RendererDestroyOptions,
        { children: true, texture: true, textureSource: true, context: true } satisfies DestroyOptions,
      );
      appRef.current = null;
      cleanupHost?.replaceChildren();
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
