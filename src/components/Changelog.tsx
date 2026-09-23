"use client";

import React from "react";

const releases = [
  {
    version: "v1.0.3",
    date: "September 2026",
    badge: "Latest",
    highlights: [
      "NEW: codetrace mcp (stdio) and codetrace register-mcp — per-project MCP registration for Claude Code, Cursor and VS Code.",
      "NEW: Governed Pipeline Protocol — every structural claim carries a live file:line citation and is graded CONFIRMED / INFERRED / UNRESOLVED.",
      "NEW: Hardware-aware Ollama — native API, GPU memory detection, automatic num_ctx sizing and back-off (set-ctx --backoff).",
      "NEW: Custom provider for any OpenAI- or Anthropic-compatible endpoint; set-default-ctx and set-model-limits for unknown cloud models.",
      "NEW: Output Normalizer — answers render identically across every provider.",
      "SECURITY: API-key config written atomically with owner-only permissions; stricter project-path checks; writes outside the project refused.",
      "FIXED: git_diff returned empty diffs; re-indexing dropped inbound call edges; blank error messages on timeouts; Ollama startup crash.",
      "IMPROVED: Thread-safe parsing, chunked vector upserts, batched re-ranking for CPU-only machines, first automated test suite in CI.",
    ],
  },
  {
    version: "v1.0.2",
    date: "July 2026",
    badge: "Update",
    highlights: [
      "NEW: Dynamic model context window resolution via LiteLLM token counting.",
      "NEW: Ollama loaded context window (num_ctx) runtime detection.",
      "FIXED: PyPI packaging wheel includes all Tree-sitter .scm queries and database modules.",
      "IMPROVED: Dynamic conversation history compression preventing out-of-memory crashes.",
    ],
  },
  {
    version: "v1.0.1",
    date: "June 2026",
    badge: "Feature Release",
    highlights: [
      "NEW: Interactive Architecture Visualizer (codetrace visualize) with collapsible tree and cross-folder edges.",
      "NEW: Expanded language support to 21 total languages (C#, Swift, Kotlin, Bash, HTML, CSS, JSON, SQL, YAML, TOML, Dockerfile).",
      "NEW: 3-Tier Token Budget Manager & pure httpx multi-provider agent loop.",
      "IMPROVED: Parallel file AST parsing with ThreadPoolExecutor for 4x faster indexing.",
    ],
  },
];

export default function Changelog() {
  return (
    <section className="changelog-section" id="changelog">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Release Changelog</div>
          <h2 className="section-heading section-heading-gradient">
            Continuous Evolution & Releases
          </h2>
          <p className="section-subheading mx-auto">
            CodeTrace AI is actively developed with rapid improvements in deterministic AST parsing, local agent governance, and IDE integration.
          </p>
        </div>

        {/* Timeline */}
        <div className="changelog-timeline reveal-on-scroll">
          {releases.map((rel) => (
            <div key={rel.version} className="changelog-entry">
              <div className="changelog-entry-dot" />
              <div className="changelog-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                  <div className="changelog-version-tag">
                    <span>{rel.version}</span>
                    <span style={{ opacity: 0.6 }}>· {rel.date}</span>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px", background: "rgba(63, 185, 80, 0.15)", color: "var(--accent-green)" }}>
                    {rel.badge}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {rel.highlights.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--accent-cyan)", fontWeight: "bold" }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
