"use client";

import React, { useState } from "react";

interface AgentTool {
  name: string;
  engine: string;
  description: string;
  params: { name: string; type: string; desc: string }[];
  exampleInvocation: string;
  sampleOutput: string;
}

const tools: AgentTool[] = [
  {
    name: "search_codebase",
    engine: "ChromaDB + FlashRank",
    description: "Executes dense vector embedding search + sparse BM25 retrieval merged via Reciprocal Rank Fusion (RRF) and scored with local FlashRank neural reranking.",
    params: [
      { name: "query", type: "string", desc: "Natural language query describing symbol, behavior, or feature" },
      { name: "limit", type: "int", desc: "Maximum precision candidate snippets to return (default: 5)" },
    ],
    exampleInvocation: `search_codebase(query="rate limiting token bucket", limit=3)`,
    sampleOutput: `[
  {
    "file": "middleware/rate_limiter.py",
    "lines": "24-58",
    "score": 0.942,
    "snippet": "class TokenBucketLimiter:\\n    def allow_request(self, key): ..."
  },
  {
    "file": "config/limits.yaml",
    "lines": "1-15",
    "score": 0.887,
    "snippet": "rate_limits:\\n  api_v1: 100/min\\n  admin: 500/min"
  }
]`,
  },
  {
    name: "get_symbol_relations",
    engine: "SQLite + NetworkX Graph",
    description: "Traverses the deterministic call graph to return incoming callers, outgoing callee dependencies, import bindings, and method declarations.",
    params: [
      { name: "symbol_name", type: "string", desc: "Target function, class, or method identifier" },
      { name: "file_path", type: "string?", desc: "Optional file path to disambiguate overloaded names" },
    ],
    exampleInvocation: `get_symbol_relations(symbol_name="verify", file_path="auth/jwt.py")`,
    sampleOutput: `{
  "symbol": "auth.jwt.verify",
  "callers": [
    { "file": "middleware/auth.py", "line": 18, "caller": "authenticate_request" },
    { "file": "api/routes/users.py", "line": 42, "caller": "get_current_user" }
  ],
  "dependencies": [
    { "module": "cryptography.hazmat.primitives", "symbol": "jwt.decode" }
  ]
}`,
  },
  {
    name: "analyze_impact",
    engine: "Transitive Graph Traversal",
    description: "Calculates the complete transitive blast radius of modifying a symbol or file. Identifies direct dependents, multi-hop modules, and affected test suites.",
    params: [
      { name: "target", type: "string", desc: "Target symbol name or file path to analyze" },
      { name: "max_depth", type: "int", desc: "Maximum hop depth in the call graph (default: 3)" },
    ],
    exampleInvocation: `analyze_impact(target="auth/jwt.py:verify", max_depth=2)`,
    sampleOutput: `{
  "direct_dependents": ["middleware/auth.py", "api/routes/users.py"],
  "indirect_dependents": ["api/routes/admin.py", "api/routes/billing.py"],
  "impacted_tests": ["tests/test_auth.py", "tests/test_users.py"],
  "total_affected_files": 5,
  "risk_score": "HIGH"
}`,
  },
  {
    name: "read_file",
    engine: "DB Snapshot / Sandbox",
    description: "Reads complete file contents or sliced line windows from the indexed repository snapshot with strict path-traversal safeguards.",
    params: [
      { name: "file_path", type: "string", desc: "Relative file path inside the indexed repository" },
      { name: "start_line", type: "int?", desc: "Optional starting line number (1-indexed)" },
      { name: "end_line", type: "int?", desc: "Optional ending line number" },
    ],
    exampleInvocation: `read_file(file_path="middleware/auth.py", start_line=15, end_line=30)`,
    sampleOutput: `15: def authenticate_request(request: Request) -> User:
16:     auth_header = request.headers.get("Authorization")
17:     if not auth_header or not auth_header.startswith("Bearer "):
18:         raise AuthenticationError("Missing Bearer token")
19:     token = auth_header.split(" ")[1]
20:     return verify(token, settings.JWT_SECRET)`,
  },
  {
    name: "write_file",
    engine: "Human-in-the-Loop Diff Engine",
    description: "Generates unified diff patch proposals with syntax and path validation. Presents diffs to the developer for interactive approval before touching disk.",
    params: [
      { name: "file_path", type: "string", desc: "Target file to modify" },
      { name: "content", type: "string", desc: "Proposed replacement content or patch" },
      { name: "description", type: "string", desc: "Explanation of why this modification is proposed" },
    ],
    exampleInvocation: `write_file(file_path="middleware/auth.py", description="Add Bearer token sanitization")`,
    sampleOutput: `--- a/middleware/auth.py
+++ b/middleware/auth.py
@@ -18,2 +18,3 @@
-    token = auth_header.split(" ")[1]
+    raw_token = auth_header.split(" ")[1]
+    token = sanitize_token(raw_token)
[Awaiting developer confirmation (y/n)]`,
  },
  {
    name: "inspect_index",
    engine: "SQLite Catalog Metadata",
    description: "Returns indexed repository health metrics: total parsed files, symbol counts, call edge counts, DB size, and SHA-256 sync state.",
    params: [],
    exampleInvocation: `inspect_index()`,
    sampleOutput: `{
  "total_files": 142,
  "total_symbols": 1247,
  "call_graph_edges": 4891,
  "vector_db_chunks": 862,
  "languages_detected": ["Python", "TypeScript", "SQL", "Dockerfile"],
  "last_synced_at": "2026-08-17T12:00:00Z"
}`,
  },
  {
    name: "git_diff",
    engine: "Subprocess Sandbox",
    description: "Executes an injection-protected git diff against working tree or specific commit hashes to ground agent proposals in current git status.",
    params: [
      { name: "staged_only", type: "bool", desc: "If true, only returns staged changes (--cached)" },
      { name: "commit_hash", type: "string?", desc: "Optional base commit to diff against" },
    ],
    exampleInvocation: `git_diff(staged_only=false)`,
    sampleOutput: `diff --git a/src/core/retriever.py b/src/core/retriever.py
index a4b8c9..e2f1d0 100644
--- a/src/core/retriever.py
+++ b/src/core/retriever.py
@@ -12,2 +12,3 @@
+import logging
+logger = logging.getLogger(__name__)`,
  },
];

