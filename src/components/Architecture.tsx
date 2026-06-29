"use client";

import React, { useState } from "react";

interface PipelineStep {
  number: string;
  label: string;
  icon: React.ReactNode;
  detailLabel: string;
  detailText: string;
}

const steps: PipelineStep[] = [
  {
    number: "01",
    label: "Repository",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    detailLabel: "REPOSITORY",
    detailText: "Your source of truth — any size, any language.",
  },
  {
    number: "02",
    label: "Tree-sitter Parsing",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <line x1="4" y1="14" x2="20" y2="14" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    ),
    detailLabel: "TREE-SITTER PARSING",
    detailText:
      "Multi-language parsing using Tree-sitter grammars. Extracts functions, classes, imports, and relationships from source code into structured syntax trees.",
  },
  {
    number: "03",
    label: "AST Generation",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="8" x2="12" y2="14" />
        <circle cx="6" cy="19" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="12" y1="14" x2="6" y2="16" />
        <line x1="12" y1="14" x2="18" y2="16" />
      </svg>
    ),
    detailLabel: "AST GENERATION",
    detailText:
      "Converts parsed syntax trees into enriched abstract syntax trees with symbol resolution, scope analysis, and type annotations.",
  },
  {
    number: "04",
    label: "Call Graph Builder",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <line x1="9" y1="6" x2="15" y2="6" />
        <line x1="6" y1="9" x2="6" y2="15" />
        <line x1="18" y1="9" x2="18" y2="15" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </svg>
    ),
    detailLabel: "CALL GRAPH BUILDER",
    detailText:
      "Maps every function call, method invocation, and dependency edge. Produces a full call graph so you can trace execution paths across the entire repository.",
  },
  {
    number: "05",
    label: "Knowledge Graph",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <line x1="10" y1="4" x2="10" y2="20" />
      </svg>
    ),
    detailLabel: "KNOWLEDGE GRAPH",
    detailText:
      "Merges AST data and call graph edges into a unified knowledge graph. Enables multi-hop queries across files, modules, and packages.",
  },
  {
    number: "06",
    label: "Embedding Engine",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    detailLabel: "EMBEDDING ENGINE",
    detailText:
      "Generates semantic embeddings for every code chunk, docstring, and symbol. Powers meaning-based search that goes far beyond keyword matching.",
  },
  {
    number: "07",
    label: "Reasoning Engine",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    detailLabel: "REASONING ENGINE",
    detailText:
      "Combines structural and semantic context with LLM reasoning. Walks the call graph, reads source code, and produces grounded, cited answers.",
  },
  {
    number: "08",
    label: "CodeTrace AI Agent",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    detailLabel: "CODETRACE AI AGENT",
    detailText:
      "An autonomous agent that orchestrates all tools — graph traversal, code reading, semantic search — to answer complex engineering questions end-to-end.",
  },
  {
    number: "09",
    label: "Developer Response",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    detailLabel: "DEVELOPER RESPONSE",
    detailText:
      "A precise, cited answer with file paths, line numbers, and structural context. Ready to copy, review, or act on immediately.",
  },
];

export default function Architecture() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="architecture" id="architecture">
      <div className="container">
        <div className="architecture-header">
          <div className="section-label">Architecture</div>
          <h2 className="section-heading">
            A precise pipeline from
            <br />
            repository to reasoned
            <br />
            response.
          </h2>
          <p className="section-subheading">
            Hover a node to see what it does. Every stage is inspectable,
            swappable, and offline-first.
          </p>
        </div>

        <div className="pipeline-container">
          <div className="pipeline-steps">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`pipeline-step ${
                  activeStep === i ? "pipeline-step-active" : ""
                }`}
                onMouseEnter={() => setActiveStep(i)}
                onClick={() => setActiveStep(i)}
              >
                <div className="pipeline-step-icon">{step.icon}</div>
                <div className="pipeline-step-number">{step.number}</div>
                <div className="pipeline-step-label">{step.label}</div>
              </div>
            ))}
          </div>

          <div className="pipeline-detail">
            <div className="pipeline-detail-label">
              {steps[activeStep].detailLabel}
            </div>
            <div className="pipeline-detail-text">
              {steps[activeStep].detailText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
