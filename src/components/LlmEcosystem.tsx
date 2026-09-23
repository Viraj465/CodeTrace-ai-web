"use client";

import React, { useState } from "react";
import TerminalWindowMockup from "./TerminalWindowMockup";

const providers = [
  { name: "Anthropic", tag: "Native Messages API", note: "Claude 3.5 Sonnet / Opus / Haiku" },
  { name: "OpenAI", tag: "OpenAI-compatible", note: "GPT-4o, o1, o3-mini" },
  { name: "Ollama (Local)", tag: "100% Offline & Free", note: "DeepSeek-R1, Qwen2.5-Coder, Llama 3.3" },
  { name: "Groq", tag: "Ultra-Fast Inference", note: "Llama-3.3-70B, DeepSeek R1" },
  { name: "Google Gemini", tag: "1M+ Context", note: "Gemini 1.5 Pro / Flash, 2.0 Flash" },
  { name: "OpenRouter", tag: "Unified Router", note: "Access 200+ models via single key" },
  { name: "Custom Endpoint", tag: "Any OpenAI / Anthropic API", note: "DeepSeek, vLLM, LM Studio, Mistral, Local Gateway" },
];

export default function LlmEcosystem() {
  const [apiStyle, setApiStyle] = useState<"openai" | "anthropic">("openai");
  const [baseUrl, setBaseUrl] = useState("https://api.deepseek.com/v1");
  const [modelName, setModelName] = useState("deepseek-chat");
  const [apiKey, setApiKey] = useState("");
  const [activeEcosystemTab, setActiveEcosystemTab] = useState(0);

  const generatedConfig = {
    provider: "custom",
    api_style: apiStyle,
    base_url: baseUrl,
    api_key: apiKey ? "••••••••" : undefined,
    model_name: modelName,
  };

  return (
    <section className="llm-section" id="llms">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">LLM Ecosystem</div>
          <h2 className="section-heading section-heading-gradient">
            Connect Any Model. From 7B Local to Frontier Cloud.
          </h2>
          <p className="section-subheading mx-auto">
            CodeTrace ships with six native providers out of the box plus a universal <code>custom</code> option for self-hosted vLLM, LM Studio, DeepSeek, or corporate proxies.
          </p>
        </div>

        {/* Provider Pills */}
        <div className="llm-provider-pills reveal-on-scroll">
          {providers.map((p) => (
            <div key={p.name} className="llm-provider-pill">
              <span style={{ color: "var(--accent-cyan)" }}>●</span>
              <span>{p.name}</span>
              <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>({p.tag})</span>
            </div>
          ))}
        </div>

        {/* Interactive Custom Endpoint Configurator */}
        <div className="llm-custom-builder reveal-on-scroll">
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
              🛠️ Interactive Custom Endpoint Configurator
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Test your endpoint settings. CodeTrace prompts for these during <code>codetrace config</code> and stores them at <code>~/.codetrace/config.json</code>.
            </p>

            <div className="llm-form-group">
              <label className="llm-form-label">API Style</label>
              <select
                className="llm-form-select"
                value={apiStyle}
                onChange={(e) => {
                  const style = e.target.value as "openai" | "anthropic";
                  setApiStyle(style);
                  if (style === "anthropic") {
                    setBaseUrl("https://api.anthropic.com");
                    setModelName("claude-3-5-sonnet-20241022");
                  } else {
                    setBaseUrl("https://api.deepseek.com/v1");
                    setModelName("deepseek-chat");
                  }
                }}
              >
                <option value="openai">OpenAI Compatible ({baseUrl}/chat/completions)</option>
                <option value="anthropic">Anthropic Compatible ({baseUrl}/v1/messages)</option>
              </select>
            </div>

            <div className="llm-form-group">
              <label className="llm-form-label">API Base URL</label>
              <input
                type="text"
                className="llm-form-input"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="e.g. http://localhost:8000/v1 or https://api.deepseek.com/v1"
              />
            </div>

            <div className="llm-form-group">
              <label className="llm-form-label">Model Name</label>
              <input
                type="text"
                className="llm-form-input"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="e.g. deepseek-chat or Qwen/Qwen2.5-Coder-32B"
              />
            </div>

            <div className="llm-form-group">
              <label className="llm-form-label">API Key (Optional for local/self-hosted endpoints)</label>
              <input
                type="password"
                className="llm-form-input"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Leave blank for unauthenticated LM Studio / vLLM"
              />
            </div>
          </div>

          {/* Right: Live Config Preview */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                ~/.codetrace/config.json
              </span>
              <span style={{ fontSize: "11px", color: "var(--accent-cyan)", fontWeight: 600 }}>
                Live Generated
              </span>
            </div>
            <div style={{ background: "var(--bg-code)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "20px" }}>
              <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "13px", color: "#E2E8F0" }}>
                <code>{JSON.stringify(generatedConfig, null, 2)}</code>
              </pre>
            </div>

            <div style={{ marginTop: "20px", padding: "14px", background: "rgba(56, 189, 248, 0.06)", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "8px" }}>
              <div style={{ fontSize: "12.5px", color: "var(--accent-cyan)", fontWeight: 600, marginBottom: "4px" }}>
                💡 Verified Working Endpoints:
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                DeepSeek (deepseek-chat), LM Studio (localhost:1234), vLLM (localhost:8000), Fireworks, Mistral, Together, Cerebras, Nebius, and internal enterprise gateways.
              </div>
            </div>
          </div>
        </div>

        {/* Live CLI Model Discovery & Setup Visuals Framed */}
        <div style={{ marginTop: "56px" }} className="reveal-on-scroll">
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              ● Real Configuration & Model Enumeration
            </span>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", marginTop: "4px" }}>
              Dynamic Endpoint Setup & Live API Model Querying
            </h3>
          </div>

          {/* Interactive Ecosystem Visual Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <button
              onClick={() => setActiveEcosystemTab(0)}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid",
                borderColor: activeEcosystemTab === 0 ? "rgba(56, 189, 248, 0.6)" : "rgba(255, 255, 255, 0.1)",
                background: activeEcosystemTab === 0 ? "rgba(56, 189, 248, 0.15)" : "rgba(11, 16, 24, 0.6)",
                color: activeEcosystemTab === 0 ? "#FFFFFF" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              ⚙️ Custom Nvidia Gateway
            </button>
            <button
              onClick={() => setActiveEcosystemTab(1)}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid",
                borderColor: activeEcosystemTab === 1 ? "rgba(139, 92, 246, 0.6)" : "rgba(255, 255, 255, 0.1)",
                background: activeEcosystemTab === 1 ? "rgba(139, 92, 246, 0.15)" : "rgba(11, 16, 24, 0.6)",
                color: activeEcosystemTab === 1 ? "#FFFFFF" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              🧠 AI Brain Provider Wizard
            </button>
            <button
              onClick={() => setActiveEcosystemTab(2)}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid",
                borderColor: activeEcosystemTab === 2 ? "rgba(63, 185, 80, 0.6)" : "rgba(255, 255, 255, 0.1)",
                background: activeEcosystemTab === 2 ? "rgba(63, 185, 80, 0.15)" : "rgba(11, 16, 24, 0.6)",
                color: activeEcosystemTab === 2 ? "#FFFFFF" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              ⚡ Live Model Discovery (37 Models)
            </button>
          </div>

          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {activeEcosystemTab === 0 && (
              <TerminalWindowMockup
                src="/images/configcmd.png"
                alt="CodeTrace Config Custom Nvidia Provider CLI"
                title="Terminal · codetrace config --custom"
                badgeText="Custom Nvidia NIM Gateway"
                floatingBadges={[
                  { text: "Nvidia API Base Configured", top: "25%", right: "6%", theme: "purple", icon: "🌐" },
                  { text: "Context Window Auto-Detect", bottom: "25%", left: "6%", theme: "cyan", icon: "⚡" },
                ]}
                caption="Configure custom provider endpoints and authenticate securely."
              />
            )}

            {activeEcosystemTab === 1 && (
              <TerminalWindowMockup
                src="/images/model.jpeg"
                alt="CodeTrace Reconfigure AI Brain CLI Setup"
                title="Terminal · codetrace config"
                badgeText="Interactive Provider Wizard"
                floatingBadges={[
                  { text: "Fetching Gemini Models...", top: "35%", right: "10%", theme: "cyan", icon: "⚡" },
                  { text: "37 Models Across 6 Families", bottom: "18%", left: "6%", theme: "purple", icon: "🧠" },
                ]}
                caption="Select from 6 native providers or custom endpoints."
              />
            )}

            {activeEcosystemTab === 2 && (
              <TerminalWindowMockup
                src="/images/provider-model-list.png"
                alt="Live Provider Model Listing CLI"
                title="API Response · Live Model Discovery"
                badgeText="37 Dynamic Models"
                floatingBadges={[
                  { text: "37 Models Fetched Live", top: "20%", left: "6%", theme: "green", icon: "✓" },
                  { text: "Gemini 2.5 / 3.0 / 3.7 & Custom", bottom: "20%", right: "6%", theme: "cyan", icon: "✨" },
                ]}
                caption="Dynamic API query enumerating all available model variants."
              />
            )}
          </div>
        </div>

        {/* Hardware-Aware Ollama Memory Matrix */}
        <div style={{ marginTop: "60px" }} className="reveal-on-scroll">
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px", textAlign: "center" }}>
            🔒 Privacy-First & Hardware-Aware Ollama Recommendations
          </h3>
          <p style={{ fontSize: "14.5px", color: "var(--text-secondary)", textAlign: "center", maxWidth: "700px", margin: "0 auto 32px" }}>
            CodeTrace automatically detects your GPU VRAM, sizes <code>num_ctx</code> safely, and backs off on CPU memory pressure so your system never hangs.
          </p>

          <div className="ram-matrix-grid">
            <div className="ram-matrix-card">
              <div className="ram-matrix-header">
                <span className="ram-matrix-title">8 GB RAM</span>
                <span className="ram-matrix-badge" style={{ background: "rgba(56, 189, 248, 0.15)", color: "var(--accent-cyan)" }}>
                  Entry Level
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                Fast inference on ultrabooks and standard laptops.
              </p>
              <div style={{ fontSize: "12.5px", fontFamily: "monospace", color: "#E2E8F0", lineHeight: 1.8 }}>
                <div>• qwen2.5-coder:7b</div>
                <div>• deepseek-r1:7b</div>
                <div>• phi4-mini</div>
              </div>
            </div>

            <div className="ram-matrix-card" style={{ borderColor: "var(--accent-cyan)" }}>
              <div className="ram-matrix-header">
                <span className="ram-matrix-title">16 GB RAM</span>
                <span className="ram-matrix-badge" style={{ background: "rgba(63, 185, 80, 0.15)", color: "var(--accent-green)" }}>
                  ★ Sweet Spot
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                Optimal balance of speed and deep structural reasoning.
              </p>
              <div style={{ fontSize: "12.5px", fontFamily: "monospace", color: "#E2E8F0", lineHeight: 1.8 }}>
                <div>• qwen2.5-coder:14b</div>
                <div>• deepseek-r1:14b</div>
                <div>• gemma3:12b</div>
              </div>
            </div>

            <div className="ram-matrix-card">
              <div className="ram-matrix-header">
                <span className="ram-matrix-title">32 GB+ RAM</span>
                <span className="ram-matrix-badge" style={{ background: "rgba(139, 92, 246, 0.15)", color: "var(--accent-purple)" }}>
                  Pro / Frontier Local
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                Near frontier-level reasoning entirely on your workstation.
              </p>
              <div style={{ fontSize: "12.5px", fontFamily: "monospace", color: "#E2E8F0", lineHeight: 1.8 }}>
                <div>• qwen2.5-coder:32b</div>
                <div>• deepseek-r1:32b</div>
                <div>• devstral:24b</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
