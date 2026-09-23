"use client";

import React, { useState } from "react";
import TerminalWindowMockup from "./TerminalWindowMockup";

const evidenceStates = [
  {
    state: "CONFIRMED",
    badgeClass: "evidence-badge-confirmed-theme",
    title: "Live Tool Verified",
    summary: "Established directly by a live AST, symbol relation, or file snapshot tool execution in the active session.",
    rule: "Must cite exact file:line from tool output. No tool call = strictly prohibited from asserting as fact.",
    example: `[CONFIRMED] auth/jwt.py:42
def verify(token: str, secret: str) -> dict:
  # Established via live get_symbol_relations() call
  # Callers: middleware/auth.py:18, api/routes/users.py:88`,
  },
  {
    state: "INFERRED",
    badgeClass: "evidence-badge-inferred-theme",
    title: "Structural Deduction",
    summary: "Logical deduction derived from confirmed call patterns and graph topologies — strictly transparent.",
    rule: "Always prefixed with 'Based on the call pattern…' so developers know it is derived reasoning, not direct AST.",
    example: `[INFERRED] Based on the call pattern between auth/jwt.py and
middleware/auth.py: modifying verify() parameter signature
will cascade an authentication bypass exception across all protected routes.`,
  },
  {
    state: "UNRESOLVED",
    badgeClass: "evidence-badge-unresolved-theme",
    title: "Zero-Guessing Abstention",
    summary: "Insufficient or ambiguous evidence — the agent explicitly refuses to guess and specifies what is missing.",
    rule: "Halts speculation. Informs the user exactly which files are un-indexed or what symbol is unresolved.",
    example: `[UNRESOLVED] Symbol 'OAuthCallbackHandler' is referenced in routes/auth.py:14
but definition is not found in local index.
Action: Run 'codetrace index --fast' to include external vendor packages.`,
  },
];

const investigationSteps = [
  {
    num: "01",
    name: "search_codebase",
    desc: "Hybrid semantic search (BGE + E5 + RRF + FlashRank reranker) retrieves candidate files.",
  },
  {
    num: "02",
    name: "get_symbol_relations",
    desc: "Traverses SQLite + NetworkX call graph to identify callers, callees, and imports.",
  },
  {
    num: "03",
    name: "read_file",
    desc: "Reads exact line ranges from indexed DB snapshots with path traversal safeguards.",
  },
  {
    num: "04",
    name: "analyze_impact",
    desc: "Calculates transitive blast radius across modules, routes, and test suites.",
  },
  {
    num: "05",
    name: "governed_report",
    desc: "Compiles evidence-graded response with mandatory file:line citations & output normalization.",
  },
];

export default function GovernedProtocol() {
  const [selectedState, setSelectedState] = useState(0);

  return (
    <section className="governed-section" id="protocol">
      <div className="container">
        {/* Section Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">
            Governed Pipeline Protocol
          </div>
          <h2 className="section-heading section-heading-gradient">
            Moving AI Coding from Hallucinated Guessing
            <br />
            to Governed Deterministic Execution.
          </h2>
          <p className="section-subheading mx-auto">
            AI coding agents break production systems because they operate on unverified assumptions. CodeTrace AI enforces a formal evidence governance layer at the agent-loop level: every structural assertion must carry live verification.
          </p>
        </div>

        {/* 3 Evidence States Grid */}
        <div className="evidence-cards-grid">
          {evidenceStates.map((item, idx) => (
            <div
              key={item.state}
              className={`evidence-card reveal-on-scroll delay-${(idx + 1) * 100} ${
                selectedState === idx ? "active" : ""
              }`}
              onClick={() => setSelectedState(idx)}
            >
              <div className={`evidence-badge-top ${item.badgeClass}`}>
                <span>●</span> {item.state}
              </div>
              <h3 className="evidence-card-title">{item.title}</h3>
              <p className="evidence-card-desc">{item.summary}</p>
              
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "12px" }}>
                <strong>Rule:</strong> {item.rule}
              </div>

              <div className="evidence-code-preview">
                <pre style={{ margin: 0, overflowX: "auto" }}>
                  <code>{item.example}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Live CLI Session Visual Mockup Frame */}
        <div className="reveal-on-scroll" style={{ marginBottom: "56px", maxWidth: "1050px", margin: "0 auto 56px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ● Live CLI Session
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", marginTop: "4px" }}>
              Autonomous AI Architect Booting with Hardware Context Sizing
            </h3>
          </div>

          <TerminalWindowMockup
            src="/images/chatcmd.png"
            alt="CodeTrace Live Governed Chat Session in CLI"
            title="~/projects/codetrace · codetrace chat"
            badgeText="Evidence Governed"
            floatingBadges={[
              { text: "16 CPU Cores Detected", top: "18%", left: "6%", theme: "cyan", icon: "⚡" },
              { text: "Local Graph & Index", bottom: "25%", right: "8%", theme: "green", icon: "🔒" },
            ]}
            caption="Real capture of `codetrace chat` session with environment auto-sizing and session persistence."
          />
        </div>

        {/* Investigation Pipeline Flow */}
        <div className="protocol-sequence-box reveal-on-scroll">
          <div className="protocol-sequence-header">
            🏛️ The 5-Stage Autonomous Investigation Loop
          </div>
          <p className="protocol-sequence-subtitle">
            Applied in the narrowest sequence necessary. Enforced in the agent loop, not just the prompt: no tool evidence, no structural claim.
          </p>

          <div className="protocol-steps-flow">
            {investigationSteps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="protocol-flow-node">
                  <div className="protocol-flow-num">STEP {step.num}</div>
                  <div className="protocol-flow-name">{step.name}</div>
                  <p style={{ fontSize: "11.5px", color: "var(--text-tertiary)", marginTop: "6px", lineHeight: 1.4 }}>
                    {step.desc}
                  </p>
                </div>
                {idx < investigationSteps.length - 1 && (
                  <div className="protocol-flow-arrow">➔</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4 Structural Governance Rules */}
        <div className="structural-rules-grid reveal-on-scroll">
          <div className="structural-rule-item">
            <div className="structural-rule-icon">1</div>
            <div className="structural-rule-text">
              <strong>No Tool, No Claim:</strong> Framework conventions and pre-training data are not evidence. Facts must originate from live AST tool executions.
            </div>
          </div>
          <div className="structural-rule-item">
            <div className="structural-rule-icon">2</div>
            <div className="structural-rule-text">
              <strong>Mandatory Citations:</strong> Every structural assertion carries an exact <code>file:line</code> citation from tool output. No citation → no claim.
            </div>
          </div>
          <div className="structural-rule-item">
            <div className="structural-rule-icon">3</div>
            <div className="structural-rule-text">
              <strong>Memory Is Context:</strong> Prior session summaries are context, never evidence. Recalled citations are invalid until re-verified live.
            </div>
          </div>
          <div className="structural-rule-item">
            <div className="structural-rule-icon">4</div>
            <div className="structural-rule-text">
              <strong>Output Normalizer:</strong> Response consistency layer normalizes markdown, code fences (`py` → `python`), and bullets across 7B Ollama to frontier models.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
