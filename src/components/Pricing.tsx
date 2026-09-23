"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsLoading, setTermsLoading] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("pip install codetrace-ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openTermsModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setShowTermsModal(true);
    setTermsLoading(true);
    try {
      const res = await fetch("/api/terms");
      const data = await res.json();
      if (res.ok) {
        setTermsContent(data.content);
      } else {
        setTermsContent("Failed to load Terms & Conditions.");
      }
    } catch {
      setTermsContent("Failed to load Terms & Conditions.");
    } finally {
      setTermsLoading(false);
    }
  };

  const submitWaitlist = async () => {
    if (!email || !termsAccepted) return;

    setStatus("loading");
    setShowTermsModal(false);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, terms_accepted: termsAccepted }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list for early access!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 15;
    if (bottom) {
      setHasScrolledToBottom(true);
    }
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Pricing & Access</div>
          <h2 className="section-heading section-heading-gradient">
            100% Free & Open Source CLI.
            <br />
            Optimized Team Tier Coming Soon.
          </h2>
          <p className="section-subheading mx-auto">
            The core <strong>codetrace-ai</strong> package is completely free, MIT licensed, and runs entirely on your hardware. Join our waitlist for first access to the upcoming hosted team engine.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid-container reveal-on-scroll">
          {/* Community Open Source Plan */}
          <div className="pricing-plan-card">
            <span className="pricing-plan-badge free">Available on PyPI</span>
            <h3 className="pricing-plan-title">Community CLI</h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Full-featured local governed code intelligence for individual developers and air-gapped systems.
            </p>

            <div className="pricing-plan-price">
              <span>$0</span>
              <span className="period">/ free forever (MIT)</span>
            </div>

            <div className="pricing-plan-features">
              {[
                "100% Local & Air-Gapped (Zero cloud telemetry)",
                "Governed Pipeline Protocol with mandatory citations",
                "21 Language AST & Call Graph parsing",
                "Deterministic SQLite + NetworkX graph builder",
                "Automatic MCP registration (Cursor, Claude, VS Code)",
                "ChromaDB + FlashRank hybrid neural search",
                "SHA-256 Smart Delta Sync engine",
                "Interactive Architecture Visualizer (HTML map)",
                "Hardware-aware Ollama dynamic token budgeting",
              ].map((f) => (
                <div key={f} className="pricing-feature-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleCopyInstall}
            >
              {copied ? "✓ Copied: pip install codetrace-ai" : "pip install codetrace-ai 📋"}
            </button>
          </div>

          {/* CodeTrace AI Optimized Tier */}
          <div className="pricing-plan-card featured">
            <span className="pricing-plan-badge soon">✨ Coming Soon</span>
            <h3 className="pricing-plan-title">CodeTrace AI · Optimized</h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              High-throughput cloud-accelerated repository indexing, multi-repo workspaces, and collaborative team intelligence.
            </p>

            <div className="pricing-plan-price">
              <span style={{ fontSize: "36px" }}>Early Access</span>
              <span className="period">/ waitlist open</span>
            </div>

            <div className="pricing-plan-features">
              {[
                "Multi-repo cross-repository dependency tracing",
                "Real-time team call graphs & shared diff reviews",
                "Cloud-accelerated GPU embedding clusters",
                "Automated PR Blast Radius checks in CI/CD",
                "Private VPC / Enterprise SOC2 compliance",
                "Dedicated custom Tree-sitter AST grammar support",
              ].map((f) => (
                <div key={f} className="pricing-feature-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--accent-purple)", flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    style={{
                      filter: "blur(5px)",
                      userSelect: "none",
                      opacity: 0.75,
                      transition: "filter 0.3s ease, opacity 0.3s ease",
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {status === "success" ? (
              <div style={{ background: "rgba(63, 185, 80, 0.15)", border: "1px solid rgba(63, 185, 80, 0.3)", borderRadius: "8px", padding: "14px", color: "var(--accent-green)", textAlign: "center", fontSize: "14px" }}>
                ✓ {message}
              </div>
            ) : (
              <form onSubmit={openTermsModal} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="footer-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)" }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Joining..." : "Join Waitlist for Early Access →"}
                </button>
                {status === "error" && (
                  <div style={{ color: "var(--accent-red)", fontSize: "12.5px", textAlign: "center" }}>
                    {message}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="terms-modal-overlay">
          <div className="terms-modal-content">
            <div className="terms-modal-header">
              <h3>Terms and Conditions</h3>
            </div>
            <div className="terms-modal-body" onScroll={handleScroll}>
              {termsLoading ? (
                <p>Loading terms...</p>
              ) : (
                <ReactMarkdown>{termsContent}</ReactMarkdown>
              )}
            </div>
            <div className="terms-modal-footer">
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: hasScrolledToBottom ? "#FFFFFF" : "var(--text-tertiary)", cursor: hasScrolledToBottom ? "pointer" : "not-allowed" }}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  disabled={!hasScrolledToBottom}
                />
                <span>I have read and agree to the Terms & Conditions {!hasScrolledToBottom && "(Scroll to bottom to enable)"}</span>
              </label>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  className="btn-secondary"
                  style={{ padding: "8px 16px", fontSize: "13px" }}
                  onClick={() => setShowTermsModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  style={{ padding: "8px 18px", fontSize: "13px" }}
                  onClick={submitWaitlist}
                  disabled={!termsAccepted}
                >
                  Confirm & Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
