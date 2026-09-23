"use client";

import React, { useState } from "react";
import NetworkBackground from "./NetworkBackground";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("pip install codetrace-ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero" id="hero">
      <NetworkBackground />
      <div className="hero-glow-sphere" />

      {/* Release Badge */}
      <a
        href="https://pypi.org/project/codetrace-ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-badge-container reveal-on-scroll"
      >
        <span className="hero-badge-pill">v1.0.3</span>
        <span className="hero-badge-text">
          Hardware-aware Ollama · stdio MCP server · any LLM endpoint
        </span>
        <span className="hero-badge-arrow">→</span>
      </a>

      {/* Main Bold Gradient Headline */}
      <h1 className="hero-title reveal-on-scroll delay-100">
        The Governed Code Intelligence Layer for{" "}
        <span className="hero-title-gradient">AI Agents & Engineers</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle reveal-on-scroll delay-200">
        CodeTrace AI turns your repository into a deterministic call graph and makes the agent prove every claim — verified blast radius and exact <code>file:line</code> citations before any edit. Parsing, embeddings and the graph <strong>run on your machine</strong>; bring any LLM, or pair it with Ollama and nothing leaves it at all.
      </p>

      {/* CTAs */}
      <div className="hero-ctas reveal-on-scroll delay-300">
        <button className="hero-copy-cmd" onClick={handleCopy} title="Click to copy command">
          <span style={{ color: "var(--text-tertiary)" }}>$</span>
          <span>pip install codetrace-ai</span>
          <span style={{ fontSize: "12px", marginLeft: "4px", color: copied ? "var(--accent-green)" : "var(--text-tertiary)" }}>
            {copied ? "✓ Copied!" : "📋"}
          </span>
        </button>

        <a href="#protocol" className="btn-primary">
          Explore Governed Protocol <span>→</span>
        </a>

        <a
          href="https://github.com/Viraj465/CodeTrace-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View GitHub
        </a>

        <a
          href="https://youtu.be/2RbFVw-wfgE"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <span>▶ Watch Demo (Video)</span>
        </a>
      </div>

      {/* Trust & Architecture Strip */}
      <div className="hero-trust-bar reveal-on-scroll delay-400">
        <div className="hero-trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Evidence Graded Protocol</span>
        </div>
        <div className="hero-trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span>Runtime Blast Radius</span>
        </div>
        <div className="hero-trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>21 Languages</span>
        </div>
        <div className="hero-trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Local-First · Air-Gap Ready</span>
        </div>
        <div className="hero-trust-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>Claude Code · Cursor · VS Code MCP</span>
        </div>
      </div>

      {/* Hero Visual Showcase - Live CLI Capture */}
      <div className="reveal-on-scroll delay-500" style={{ marginTop: "60px", width: "100%", maxWidth: "1050px", position: "relative" }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "120%",
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.08), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/demo.gif"
            alt="Real CodeTrace session: indexing pallets/itsdangerous, then answering 'What breaks if I change Signer.get_signature?' with a local qwen3.5:4b model on a 6 GB laptop GPU"
            width={968}
            height={829}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              boxShadow: "0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 60px rgba(56, 189, 248, 0.2)",
              display: "block",
            }}
            loading="eager"
          />
          <p className="hero-demo-caption">
            Real session · shown at 2× speed · <code>qwen3.5:4b</code> via Ollama on a 6 GB laptop GPU · nothing left the machine
          </p>
        </div>
      </div>
    </section>
  );
}
