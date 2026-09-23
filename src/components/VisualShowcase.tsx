"use client";

import React, { useState } from "react";
import TerminalWindowMockup from "./TerminalWindowMockup";

const showcaseItems = [
  {
    id: "chat",
    tabLabel: "🧠 AI Architect Chat",
    commandSnippet: "codetrace chat",
    title: "Autonomous AI Architect Session (`codetrace chat`)",
    description:
      "CodeTrace AI boots in your terminal or IDE with automatic hardware resource detection (CPU cores, RAM, GPU context window), persistent session management, and governed evidence reasoning.",
    src: "/images/chatcmd.png",
    alt: "CodeTrace Chat AI Architect Terminal Session",
    badgeText: "Hardware Aware",
    floatingBadges: [
      { text: "16 CPU Cores & RAM Auto-Detected", top: "20%", left: "5%", theme: "cyan" as const, icon: "⚡" },
      { text: "Session e6035c08 Persisted", bottom: "25%", right: "8%", theme: "green" as const, icon: "💾" },
    ],
    features: [
      "Hardware-aware context auto-detection (RAM + CPU / GPU VRAM)",
      "Zero cloud egress — runs entirely inside your local sandbox",
      "Session history persistence across terminal restarts",
      "Evidence-governed verification on every structural response",
    ],
  },
  {
    id: "reconfig",
    tabLabel: "⚙️ Provider & Brain Setup",
    commandSnippet: "codetrace config",
    title: "Interactive AI Brain Reconfiguration (`codetrace config`)",
    description:
      "Reconfigure your LLM brain on the fly. Switch between Anthropic, Gemini, Groq, OpenAI, Ollama, OpenRouter, or Custom with automated API authentication and model validation.",
    src: "/images/model.jpeg",
    alt: "CodeTrace Reconfigure AI Brain CLI Setup",
    badgeText: "6 Native + Custom",
    floatingBadges: [
      { text: "Fetching Available Models Live...", top: "30%", right: "10%", theme: "purple" as const, icon: "🌐" },
      { text: "37 Models Across 6 Families", bottom: "18%", left: "6%", theme: "cyan" as const, icon: "🧠" },
    ],
    features: [
      "Interactive wizard with smart defaults for any endpoint",
      "Automatic API key masking and local ~/.codetrace persistence",
      "Live model list querying directly from the provider API",
      "Fast fallback provider switching on rate limits",
    ],
  },
  {
    id: "models",
    tabLabel: "🔍 Dynamic Model Discovery",
    commandSnippet: "codetrace config (Option 3a)",
    title: "Real-Time Dynamic Model Enumeration",
    description:
      "Never guess model identifiers again. CodeTrace dynamically queries your provider or custom gateway and enumerates all available models for 1-click selection.",
    src: "/images/provider-model-list.png",
    alt: "CodeTrace Dynamic Provider Model List",
    badgeText: "Live API Discovery",
    floatingBadges: [
      { text: "37 Models Discovered Live", top: "15%", right: "6%", theme: "green" as const, icon: "✓" },
      { text: "Gemini 2.5 / 3.0 / 3.7 & Custom", bottom: "20%", left: "6%", theme: "cyan" as const, icon: "✨" },
    ],
    features: [
      "Dynamic model enumeration across frontier and local series",
      "Numbered selection (e.g. 1-37) or custom model input",
      "Zero hardcoded model registries — always up-to-date",
      "Auto-detects context limits and context windows",
    ],
  },
  {
    id: "mcp",
    tabLabel: "🔌 Instant MCP Sync",
    commandSnippet: "codetrace register-mcp .",
    title: "1-Click IDE Auto-Registration (`codetrace register-mcp .`)",
    description:
      "Automatically discovers and registers the Model Context Protocol server inside Cursor, Claude Code, and VS Code workspaces with correct Python interpreters.",
    src: "/images/mcpcmd.png",
    alt: "CodeTrace MCP Auto Registration CLI",
    badgeText: "Cursor & Claude Code",
    floatingBadges: [
      { text: "✓ Cursor ~/.cursor/mcp.json Registered", top: "25%", left: "8%", theme: "green" as const, icon: "✓" },
      { text: "✓ Claude Code ~/.claude/mcp.json Registered", bottom: "35%", right: "8%", theme: "cyan" as const, icon: "✓" },
    ],
    features: [
      "Auto-writes ~/.cursor/mcp.json and ~/.claude/mcp.json",
      "Resolves current virtualenv interpreter automatically",
      "Exposes all 7 tools instantly to in-editor AI assistants",
      "Zero manual JSON configuration required",
    ],
  },
  {
    id: "custom",
    tabLabel: "🛠️ Universal Endpoint",
    commandSnippet: "codetrace config --custom",
    title: "Universal Custom Endpoint Gateway Support",
    description:
      "Connect to enterprise Nvidia NIM, DeepSeek, self-hosted vLLM, LM Studio, or local corporate proxies with customized base URLs and API styles.",
    src: "/images/configcmd.png",
    alt: "CodeTrace Custom Endpoint Configuration CLI",
    badgeText: "OpenAI & Anthropic APIs",
    floatingBadges: [
      { text: "Nvidia NIM Endpoint Configured", top: "25%", right: "8%", theme: "purple" as const, icon: "🚀" },
      { text: "Context Window Auto-Detect / Fallback", bottom: "25%", left: "6%", theme: "cyan" as const, icon: "⚡" },
    ],
    features: [
      "Full compatibility with OpenAI and Anthropic API styles",
      "Custom base URLs (e.g. https://integrate.api.nvidia.com/v1)",
      "Auto-detects context window and fallback limits",
      "Self-hosted vLLM & Ollama local support",
    ],
  },
  {
    id: "help",
    tabLabel: "📖 Full CLI Manual",
    commandSnippet: "codetrace --help",
    title: "Complete CLI Command Suite (`codetrace --help`)",
    description:
      "Comprehensive command-line tool suite covering chat, initialization, MCP registration, codebase indexing, context tuning, HTML architecture visualization, and history export.",
    src: "/images/helpcmd.png",
    alt: "CodeTrace Full Help and Options CLI Manual",
    badgeText: "CLI Manual",
    floatingBadges: [
      { text: "12 Built-in CLI Commands", top: "25%", right: "8%", theme: "cyan" as const, icon: "⚙️" },
      { text: "Rich Shell Help Output", bottom: "30%", left: "8%", theme: "green" as const, icon: "📖" },
    ],
    features: [
      "12 dedicated CLI commands for every engineering workflow",
      "Interactive flags for offline, fast embedding, and context sizing",
      "Built-in export to Markdown for automated compliance audits",
      "Colored terminal output with rich table formatting",
    ],
  },
];

