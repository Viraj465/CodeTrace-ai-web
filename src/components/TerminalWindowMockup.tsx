"use client";

import React, { useState, useEffect } from "react";

interface FloatingBadge {
  text: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  theme?: "cyan" | "green" | "purple";
  icon?: string;
}

interface TerminalWindowProps {
  src: string;
  alt: string;
  title?: string;
  badgeText?: string;
  floatingBadges?: FloatingBadge[];
  caption?: string;
}

export default function TerminalWindowMockup({
  src,
  alt,
  title = "VS Code Terminal · CodeTrace AI",
  badgeText,
  floatingBadges = [],
  caption,
}: TerminalWindowProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomed) handleClose();
    };
    if (isZoomed) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isZoomed]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsZoomed(false);
      setIsClosing(false);
    }, 140); // slightly shorter than 0.15s animation to ensure it clears
  };

  return (
    <>
      <div className="terminal-window-container">
        <div className="terminal-window-mockup">
          {/* Title Bar */}
          <div className="terminal-window-titlebar">
            <div className="terminal-window-dots">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
            </div>

            <div className="terminal-window-title">
              <span>💻</span>
              <span>{title}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {badgeText && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 10px",
                    background: "rgba(56, 189, 248, 0.12)",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    color: "var(--accent-cyan)",
                    borderRadius: "9999px",
                  }}
                >
                  {badgeText}
                </span>
              )}
              <button
                onClick={() => setIsZoomed(true)}
                title="Click to Zoom Fullscreen"
                style={{
                  fontSize: "12px",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.2s ease",
                }}
              >
                🔍 Expand
              </button>
            </div>
          </div>

          {/* Window Body with Image & Floating Badges */}
          <div className="terminal-window-body">
            {floatingBadges.map((badge, idx) => (
              <div
                key={idx}
                className={`floating-callout-badge ${badge.theme || "cyan"}`}
                style={{
                  top: badge.top,
                  bottom: badge.bottom,
                  left: badge.left,
                  right: badge.right,
                  animationDelay: `${idx * 0.6}s`,
                }}
              >
                <div className="badge-pulse-dot" />
                <span>{badge.icon || "●"}</span>
                <span>{badge.text}</span>
              </div>
            ))}

            <div className="terminal-img-wrapper" onClick={() => setIsZoomed(true)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} loading="lazy" />
            </div>
          </div>

          {caption && (
            <div
              style={{
                padding: "10px 18px",
                background: "rgba(11, 16, 24, 0.9)",
                borderTop: "1px solid var(--border-primary)",
                fontSize: "12px",
                color: "var(--text-secondary)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{caption}</span>
              <span
                style={{ color: "var(--accent-cyan)", cursor: "pointer", fontWeight: 600 }}
                onClick={() => setIsZoomed(true)}
              >
                Click image to zoom ↗
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal on Click */}
      {isZoomed && (
        <div className={`lightbox-overlay ${isClosing ? "closing" : ""}`} onClick={handleClose}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "16px", fontWeight: 700 }}>{title}</span>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>({alt})</span>
              </div>
              <button className="lightbox-close-btn" onClick={handleClose}>
                ✕ Close (ESC)
              </button>
            </div>

            <div className="lightbox-img-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
