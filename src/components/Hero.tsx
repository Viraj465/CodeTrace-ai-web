"use client";

import React, { useState, useEffect, useRef } from "react";
import NetworkBackground from "./NetworkBackground";

const typingLines = [
  { text: "Understand Any Codebase.", isGradient: false },
  { text: "Trace Execution.", isGradient: false },
  { text: "Ship with Confidence.", isGradient: true },
];

export default function Hero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= typingLines.length) {
      setTypingDone(true);
      return;
    }

    const line = typingLines[currentLine].text;

    if (currentChar <= line.length) {
      intervalRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar);
          return updated;
        });
        setCurrentChar((prev) => prev + 1);
      }, 45); // typing speed
    } else {
      // Line complete, pause then move to next
      intervalRef.current = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, 300);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [currentLine, currentChar]);

  return (
    <section className="hero" id="hero">
      <NetworkBackground />

      {/* PyPI Badge */}
      <a
        href="https://pypi.org/project/codetrace-ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-badge"
        style={{ position: "relative", zIndex: 1 }}
      >
        <span className="hero-badge-sparkle">✨</span>
        <span className="hero-badge-version">v1.0 available on PyPI</span>
        <span className="hero-badge-pip">· pip install codetrace-ai</span>
        <span className="hero-badge-arrow">→</span>
      </a>

      {/* Title with typing effect */}
      <h1 className="hero-title" style={{ position: "relative", zIndex: 1 }}>
        {typingLines.map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line.isGradient ? (
              <span className="hero-title-gradient">
                {displayedLines[i] || ""}
                {currentLine === i && !typingDone && (
                  <span
                    className="typing-cursor"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    |
                  </span>
                )}
              </span>
            ) : (
              <span>
                {displayedLines[i] || ""}
                {currentLine === i && !typingDone && (
                  <span
                    className="typing-cursor"
                    style={{ opacity: showCursor ? 1 : 0 }}
                  >
                    |
                  </span>
                )}
              </span>
            )}
          </React.Fragment>
        ))}
        {typingDone && (
          <span
            className="typing-cursor"
            style={{ opacity: showCursor ? 1 : 0 }}
          >
            |
          </span>
        )}
      </h1>

      {/* Subtitle */}
      <p
        className="hero-subtitle"
        style={{
          position: "relative",
          zIndex: 1,
          opacity: typingDone ? 1 : 0,
          transform: typingDone ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        CodeTrace-AI is an autonomous engineering intelligence platform that
        understands entire repositories through structural analysis, semantic
        search, dependency mapping, call graphs, and AI reasoning—so you grok
        unfamiliar code in minutes, not days.
      </p>

      {/* CTA Buttons */}
      <div
        className="hero-ctas"
        style={{
          position: "relative",
          zIndex: 1,
          opacity: typingDone ? 1 : 0,
          transform: typingDone ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
        <a href="#pricing" className="btn-primary">
          Start Free <span>→</span>
        </a>
        <a
          href="https://github.com/Viraj465/CodeTrace-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View GitHub
        </a>
      </div>
    </section>
  );
}
