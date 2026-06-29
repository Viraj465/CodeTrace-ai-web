"use client";

import React, { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    setStatus("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <footer>
      <div className="footer-cta">
        <div className="container">
          <h2 className="footer-heading">
            Build Faster.
            <br />
            Understand Better.
          </h2>
          <p className="footer-subheading">
            Stop guessing how code works. CodeTrace AI gives you structural
            certainty — from first clone to confident shipping.
          </p>
          <div className="footer-buttons">
            <a href="#pricing" className="btn-primary">
              Get Started <span>→</span>
            </a>
            <a
              href="https://github.com/Viraj465/CodeTrace-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container footer-main-inner">
          <div className="footer-contact-section">
            <h3 className="footer-contact-title">Get in Touch</h3>
            <p className="footer-contact-subtitle">Have questions or feedback? Send us a message.</p>
            <form className="footer-contact-form" onSubmit={handleSubmit}>
              <div className="footer-contact-form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="footer-contact-input"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="footer-contact-input"
                />
              </div>
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="footer-contact-textarea"
              ></textarea>
              <button type="submit" className="footer-contact-submit">
                Send Message
              </button>
              {status && <p className="footer-contact-status">{status}</p>}
            </form>
          </div>

          <div className="footer-info-section">
            <div className="footer-info-content">
              <div className="footer-info-block">
                <h4>About CodeTrace AI</h4>
                <p>The ultimate tool for understanding complex codebases through structural analysis and AI-powered insights.</p>
              </div>
              <div className="footer-info-block">
                <h4>Quick Links</h4>
                <div className="footer-info-links">
                  <a href="#features">Features</a>
                  <a href="#architecture">Architecture</a>
                  <a href="#demo">Demo</a>
                  <a href="#pricing">Pricing</a>
                </div>
              </div>
              <div className="footer-info-block">
                <h4>Connect</h4>
                <div className="footer-info-socials">
                  <a href="https://github.com/Viraj465/CodeTrace-ai" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://x.com/__viraj__1" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
                  <a href="mailto:sawaantviraj465@gmail.com">Email</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-copyright">
            © {new Date().getFullYear()} CodeTrace AI. All rights reserved.
          </span>

          {/* Social & contact links */}
          <div className="footer-links">
            <a
              href="https://github.com/Viraj465/CodeTrace-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5, verticalAlign: "-2px" }}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/__viraj__1"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5, verticalAlign: "-2px" }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
            <a
              href="https://pypi.org/project/codetrace-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 5, verticalAlign: "-2px" }}>
                <path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.617H5.92S3 7.28 3 11.79s2.555 4.344 2.555 4.344h1.524v-2.09s-.082-2.555 2.513-2.555l.993.003zm-.457-5.063a.814.814 0 01-.813-.816.814.814 0 01.813-.815.814.814 0 01.815.815.814.814 0 01-.815.816z" />
                <path d="M14.415 12.308h-4.328s-2.432-.039-2.432 2.35v3.951S7.286 21 12.064 21c4.574 0 4.289-1.983 4.289-1.983l-.006-2.055h-4.363v-.617h6.096S21 16.72 21 12.21s-2.555-4.344-2.555-4.344H16.92v2.09s.082 2.555-2.513 2.555l-.993-.003zm.457 5.063a.814.814 0 01.813.816.814.814 0 01-.813.815.814.814 0 01-.815-.815.814.814 0 01.815-.816z" />
              </svg>
              PyPI
            </a>
            <a
              href="mailto:sawaantviraj465@gmail.com"
              className="footer-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5, verticalAlign: "-2px" }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
              </svg>
              Contact
            </a>
            <a href="#" className="footer-link">
              Privacy
            </a>
            <a href="#" className="footer-link">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
