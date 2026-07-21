"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalBootProps {
  onComplete: () => void;
}

type TerminalLineType = "welcome" | "divider" | "empty" | "command" | "loading" | "success";

type TerminalLine = {
  text: string;
  type: TerminalLineType;
};

function getTerminalCopy(locale: string) {
  const isZh = locale === "zh";

  return {
    loadingText: isZh ? "编译中..." : "Compiling...",
    compiledText: isZh ? "✓ 编译完成" : "✓ Compiled successfully",
    lines: [
      { text: isZh ? "欢迎来到 HT Lab" : "Welcome to HT Lab", type: "welcome" },
      { text: "─────────────────────────", type: "divider" },
      { text: "", type: "empty" },
      { text: "➜  ~/ht-lab  npm run dev", type: "command" },
      { text: isZh ? "⠋ 编译中..." : "⠋ Compiling...", type: "loading" },
      { text: isZh ? "✓ 已就绪 http://localhost:3000" : "✓ Ready on http://localhost:3000", type: "success" },
      { text: isZh ? "✓ 所有系统已上线" : "✓ All systems online", type: "success" },
    ] satisfies TerminalLine[],
  };
}

export default function TerminalBoot({ onComplete }: TerminalBootProps) {
  const locale = useLocale();
  const terminalCopy = useMemo(() => getTerminalCopy(locale), [locale]);
  const terminalLines = terminalCopy.lines;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showTerminal, setShowTerminal] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (currentLineIndex >= terminalLines.length) {
      setIsDone(true);
      timeouts.push(setTimeout(() => setShowTerminal(false), 600));
      timeouts.push(setTimeout(() => onComplete(), 1000));
      return () => timeouts.forEach(clearTimeout);
    }

    const line = terminalLines[currentLineIndex];

    // Empty line - just skip
    if (line.type === "empty") {
      setCompletedLines(prev => [...prev, ""]);
      setCurrentLineIndex(prev => prev + 1);
      return;
    }

    // Divider - instant display
    if (line.type === "divider") {
      setCompletedLines(prev => [...prev, line.text]);
      setCurrentLineIndex(prev => prev + 1);
      return;
    }

    // Loading line - show spinner then complete
    if (line.type === "loading") {
      const spinFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
      let frameIndex = 0;
      
      const spinInterval = setInterval(() => {
        frameIndex++;
        if (frameIndex >= spinFrames.length) {
          clearInterval(spinInterval);
          setCompletedLines(prev => [...prev, terminalCopy.compiledText]);
          setCurrentLineIndex(prev => prev + 1);
        } else {
          setCurrentText(`${spinFrames[frameIndex]} ${terminalCopy.loadingText}`);
        }
      }, 80);

      setCurrentText(`${spinFrames[0]} ${terminalCopy.loadingText}`);
      
      return () => clearInterval(spinInterval);
    }

    // Welcome, command, success - type character by character
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      const text = line.text.substring(0, charIndex);
      setCurrentText(text);

      if (charIndex >= line.text.length) {
        clearInterval(typeInterval);
        // Small delay before moving to next line
        timeouts.push(setTimeout(() => {
          setCompletedLines(prev => [...prev, line.text]);
          setCurrentText("");
          setCurrentLineIndex(prev => prev + 1);
        }, 300));
      }
    }, line.type === "command" ? 40 : 30);

    return () => {
      clearInterval(typeInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [currentLineIndex, onComplete, terminalCopy.compiledText, terminalCopy.loadingText, terminalLines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "welcome": return "#60a5fa";
      case "command": return "#34d399";
      case "success": return "#34d399";
      case "loading": return "#f59e0b";
      default: return "#9ca3af";
    }
  };

  return (
    <AnimatePresence>
      {showTerminal && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: "#0a0a0a" }}
        >
          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[600px] mx-6 rounded-lg overflow-hidden"
            style={{
              backgroundColor: "#1a1a2e",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center h-10 px-4"
              style={{ backgroundColor: "#16162a" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs" style={{ color: "#6b7280" }}>
                  HT Lab
                </span>
              </div>
              <div className="w-16" />
            </div>

            {/* Terminal content */}
            <div
              className="min-h-[280px] overflow-x-auto whitespace-pre p-5 font-mono text-[12px] leading-[1.8] sm:p-6 sm:text-[14px]"
              style={{
                backgroundColor: "#0f0f1a",
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              }}
            >
              {/* Completed lines */}
              {completedLines.map((text, index) => {
                const lineType = terminalLines[index]?.type || "output";
                return (
                  <div
                    key={index}
                    style={{ color: getLineColor(lineType) }}
                  >
                    {text}
                  </div>
                );
              })}

              {/* Current typing line */}
              {currentLineIndex < terminalLines.length && (
                <div style={{ color: getLineColor(terminalLines[currentLineIndex].type) }}>
                  {currentText}
                  {/* Single blinking cursor */}
                  <span
                    className="inline-block w-[7px] h-[15px] ml-[2px] align-middle"
                    style={{
                      backgroundColor: getLineColor(terminalLines[currentLineIndex].type),
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                </div>
              )}

              {/* Final cursor when done */}
              {isDone && (
                <div className="mt-2">
                  <span
                    className="inline-block w-[7px] h-[15px]"
                    style={{
                      backgroundColor: "#34d399",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Blink animation */}
          <style jsx>{`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
