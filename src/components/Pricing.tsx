"use client";

import React, { useState } from "react";

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
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

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="pricing-header">
          <div className="section-label section-label-centered">Pricing</div>
          <h2 className="section-heading">
            Free today. Optimized tier
            <br />
            launching soon.
          </h2>
          <p className="section-subheading" style={{ textAlign: "center" }}>
            The open-source <strong>codetrace-ai</strong> CLI is free for
            everyone. A faster, hosted, deeply-optimized CodeTrace AI is
            coming — join the waitlist for first access.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Open Source Card */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <span className="pricing-card-tier">Try <br />CodeTrace AI</span>
              <span className="pricing-badge pricing-badge-available">
                Available now
              </span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">$0</span>
              <span className="pricing-period">forever</span>
            </div>
            <p className="pricing-description">
              Use the CLI on any repo, on your machine.
            </p>
            <div className="pricing-features">
              {[
                "Full repository indexing",
                "Call graph & blast radius",
                "Semantic & structural search",
                "Safe AI patch proposals",
                "Multi-language support",
                "Offline-first architecture",
              ].map((feature) => (
                <div key={feature} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button
              className="pricing-cta pricing-cta-install"
              onClick={() => {
                navigator.clipboard.writeText("pip install codetrace-ai");
              }}
            >
              pip install codetrace-ai
            </button>
          </div>

          {/* Optimized Card */}
          <div className="pricing-card pricing-card-optimized">
            <div className="pricing-card-header">
              <span className="pricing-card-tier">
                CodeTrace AI · Optimized
              </span>
              <span className="pricing-badge pricing-badge-soon">
                ✨ Launching soon
              </span>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount pricing-amount-soon">Soon</span>
              <span className="pricing-period">priced at launch</span>
            </div>
            <p className="pricing-description">
              A hosted, deeply optimized CodeTrace AI is on the way — faster
              indexing, smarter reasoning, team workflows. Join the waitlist
              for first access and early-adopter pricing.
            </p>
            <div className="pricing-features">
              {[
                "Xxxxx-xxxxxx xxxxxxx xxxx xxxx xxxxxxx",
                "Xxxxxx xxxxxxxxxx & xxxxxxxxx xxxxxx",
                "Xxxx-xxxxxxx xxxxxxxxxxxxx",
                "Xxxxxxx XXX & xxxxxxxxxx xxxxxxxx",
                "Xxxxxxxx xxxxxxx",
              ].map((feature, index) => (
                <div key={index} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span style={{ filter: "blur(4px)", userSelect: "none", opacity: 0.8 }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {status === "success" ? (
              <div className="waitlist-success">{message}</div>
            ) : (
              <form className="waitlist-form" onSubmit={handleWaitlist}>
                <input
                  type="email"
                  className="waitlist-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="pricing-cta pricing-cta-waitlist"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? "Joining..."
                    : "Join Waitlist for Early Access"}
                </button>
                {status === "error" && (
                  <div className="waitlist-error">{message}</div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
