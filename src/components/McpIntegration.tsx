"use client";

import React, { useState } from "react";
import TerminalWindowMockup from "./TerminalWindowMockup";

const ideOptions = [
  {
    name: "Cursor IDE",
    badge: "Auto-Registered",
    path: "~/.cursor/mcp.json",
    description: "CodeTrace automatically injects the MCP server configuration into your Cursor settings during `codetrace init`.",
    config: `{
  "mcpServers": {
    "codetrace": {
      "command": "python",
      "args": ["-m", "codetrace_mcp.server", "--project", "/path/to/your/project"]
    }
  }
}`,
  },
  {
    name: "Claude Code",
    badge: "Auto-Registered",
    path: "~/.claude/mcp.json",
    description: "Connects the deterministic call graph directly into Claude Code CLI for terminal-based agentic workflows.",
    config: `{
  "mcpServers": {
    "codetrace": {
      "command": "python",
      "args": ["-m", "codetrace_mcp.server", "--project", "/path/to/your/project"]
    }
  }
}`,
  },
  {
    name: "VS Code",
    badge: "Auto-Registered",
    path: "~/.vscode/mcp.json",
    description: "Auto-registered for VS Code Copilot and custom agent extensions via standard Model Context Protocol transport.",
    config: `{
  "mcpServers": {
    "codetrace": {
      "command": "python",
      "args": ["-m", "codetrace_mcp.server", "--project", "/path/to/your/project"]
    }
  }
}`,
  },
  {
    name: "Windsurf IDE",
    badge: "Manual Setup",
    path: "~/.codeium/windsurf/mcp_config.json",
    description: "Add CodeTrace to Windsurf by pointing to the installed package binary with your current Python interpreter.",
    config: `{
  "mcpServers": {
    "codetrace": {
      "command": "/path/to/your/python",
      "args": [
        "/path/to/site-packages/codetrace_mcp/server.py",
        "--project",
        "/absolute/path/to/your/project"
      ]
    }
  }
}`,
  },
  {
    name: "Standalone CLI Daemon",
    badge: "Custom Host / Port",
    path: "Terminal / CI / Docker",
    description: "Run CodeTrace MCP as an independent background service accessible by remote agents or team IDEs.",
    config: `# Start MCP server on current directory
codetrace mcp .

# Start MCP server with custom host and port
codetrace mcp /path/to/project --port 8080 --host 0.0.0.0`,
  },
];

export default function McpIntegration() {
  const [selectedIde, setSelectedIde] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = ideOptions[selectedIde];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="tools-section" id="mcp" style={{ paddingTop: 0 }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">IDE Integration (MCP)</div>
          <h2 className="section-heading section-heading-gradient">
            Native Model Context Protocol (MCP)
          </h2>
          <p className="section-subheading mx-auto">
            <code>codetrace init</code> automatically registers the MCP server in Cursor, Claude Code, and VS Code. Your favorite editor instantly gains access to all 7 tools for in-editor AI assistance.
          </p>
        </div>

        {/* MCP Card */}
        <div className="mcp-hub-card reveal-on-scroll">
          {/* IDE Tabs */}
          <div className="ide-tabs-row">
            {ideOptions.map((ide, idx) => (
              <button
                key={ide.name}
                className={`ide-tab-btn ${selectedIde === idx ? "active" : ""}`}
                onClick={() => setSelectedIde(idx)}
              >
                {ide.name}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px", alignItems: "start", marginBottom: "40px" }}>
            {/* Left Info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF" }}>{current.name}</h3>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    background: current.badge === "Auto-Registered" ? "rgba(63, 185, 80, 0.15)" : "rgba(56, 189, 248, 0.15)",
                    color: current.badge === "Auto-Registered" ? "var(--accent-green)" : "var(--accent-cyan)",
                    border: `1px solid ${current.badge === "Auto-Registered" ? "rgba(63, 185, 80, 0.3)" : "rgba(56, 189, 248, 0.3)"}`,
                  }}
                >
                  {current.badge}
                </span>
              </div>

              <p style={{ fontSize: "14.5px", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "16px" }}>
                {current.description}
              </p>

              <div style={{ fontSize: "12.5px", color: "var(--text-tertiary)", marginBottom: "18px" }}>
                <strong>Config Target:</strong> <code>{current.path}</code>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn-secondary"
                  style={{ padding: "10px 18px", fontSize: "13.5px" }}
                  onClick={handleCopy}
                >
                  {copied ? "✓ Copied Config!" : "📋 Copy Config"}
                </button>
              </div>
            </div>

            {/* Right Code Pane */}
            <div style={{ background: "var(--bg-code)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", fontSize: "11px", color: "var(--text-tertiary)" }}>
                <span>MCP CONFIGURATION</span>
                <span style={{ color: "var(--accent-cyan)", cursor: "pointer" }} onClick={handleCopy}>
                  {copied ? "Copied" : "Copy"}
                </span>
              </div>
              <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "12.5px", color: "#E2E8F0", overflowX: "auto" }}>
                <code>{current.config}</code>
              </pre>
            </div>
          </div>

          {/* Standalone MCP Server CLI Snapshot Framed */}
          <div style={{ borderTop: "1px solid var(--border-primary)", paddingTop: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  ● Real MCP Server Execution
                </span>
                <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", marginTop: "2px" }}>
                  Automatic Registration & Standalone MCP Server
                </h4>
              </div>
              <span style={{ fontSize: "12px", color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                codetrace register-mcp .
              </span>
            </div>

            <TerminalWindowMockup
              src="/images/mcpcmd.png"
              alt="CodeTrace MCP Server Terminal Execution"
              title="VS Code Terminal · codetrace register-mcp ."
              badgeText="Auto-Registration Active"
              floatingBadges={[
                { text: "✓ Cursor Config Written", top: "20%", left: "8%", theme: "green", icon: "✓" },
                { text: "✓ Claude Code Connected", bottom: "30%", right: "10%", theme: "cyan", icon: "🔌" },
              ]}
              caption="Automatic registration in Cursor, Claude Code, and VS Code during initialization."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
