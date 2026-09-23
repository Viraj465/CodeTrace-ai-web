"use client";

import React, { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Thank you! Your message has been received.");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Call to Action Banner */}
        <div className="footer-top-cta reveal-on-scroll">
          <h2 className="footer-top-heading">
            Ship with Structural Certainty.
            <br />
            Stop Guessing How Code Works.
          </h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "28px", lineHeight: 1.6 }}>
            Give your AI coding agents and engineering team deterministic call graphs, verified blast radius, and answers that cite their evidence.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a href="#pricing" className="btn-primary">
              Get Started Free <span>→</span>
            </a>
            <a
              href="https://join.slack.com/t/codetraceaicommunity/shared_invite/zt-426wp89up-7bgYODTfYeKLE~psG5Jy8Q"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Join Slack Community 💬
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main-grid reveal-on-scroll">
          {/* Contact Form */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
              Get in Touch
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Questions about enterprise setups, custom AST grammars, or feedback? Send us a note.
            </p>

            <form className="footer-contact-form" onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="footer-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="footer-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <textarea
                placeholder="Your Message..."
                rows={3}
                className="footer-textarea"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <button
                type="submit"
                className="btn-secondary"
                style={{ alignSelf: "flex-start", padding: "10px 20px", fontSize: "13.5px" }}
              >
                Send Message →
              </button>
              {status && (
                <div style={{ color: "var(--accent-green)", fontSize: "13px", fontWeight: 600 }}>
                  ✓ {status}
                </div>
              )}
            </form>
          </div>

          {/* Links Columns */}
          <div className="footer-links-columns">
            <div>
              <div className="footer-column-title">Product</div>
              <div className="footer-links-list">
                <a href="#protocol" className="footer-link-item">Governed Protocol</a>
                <a href="#features" className="footer-link-item">Core Features</a>
                <a href="#architecture" className="footer-link-item">8-Stage Pipeline</a>
                <a href="#tools" className="footer-link-item">Agentic Tools (7)</a>
                <a href="#mcp" className="footer-link-item">MCP & IDE Hub</a>
                <a href="#demo" className="footer-link-item">Live Playground</a>
              </div>
            </div>

            <div>
              <div className="footer-column-title">Developers</div>
              <div className="footer-links-list">
                <a href="#cli" className="footer-link-item">CLI Reference</a>
                <a href="#llms" className="footer-link-item">LLM Providers & Custom</a>
                <a href="#languages" className="footer-link-item">21 Languages Matrix</a>
                <a href="#whats-new" className="footer-link-item">What's New in v1.0.3</a>
                <a href="#changelog" className="footer-link-item">Release Notes</a>
                <a
                  href="https://pypi.org/project/codetrace-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  PyPI Package ↗
                </a>
                <a
                  href="https://dev.to/viraj465/codetrace-ai-v101-ai-powered-code-intelligence-with-sha-256-delta-sync-interactive-code-graphs-257i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  Dev.to Deep Dive ↗
                </a>
              </div>
            </div>

            <div>
              <div className="footer-column-title">Community</div>
              <div className="footer-links-list">
                <a
                  href="https://github.com/Viraj465/CodeTrace-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  GitHub Repository ↗
                </a>
                <a
                  href="https://join.slack.com/t/codetraceaicommunity/shared_invite/zt-426wp89up-7bgYODTfYeKLE~psG5Jy8Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  Slack Community ↗
                </a>
                <a
                  href="https://x.com/__viraj__1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  X (Twitter) ↗
                </a>
                <a
                  href="mailto:sawaantviraj465@gmail.com"
                  className="footer-link-item"
                >
                  Email Creator
                </a>
                <a
                  href="https://github.com/Viraj465/CodeTrace-ai/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  MIT License
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} CodeTrace AI. Authored by Viraaj Sawant. MIT Licensed.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <span>Deterministic Call Graphs</span>
            <span>·</span>
            <span>Local-First & Air-Gap Ready</span>
            <span>·</span>
            <span>Evidence-Cited Answers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