export default function AgenticTools() {
  const [selectedTool, setSelectedTool] = useState(0);
  const tool = tools[selectedTool];

  return (
    <section className="tools-section" id="tools">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Agentic Tool Suite</div>
          <h2 className="section-heading section-heading-gradient">
            7 Autonomous Tools for Complete Code Mastery
          </h2>
          <p className="section-subheading mx-auto">
            The AI Architect and external MCP clients invoke these 7 tools autonomously to search, inspect, traverse, and propose changes without guessing.
          </p>
        </div>

        {/* Tool Navigation Bar */}
        <div className="tools-nav-bar reveal-on-scroll">
          {tools.map((t, idx) => (
            <button
              key={t.name}
              className={`tool-tab-btn ${selectedTool === idx ? "active" : ""}`}
              onClick={() => setSelectedTool(idx)}
            >
              {t.name}()
            </button>
          ))}
        </div>

        {/* Active Tool Showcase */}
        <div className="tool-showcase-box reveal-on-scroll">
          {/* Left Column: Tool Specs & Parameters */}
          <div>
            <div className="tool-info-title">
              <span>{tool.name}</span>
              <span className="tool-badge-engine">{tool.engine}</span>
            </div>
            <p className="tool-info-desc">{tool.description}</p>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "8px" }}>
                Parameters
              </div>
              {tool.params.length > 0 ? (
                <table className="tool-params-table">
                  <thead>
                    <tr>
                      <th>Param</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tool.params.map((p) => (
                      <tr key={p.name}>
                        <td style={{ color: "var(--accent-cyan)", fontFamily: "monospace" }}>{p.name}</td>
                        <td style={{ color: "var(--accent-purple)", fontFamily: "monospace" }}>{p.type}</td>
                        <td style={{ color: "var(--text-secondary)" }}>{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>No parameters required.</div>
              )}
            </div>

            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "6px" }}>
                Invocation
              </div>
              <div style={{ background: "var(--bg-code)", padding: "10px 14px", borderRadius: "6px", fontFamily: "monospace", fontSize: "12.5px", color: "var(--accent-cyan)" }}>
                {tool.exampleInvocation}
              </div>
            </div>
          </div>

          {/* Right Column: Sample JSON/Diff Output */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Live Response Sandbox
              </span>
              <span style={{ fontSize: "11px", color: "var(--accent-green)", fontWeight: 600 }}>
                ● Structured JSON / Diff
              </span>
            </div>
            <div className="tool-code-preview-pane">
              <pre style={{ margin: 0 }}>
                <code>{tool.sampleOutput}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
