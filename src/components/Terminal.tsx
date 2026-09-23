"use client";

import React, { useState, useEffect, useRef } from "react";

interface StepLine {
  type: "command" | "check" | "tool" | "evidence" | "citation" | "output" | "stat" | "empty";
  text: string;
  badge?: string;
  delay: number;
}

const initSteps: StepLine[] = [
  { type: "command", text: "$ codetrace init .", delay: 0 },
  { type: "check", text: "Auto-detected GPU: NVIDIA RTX 4090 · Auto-configured Ollama context window", delay: 400 },
  { type: "check", text: "Loaded HuggingFace local models: bge-small-en-v1.5 + e5-small-v2 (offline cached)", delay: 800 },
  { type: "check", text: "Parsing 142 source files across 21 languages with Tree-sitter AST grammars...", delay: 1200 },
  { type: "check", text: "Constructing deterministic SQLite + NetworkX call graph (4,891 edges)...", delay: 1600 },
  { type: "check", text: "Generating ChromaDB hybrid embeddings with SHA-256 Smart Delta Sync...", delay: 2000 },
  { type: "check", text: "Auto-registered MCP server in ~/.cursor/mcp.json, ~/.claude/mcp.json, ~/.vscode/mcp.json", delay: 2400 },
  { type: "empty", text: "", delay: 2600 },
  { type: "output", text: "✨ CodeTrace initialized! Ready for governed AI reasoning & IDE assistance.", delay: 2800 },
  { type: "stat", text: "Coverage: 142 files · 1,247 functions · 38 modules · 4,891 call edges · 0 cloud egress", delay: 3000 },
];

const chatSteps: StepLine[] = [
  { type: "command", text: "$ codetrace chat", delay: 0 },
  { type: "output", text: "AI Architect > Where is UserToken validated and what breaks if we modify verify()?", delay: 500 },
  { type: "tool", text: "⚡ [LOOP 1/4] search_codebase('UserToken verify') → matched auth/jwt.py, middleware/auth.py", delay: 1000 },
  { type: "tool", text: "⚡ [LOOP 2/4] get_symbol_relations('verify') → callers: [middleware.auth.authenticate_request]", delay: 1500 },
  { type: "tool", text: "⚡ [LOOP 3/4] read_file('auth/jwt.py', lines 38-55) → snapshot verified", delay: 2000 },
  { type: "tool", text: "⚡ [LOOP 4/4] analyze_impact('auth/jwt.py:verify') → blast radius: 4 modules, 2 test suites", delay: 2500 },
  { type: "empty", text: "", delay: 2700 },
  { type: "evidence", text: "Evidence Status: CONFIRMED (Verified via live AST & graph tool execution)", badge: "CONFIRMED", delay: 2900 },
  { type: "citation", text: "• auth/jwt.py:42 issues and validates UserToken via verify(token, secret)", delay: 3100 },
  { type: "citation", text: "• middleware/auth.py:18 directly depends on verify() in HTTP auth guard", delay: 3300 },
  { type: "citation", text: "• tests/test_auth.py:64 validates cryptographic expiry behavior", delay: 3500 },
  { type: "output", text: "Blast Radius: 4 downstream modules affected (middleware/auth.py, api/routes/users.py, api/routes/admin.py, tests/test_auth.py).", delay: 3700 },
];

export default function Terminal() {
  const [activeTab, setActiveTab] = useState<"init" | "chat">("chat");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLines = activeTab === "init" ? initSteps : chatSteps;

  useEffect(() => {
    setVisibleLines(0);
    const timeouts: NodeJS.Timeout[] = [];

    currentLines.forEach((step, index) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, index + 1));
      }, step.delay);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [activeTab]);

  return (
    <div className="terminal-section reveal-on-scroll" ref={containerRef}>
      <div className="terminal-card">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-controls">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
          </div>

          <div className="terminal-tabs">
            <button
              className={`terminal-tab-btn ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              🧠 codetrace chat (Governed Protocol)
            </button>
            <button
              className={`terminal-tab-btn ${activeTab === "init" ? "active" : ""}`}
              onClick={() => setActiveTab("init")}
            >
              ⚡ codetrace init (Auto Setup)
            </button>
          </div>

          <div style={{ fontSize: "11px", color: "var(--text-tertiary)", fontFamily: "monospace" }}>
            100% Local Sandbox
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {currentLines.slice(0, visibleLines).map((line, idx) => {
            switch (line.type) {
              case "command":
                return (
                  <div key={idx} style={{ marginBottom: "8px" }}>
                    <span className="terminal-prompt">&gt;</span>
                    <span className="terminal-command">{line.text}</span>
                  </div>
                );
              case "check":
                return (
                  <div key={idx} style={{ color: "#E2E8F0", marginBottom: "4px" }}>
                    <span className="terminal-success-check">✓</span>
                    <span>{line.text}</span>
                  </div>
                );
              case "tool":
                return (
                  <div key={idx} style={{ color: "var(--accent-cyan)", marginBottom: "4px", paddingLeft: "8px" }}>
                    {line.text}
                  </div>
                );
              case "evidence":
                return (
                  <div key={idx} style={{ marginTop: "6px", marginBottom: "6px" }}>
                    <span className="terminal-badge-confirmed">CONFIRMED</span>
                    <span style={{ marginLeft: "8px", color: "var(--accent-green)", fontWeight: 600 }}>
                      Evidence-Backed Assertion (CONFIRMED)
                    </span>
                  </div>
                );
              case "citation":
                return (
                  <div key={idx} style={{ color: "#CBD5E1", paddingLeft: "14px", marginBottom: "3px" }}>
                    <span className="terminal-citation">{line.text.split(" ")[0]}</span>
                    <span> {line.text.slice(line.text.indexOf(" ") + 1)}</span>
                  </div>
                );
              case "output":
                return (
                  <div key={idx} style={{ color: "#FFFFFF", fontWeight: 500, margin: "6px 0" }}>
                    {line.text}
                  </div>
                );
              case "stat":
                return (
                  <div
                    key={idx}
                    style={{
                      marginTop: "12px",
                      padding: "8px 12px",
                      background: "rgba(56, 189, 248, 0.08)",
                      border: "1px solid rgba(56, 189, 248, 0.2)",
                      borderRadius: "6px",
                      color: "var(--accent-cyan)",
                      fontSize: "12px",
                    }}
                  >
                    {line.text}
                  </div>
                );
              case "empty":
                return <div key={idx} style={{ height: "8px" }} />;
              default:
                return null;
            }
          })}
          {visibleLines < currentLines.length && <span className="terminal-cursor" />}
        </div>
      </div>
    </div>
  );
}
