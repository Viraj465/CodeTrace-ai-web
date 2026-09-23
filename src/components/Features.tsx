"use client";

import React from "react";

const featuresList = [
  {
    title: "Autonomous Code Research",
    tagline: "Exact Line Citations Across Files",
    description:
      "Ask complex engineering questions in natural language. The agent executes hybrid search, navigates AST symbols, and reads file ranges to formulate grounded answers with verified file:line citations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    codeSnippet: `# Query: "Where is UserToken issued and verified?"
auth/jwt.py:42 issues JWT tokens via create_token()
middleware/auth.py:18 verifies tokens via verify()
tests/test_auth.py:64 validates cryptographic signatures
Coverage: 3 references, 6 active callers [CONFIRMED]`,
  },
  {
    title: "Runtime Blast Radius Analysis",
    tagline: "Know What Breaks Before You Edit",
    description:
      "Maps exact caller/callee relationships across 21 languages using Tree-sitter ASTs. See every downstream function, route, database model, and test suite affected by a planned change.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    codeSnippet: `● auth/jwt.py (Target Symbol: verify)
  ├── 1-hop: middleware/auth.py:18 (Auth Guard)
  ├── 1-hop: api/routes/users.py:42 (User Profile)
  ├── 2-hop: api/routes/admin.py:91 (Admin Dashboard)
  └── Test: tests/test_auth.py (14 test cases impacted)`,
  },
  {
    title: "Interactive Architecture Map",
    tagline: "codetrace visualize (Self-contained HTML)",
    description:
      "Generate an offline, interactive 3D/2D visual graph of your codebase architecture. Features collapsible directory trees, hover symbol inspectors, live filter search, and cross-folder call edges.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    codeSnippet: `$ codetrace visualize
✓ Generated .codetrace/graph_visualization.html
✓ 142 Nodes, 4,891 Edges rendered
✓ Cross-folder dependency linkages mapped
Opening in default browser...`,
  },
  {
    title: "Human-in-the-Loop Safe Edits",
    tagline: "Unified Diff Previews & Path Protection",
    description:
      "Code modifications are proposed as clean unified diffs with built-in path-traversal protection. Nothing is ever written to disk without explicit developer confirmation.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    codeSnippet: `--- a/middleware/auth.py
+++ b/middleware/auth.py
@@ -18,3 +18,4 @@
-    token = request.headers.get("Authorization")
+    token = sanitize_bearer(request.headers.get("Authorization"))
+    claims = verify(token, config.SECRET_KEY)
[Apply this diff to disk? (y/n/review)]:`,
  },
  {
    title: "SHA-256 Smart Delta Sync",
    tagline: "Sub-Second Incremental Re-Indexing",
    description:
      "Tracks file checksums to only re-parse files that actually changed. Subsequent runs complete in milliseconds even on million-line monolithic repositories.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    codeSnippet: `$ codetrace index .
[Delta Sync] 139 files unchanged (hash match)
[Delta Sync] 3 files modified → re-indexed in 0.38s
[Vector Sync] ChromaDB delta updated successfully`,
  },
  {
    title: "Output Normalizer Layer",
    tagline: "Provider-Agnostic Response Consistency",
    description:
      "Normalizes headings, list symbols, code-fence aliases (`py` → `python`), and spacing across all models — from local 7B Ollama to frontier cloud LLMs, ensuring a uniform CLI aesthetic.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    codeSnippet: `# output_normalizer.py in agent loop
def normalize_response(raw_text: str) -> str:
  # Normalizes code fences, heading levels,
  # removes markdown artifacts, enforces uniform CLI styling
  return normalized_rich_text`,
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Core Features</div>
          <h2 className="section-heading section-heading-gradient">
            Engineered for Deep Structural Code Understanding
          </h2>
          <p className="section-subheading mx-auto">
            From first clone to confident shipping — everything you and your AI agent need to inspect, query, and refactor code safely.
          </p>
        </div>

        <div className="features-grid-main">
          {featuresList.map((f, i) => (
            <div key={f.title} className={`feature-box reveal-on-scroll delay-${((i % 3) + 1) * 100}`}>
              <div className="feature-box-glow" />
              <div className="feature-box-icon">{f.icon}</div>
              <h3 className="feature-box-title">{f.title}</h3>
              <div style={{ fontSize: "12px", color: "var(--accent-cyan)", fontWeight: 600, marginBottom: "12px" }}>
                {f.tagline}
              </div>
              <p className="feature-box-desc">{f.description}</p>
              <div className="feature-box-snippet">
                <pre style={{ margin: 0, overflowX: "auto" }}>
                  <code>{f.codeSnippet}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
