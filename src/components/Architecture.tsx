"use client";

import React, { useState } from "react";

interface PipelineStep {
  number: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  specs: string[];
  codeBlock: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    number: "01",
    label: "Source Ingestion",
    icon: "📂",
    title: "1. Repository & Git Delta Ingestion",
    description:
      "Ingests any local directory or clones a GitHub URL. Computes SHA-256 delta hashes per file to bypass unchanged files during incremental sync.",
    specs: [
      "Zero network telemetry — 100% offline parsing",
      "Git-aware branch and ignore resolution (.gitignore)",
      "Supports local directories or direct GitHub URL clones",
    ],
    codeBlock: `[Ingestion Engine]
Hashing repository tree...
Checked 142 files via SHA-256
Unmodified: 139 files (cached)
Changed: 3 files scheduled for AST pass`,
  },
  {
    number: "02",
    label: "Tree-sitter AST",
    icon: "🌲",
    title: "2. Multi-Language Tree-sitter AST Grammars",
    description:
      "17 languages parsed into concrete syntax trees using native Tree-sitter .scm queries. Extracts symbols, scope depths, docstrings, classes, and function definitions.",
    specs: [
      "17 full syntax grammars + 4 structural formats",
      "Parallel multi-threaded parsing via ThreadPoolExecutor",
      "Symbol scope extraction and parameter signature resolution",
    ],
    codeBlock: `(function_definition
  name: (identifier) @func.name
  parameters: (parameters) @func.params
  body: (block) @func.body)
--> Extracted: verify(), create_token(), authenticate()`,
  },
  {
    number: "03",
    label: "Call Graph",
    icon: "📊",
    title: "3. SQLite & NetworkX Deterministic Call Graph",
    description:
      "Constructs directed multi-graph mapping exact caller/callee relationships, cross-module imports, class hierarchies, and route handlers.",
    specs: [
      "Saved to .codetrace/graph_metadata.db",
      "O(1) lookup time for immediate and multi-hop dependents",
      "Powers blast radius calculation and impact analysis",
    ],
    codeBlock: `GRAPH_DB:
Node: auth.jwt.verify (in_degree=4, out_degree=2)
  ├── Incoming Edge: middleware.auth.authenticate_request
  ├── Incoming Edge: api.routes.users.profile_handler
  └── Outgoing Edge: cryptography.hazmat.primitives`,
  },
  {
    number: "04",
    label: "Local Embeddings",
    icon: "🧠",
    title: "4. HuggingFace BGE + E5 Vector Embeddings",
    description:
      "Encodes code chunks and docstrings locally using BAAI/bge-small-en-v1.5 and intfloat/e5-small-v2 without sending a single byte to external clouds.",
    specs: [
      "Downloaded once to ~/.cache/huggingface/hub",
      "Hardware-accelerated on CUDA GPUs or Apple Silicon",
      "Portable via USB for strict air-gapped environments",
    ],
    codeBlock: `EMBEDDING_PIPELINE:
Model: BAAI/bge-small-en-v1.5 (384-dim)
Chunking: AST-aligned function boundaries
Batch size: 64 vectors / pass
Device: CUDA / CPU fallback`,
  },
  {
    number: "05",
    label: "Hybrid Search",
    icon: "🔍",
    title: "5. ChromaDB RRF + FlashRank Reranker",
    description:
      "Combines dense semantic vector search with lexical BM25 matching through Reciprocal Rank Fusion (RRF), re-scored via an ultra-fast local FlashRank cross-encoder.",
    specs: [
      "ChromaDB local vector persistence (.codetrace/chroma)",
      "Reciprocal Rank Fusion merges dense + sparse candidates",
      "FlashRank neural reranker pinpoints the most relevant file snippets",
    ],
    codeBlock: `HYBRID_RETRIEVER:
1. Vector Retrieval (ChromaDB top-k=20)
2. BM25 Lexical Matching (top-k=20)
3. RRF Fusion Score: RRF_score(d) = sum(1 / (60 + r_i))
4. FlashRank Reranking -> Top 5 precision results`,
  },
  {
    number: "06",
    label: "Token Budget",
    icon: "⚡",
    title: "6. Dynamic Token Budget & Hardware Context",
    description:
      "Auto-detects GPU VRAM and model window sizes via LiteLLM. Manages 3-tier context allocation and dynamic conversation compression to prevent OOM errors.",
    specs: [
      "Auto-detects Ollama loaded context window (num_ctx)",
      "Dynamic backoff reduces context on memory pressure",
      "Accurate token counting with provider-specific tokenizers",
    ],
    codeBlock: `TOKEN_BUDGET_MANAGER:
Model: deepseek-r1:14b | VRAM: 16 GB detected
Context Window: 32,768 tokens (Tier 2 budget)
Allocation: System (20%) | Retrieval (45%) | Chat History (35%)`,
  },
  {
    number: "07",
    label: "Governed Loop",
    icon: "🏛️",
    title: "7. Governed Agentic Execution Loop",
    description:
      "A pure httpx multi-provider agent orchestrating 7 tools under strict evidence governance (CONFIRMED / INFERRED / UNRESOLVED) with output normalization.",
    specs: [
      "Zero LangChain bloat — lightweight pure Python",
      "Enforces mandatory file:line citations on every structural assertion",
      "Unified diff generation with path-traversal safeguards",
    ],
    codeBlock: `AGENT_LOOP:
Prompt: "Where is UserToken issued?"
1. search_codebase() -> auth/jwt.py
2. get_symbol_relations() -> 4 callers verified
3. read_file() -> Lines 42-60 verified
Status: [CONFIRMED] auth/jwt.py:42`,
  },
  {
    number: "08",
    label: "MCP & CLI",
    icon: "🔌",
    title: "8. Model Context Protocol (MCP) & CLI",
    description:
      "Serves the same 7 tools to Claude Code, Cursor, VS Code and Windsurf over MCP, or runs as an interactive CLI and HTML visualizer.",
    specs: [
      "Per-project registration: .mcp.json, .cursor/mcp.json, .vscode/mcp.json",
      "codetrace mcp [PATH] — stdio server your IDE launches",
      "codetrace visualize generates interactive HTML graph",
    ],
    codeBlock: `MCP_SERVER (JSON-RPC 2.0 over stdio):
Tools: search_codebase, inspect_index, get_symbol_relations,
       read_file, analyze_impact, write_file, git_diff
Clients: Claude Code, Cursor, VS Code, Windsurf`,
  },
];

