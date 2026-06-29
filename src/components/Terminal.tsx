"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalLine {
  type: "command" | "check" | "info" | "output" | "empty" | "stats";
  text: string;
  delay: number;
}

const lines: TerminalLine[] = [
  { type: "command", text: "$ codetrace analyze .", delay: 0 },
  { type: "check", text: "✓ Scanning repository...", delay: 600 },
  { type: "check", text: "✓ Parsing source files...", delay: 1200 },
  { type: "check", text: "✓ Building AST...", delay: 1800 },
  { type: "check", text: "✓ Generating call graph...", delay: 2400 },
  { type: "check", text: "✓ Computing embeddings...", delay: 3000 },
  { type: "check", text: "✓ Building knowledge graph...", delay: 3600 },
  { type: "empty", text: "", delay: 4000 },
  {
    type: "info",
    text: "Analysis complete — ready to query.",
    delay: 4200,
  },
  { type: "empty", text: "", delay: 4400 },
  {
    type: "stats",
    text: "142 files   •   38 modules   •   1,247 functions   •   4,891 edges",
    delay: 4600,
  },
];

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          lines.forEach((line, index) => {
            setTimeout(() => {
              setVisibleCount((prev) => prev + 1);
            }, line.delay);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderLine = (line: TerminalLine, index: number) => {
    if (index >= visibleCount) return null;

    switch (line.type) {
      case "command":
        return (
          <div key={index} className="terminal-line terminal-line-visible">
            <span className="terminal-command">{line.text}</span>
          </div>
        );
      case "check":
        return (
          <div key={index} className="terminal-line terminal-line-visible">
            <span className="terminal-check">✓</span>
            <span className="terminal-output">
              {line.text.replace("✓ ", "")}
            </span>
          </div>
        );
      case "info":
        return (
          <div key={index} className="terminal-line terminal-line-visible">
            <span className="terminal-info">{line.text}</span>
          </div>
        );
      case "stats":
        return (
          <div
            key={index}
            className="terminal-line terminal-line-visible"
            style={{ marginTop: "4px" }}
          >
            <span className="terminal-stat-label">{line.text}</span>
          </div>
        );
      case "empty":
        return (
          <div
            key={index}
            className="terminal-line terminal-line-visible"
            style={{ height: "12px" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="terminal-wrapper" ref={containerRef}>
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
          <div className="terminal-title">~/projects/codetrace · zsh</div>
        </div>
        <div className="terminal-body">
          {lines.map((line, i) => renderLine(line, i))}
          {visibleCount > 0 && visibleCount < lines.length && (
            <span className="terminal-cursor" />
          )}
        </div>
      </div>
    </div>
  );
}