export default function VisualShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = showcaseItems[activeTab];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="features-section" id="gallery" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Neon Spotlight Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.08), rgba(139, 92, 246, 0.05), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Interactive Product Tour</div>
          <h2 className="section-heading section-heading-gradient">
            Interactive CLI Command Center
          </h2>
          <p className="section-subheading mx-auto">
            Explore CodeTrace AI&apos;s real developer terminal interface, hardware detection, dynamic model discovery, and IDE integration live.
          </p>
        </div>

        {/* Interactive Glassmorphic Tour Tabs */}
        <div
          className="reveal-on-scroll"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "40px",
            marginBottom: "40px",
            background: "rgba(11, 17, 26, 0.6)",
            padding: "8px",
            borderRadius: "var(--radius-full)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px)",
            maxWidth: "1000px",
            margin: "40px auto 44px",
          }}
        >
          {showcaseItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                fontSize: "13.5px",
                fontWeight: 600,
                borderRadius: "var(--radius-full)",
                border: "none",
                background: activeTab === idx ? "linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(139, 92, 246, 0.25))" : "transparent",
                color: activeTab === idx ? "#FFFFFF" : "var(--text-secondary)",
                boxShadow: activeTab === idx ? "0 4px 20px rgba(56, 189, 248, 0.3), inset 0 0 0 1px rgba(56, 189, 248, 0.5)" : "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span>{item.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Active Command Center Split Showcase Box */}
        <div
          className="reveal-on-scroll"
          style={{
            background: "rgba(11, 16, 26, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "24px",
            padding: "36px",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.25fr",
              gap: "40px",
              alignItems: "center",
            }}
            className="showcase-split-grid"
          >
            {/* Left Column: Details & Controls */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    background: "rgba(56, 189, 248, 0.12)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    color: "var(--accent-cyan)",
                  }}
                >
                  {current.badgeText}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Capture #{activeTab + 1} of 6</span>
              </div>

              <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#FFFFFF", marginBottom: "14px", lineHeight: 1.3 }}>
                {current.title}
              </h3>

              <p style={{ fontSize: "14.5px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
                {current.description}
              </p>

              {/* Copyable CLI Snippet Pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  background: "rgba(5, 8, 14, 0.8)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  color: "var(--accent-cyan)",
                }}
              >
                <span>$ {current.commandSnippet}</span>
                <button
                  onClick={() => handleCopy(current.commandSnippet)}
                  style={{
                    background: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    color: "#FFFFFF",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy Command"}
                </button>
              </div>

              {/* Key Highlights Checklist */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {current.features.map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--text-primary)" }}>
                    <span style={{ color: "var(--accent-green)", fontWeight: "bold", marginTop: "1px" }}>✓</span>
                    <span style={{ lineHeight: 1.4 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Terminal Window Mockup Frame with Interactive Badges */}
            <div>
              <TerminalWindowMockup
                src={current.src}
                alt={current.alt}
                title={`CodeTrace AI · ${current.tabLabel}`}
                badgeText={current.badgeText}
                floatingBadges={current.floatingBadges}
                caption={current.title}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