export default function Architecture() {
  const [activeStep, setActiveStep] = useState(0);
  const current = pipelineSteps[activeStep];

  return (
    <section className="arch-section" id="architecture">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Architecture</div>
          <h2 className="section-heading section-heading-gradient">
            The 8-Stage Local Intelligence Pipeline
          </h2>
          <p className="section-subheading mx-auto">
            From raw source files to governed AI reasoning and MCP IDE integration. Every layer is inspectable, modular, and 100% offline-first.
          </p>
        </div>

        {/* 8-Stage Interactive Ingestion Steps */}
        <div className="arch-container reveal-on-scroll">
          {/* Step Selector Tabs */}
          <div className="arch-steps-nav">
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.number}
                className={`arch-step-node ${activeStep === idx ? "active" : ""}`}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
              >
                <div className="arch-step-num">STEP {step.number}</div>
                <div className="arch-step-icon">{step.icon}</div>
                <div className="arch-step-label">{step.label}</div>
              </div>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="arch-detail-display">
            <div className="arch-detail-left">
              <h3>{current.title}</h3>
              <p>{current.description}</p>

              <div className="arch-detail-specs">
                {current.specs.map((spec, i) => (
                  <div key={i} className="arch-detail-spec-row">
                    <span className="bullet">✓</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="arch-detail-right">
              <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "8px", textTransform: "uppercase" }}>
                Pipeline Execution Trace
              </div>
              <pre style={{ margin: 0, overflowX: "auto" }}>
                <code>{current.codeBlock}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Model Architecture Info (Removed miscategorized image) */}
        <div className="reveal-on-scroll" style={{ marginTop: "60px" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)", borderRadius: "20px", padding: "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-purple)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  ● Architecture Design
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", marginTop: "4px" }}>
                  Deterministic Code Intelligence Graph Architecture
                </h3>
              </div>
              <span style={{ fontSize: "12px", color: "var(--accent-cyan)", background: "rgba(56, 189, 248, 0.15)", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "4px 12px", borderRadius: "9999px", fontWeight: 600 }}>
                Hybrid Brain Engine
              </span>
            </div>
            
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "800px", margin: 0 }}>
              Multi-layer symbol graph interconnecting Tree-sitter ASTs, BGE/E5 dense embeddings, SQLite relational tables, NetworkX call graphs, and live MCP reasoning sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
