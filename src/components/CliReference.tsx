"use client";

import React, { useState } from "react";
import TerminalWindowMockup from "./TerminalWindowMockup";

interface CommandDoc {
  cmd: string;
  desc: string;
  usage: string;
  flags: { flag: string; desc: string }[];
  example: string;
}

const commands: CommandDoc[] = [
  {
    cmd: "init",
    desc: "One-command setup: configure LLM provider, download embedding models, index repository, and register MCP in Cursor, Claude Code, and VS Code.",
    usage: "codetrace init [PATH]",
    flags: [
      { flag: "--offline", desc: "Strict air-gapped mode (blocks external calls)" },
      { flag: "--fast", desc: "Use smaller embedding models for lower RAM usage" },
      { flag: "--llm <provider>", desc: "Pre-select provider: anthropic, openai, gemini, groq, openrouter, ollama, custom" },
    ],
    example: `cd /path/to/my-project\ncodetrace init\n# Or air-gapped mode:\ncodetrace init --offline`,
  },
  {
    cmd: "chat",
    desc: "Launch the interactive AI Architect loop with live Governed Pipeline Protocol, line citations, and safe diff proposals.",
    usage: "codetrace chat [--resume <ID>]",
    flags: [
      { flag: "--resume <ID>", desc: "Resume a specific past session by ID" },
      { flag: "--offline", desc: "Run session in strict offline air-gapped mode" },
    ],
    example: `codetrace chat\n# Inside chat:\n> Where is UserToken validated?\n> /clear   # start fresh session\n> exit     # close chat`,
  },
  {
    cmd: "visualize",
    desc: "Generate an interactive, self-contained HTML graph of your code architecture with collapsible trees, symbol inspectors, and cross-folder edges.",
    usage: "codetrace visualize",
    flags: [],
    example: `codetrace visualize\n# Generates .codetrace/graph_visualization.html and opens browser`,
  },
  {
    cmd: "mcp",
    desc: "Start the Model Context Protocol server for an indexed project. It speaks MCP over stdio, so your IDE (Claude Code, Cursor, VS Code, Windsurf) launches it and talks over stdin/stdout — no host or port to manage.",
    usage: "codetrace mcp [PATH]  ·  codetrace register-mcp [PATH]",
    flags: [
      { flag: "register-mcp", desc: "Write/refresh the per-project .mcp.json, .cursor/mcp.json and .vscode/mcp.json entries" },
    ],
    example: `codetrace mcp .                 # launched by your IDE
codetrace register-mcp .        # re-register after moving a venv`,
  },
  {
    cmd: "config",
    desc: "View or update your LLM provider, API base URL, model name, and API keys. Prompts for endpoint style when custom is chosen.",
    usage: "codetrace config",
    flags: [],
    example: `codetrace config\n# Anthropic, OpenAI, Groq, Gemini, OpenRouter, Ollama, or Custom`,
  },
  {
    cmd: "set-ctx",
    desc: "Context-window controls. CodeTrace sizes Ollama's num_ctx to your GPU automatically; set-ctx overrides it. For cloud models LiteLLM doesn't know, set-default-ctx and set-model-limits pin the window and output cap.",
    usage: "codetrace set-ctx [TOKENS] [--backoff F]  ·  set-default-ctx <TOKENS>  ·  set-model-limits",
    flags: [
      { flag: "--backoff <0.25–0.9>", desc: "Fraction of the window kept each time it auto-lowers under memory pressure" },
      { flag: "--context-window / --max-output-tokens", desc: "set-model-limits: explicit limits for the configured cloud model" },
    ],
    example: `codetrace set-ctx 32768          # pin Ollama num_ctx
codetrace set-ctx 0              # back to GPU auto-sizing
codetrace set-ctx --backoff 0.75
codetrace set-model-limits --context-window 131072 --max-output-tokens 8192`,
  },
  {
    cmd: "history / export",
    desc: "Inspect past chat sessions and export rich markdown transcripts with full citations.",
    usage: "codetrace history | codetrace export <ID> [-o FILE]",
    flags: [],
    example: `codetrace history\ncodetrace export session_20260817_1204 > audit_report.md`,
  },
];

export default function CliReference() {
  const [selectedCmd, setSelectedCmd] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = commands[selectedCmd];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="cli-section" id="cli">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">CLI Reference</div>
          <h2 className="section-heading section-heading-gradient">
            Clean, Intuitive Command Line Interface
          </h2>
          <p className="section-subheading mx-auto">
            Everything in CodeTrace AI is accessible through intuitive CLI commands with rich shell output, progress indicators, and flags.
          </p>
        </div>

        {/* Command Nav */}
        <div className="cli-tabs-nav reveal-on-scroll">
          {commands.map((c, idx) => (
            <button
              key={c.cmd}
              className={`cli-tab-button ${selectedCmd === idx ? "active" : ""}`}
              onClick={() => setSelectedCmd(idx)}
            >
              codetrace {c.cmd}
            </button>
          ))}
        </div>

        {/* Active Command Card */}
        <div className="cli-command-card reveal-on-scroll" style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", fontFamily: "monospace" }}>
                codetrace {current.cmd}
              </h3>
              <p style={{ fontSize: "14.5px", color: "var(--text-secondary)", marginTop: "6px", maxWidth: "600px", lineHeight: 1.6 }}>
                {current.desc}
              </p>
            </div>

            <div style={{ background: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.25)", padding: "6px 14px", borderRadius: "8px", fontFamily: "monospace", fontSize: "13px", color: "var(--accent-cyan)" }}>
              {current.usage}
            </div>
          </div>

          {/* Flags */}
          {current.flags.length > 0 && (
            <div style={{ margin: "20px 0" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "8px" }}>
                Command Flags
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {current.flags.map((f) => (
                  <div key={f.flag} style={{ display: "flex", alignItems: "baseline", gap: "12px", fontSize: "13px" }}>
                    <code style={{ color: "var(--accent-purple)", fontFamily: "monospace", minWidth: "160px" }}>{f.flag}</code>
                    <span style={{ color: "var(--text-secondary)" }}>{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example Code Block */}
          <div style={{ marginTop: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: "var(--text-tertiary)", textTransform: "uppercase", fontWeight: 700 }}>
                Terminal Example
              </span>
              <button
                style={{ fontSize: "12px", color: "var(--accent-cyan)", background: "none", cursor: "pointer" }}
                onClick={handleCopy}
              >
                {copied ? "✓ Copied!" : "📋 Copy Example"}
              </button>
            </div>
            <div style={{ background: "var(--bg-code)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "16px", fontFamily: "monospace", fontSize: "13px", color: "#E2E8F0" }}>
              <pre style={{ margin: 0, overflowX: "auto" }}>
                <code>{current.example}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Framed codetrace --help Output Mockup */}
        <div className="reveal-on-scroll" style={{ maxWidth: "1050px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ● Comprehensive CLI Reference Manual
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", marginTop: "4px" }}>
              Complete `codetrace --help` Options & Commands
            </h3>
          </div>

          <TerminalWindowMockup
            src="/images/helpcmd.png"
            alt="CodeTrace AI CLI Help output"
            title="VS Code Terminal · codetrace --help"
            badgeText="CLI Manual v1.0.3"
            floatingBadges={[
              { text: "12 Commands Documented", top: "25%", right: "8%", theme: "cyan", icon: "⚙️" },
              { text: "Detailed Options & Flags", bottom: "25%", left: "8%", theme: "green", icon: "📖" },
            ]}
            caption="Complete CLI help output showing all options, subcommands, and flags."
          />
        </div>
      </div>
    </section>
  );
}
