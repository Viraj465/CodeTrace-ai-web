"use client";

import React, { useState } from "react";

interface FileNode {
  name: string;
  isDir: boolean;
  indent?: boolean;
  symbolCount: number;
  dependents: string[];
  callers: string[];
  blastRadiusFiles: number;
  testImpactCount: number;
  diffSummary: string;
  diffCode: string;
}

const mockFiles: FileNode[] = [
  {
    name: "auth/jwt.py",
    isDir: false,
    symbolCount: 8,
    dependents: ["middleware/auth.py", "api/routes/users.py", "api/routes/admin.py"],
    callers: ["create_token()", "verify()", "decode_header()"],
    blastRadiusFiles: 6,
    testImpactCount: 14,
    diffSummary: "Refactor: Enforce strict RS256 algorithm verification to eliminate fallback CVEs",
    diffCode: `--- a/auth/jwt.py
+++ b/auth/jwt.py
@@ -42,4 +42,5 @@
-def verify(token: str, secret: str) -> dict:
-    return jwt.decode(token, secret)
+def verify(token: str, secret: str, algorithms: list = ["RS256"]) -> dict:
+    return jwt.decode(token, secret, algorithms=algorithms)
 [Awaiting Human Approval]`,
  },
  {
    name: "middleware/auth.py",
    isDir: false,
    symbolCount: 5,
    dependents: ["api/routes/users.py", "api/routes/admin.py"],
    callers: ["authenticate_request()", "rate_limit_guard()"],
    blastRadiusFiles: 4,
    testImpactCount: 8,
    diffSummary: "Fix: Sanitize incoming Bearer token headers against CRLF injection",
    diffCode: `--- a/middleware/auth.py
+++ b/middleware/auth.py
@@ -18,3 +18,4 @@
-    auth_header = request.headers.get("Authorization")
+    auth_header = sanitize_header(request.headers.get("Authorization", ""))
     token = auth_header.split(" ")[1]`,
  },
  {
    name: "api/routes/users.py",
    isDir: false,
    symbolCount: 12,
    dependents: ["api/routes/billing.py"],
    callers: ["get_user_profile()", "update_password()"],
    blastRadiusFiles: 3,
    testImpactCount: 6,
    diffSummary: "Feature: Add session invalidation trigger on password modification",
    diffCode: `--- a/api/routes/users.py
+++ b/api/routes/users.py
@@ -64,2 +64,3 @@
     user.set_password(new_password)
+    revoke_all_sessions(user.id)
     db.session.commit()`,
  },
  {
    name: "tests/test_auth.py",
    isDir: false,
    symbolCount: 16,
    dependents: [],
    callers: ["test_valid_jwt()", "test_expired_jwt()", "test_tampered_payload()"],
    blastRadiusFiles: 1,
    testImpactCount: 16,
    diffSummary: "Test: Add automated regression suites for RS256 algorithm enforcement",
    diffCode: `--- a/tests/test_auth.py
+++ b/tests/test_auth.py
@@ -88,3 +88,7 @@
+def test_algorithm_downgrade_rejected():
+    with pytest.raises(InvalidAlgorithmError):
+        verify(none_algorithm_token, key)`,
  },
];

export default function Demo() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [diffAccepted, setDiffAccepted] = useState<boolean | null>(null);
  const current = mockFiles[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setDiffAccepted(null);
  };

  return (
    <section className="playground-section" id="demo">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Live Playground</div>
          <h2 className="section-heading section-heading-gradient">
            Interactive Blast Radius & Governed Diff Engine
          </h2>
          <p className="section-subheading mx-auto">
            Click any file below to inspect its live call-graph dependents, blast radius impact score, and proposed safe diff preview.
          </p>
        </div>

        {/* Playground Window */}
        <div className="playground-window reveal-on-scroll">
          <div className="terminal-header">
            <div className="terminal-controls">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "monospace" }}>
              CodeTrace Dynamic Blast Radius & Diff Inspector
            </div>
            <div className="terminal-badge-confirmed">
              ● Deterministic AST
            </div>
          </div>

          <div className="playground-layout">
            {/* File Tree Sidebar */}
            <div className="playground-filetree">
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "12px" }}>
                Repository Files
              </div>
              {mockFiles.map((file, idx) => (
                <div
                  key={file.name}
                  className={`playground-file-item ${selectedIdx === idx ? "active" : ""}`}
                  onClick={() => handleSelect(idx)}
                >
                  <span>📄</span>
                  <span>{file.name}</span>
                </div>
              ))}
            </div>

            {/* Main Inspection Pane */}
            <div className="playground-content">
              {/* File Title & Stats */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF" }}>{current.name}</h3>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                    {current.symbolCount} Symbols Indexed · Call graph node verified
                  </div>
                </div>

                {/* Metrics Badges */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "6px 14px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#F87171" }}>{current.blastRadiusFiles}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Blast Radius</div>
                  </div>
                  <div style={{ background: "rgba(56, 189, 248, 0.12)", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "6px 14px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--accent-cyan)" }}>{current.testImpactCount}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Tests Affected</div>
                  </div>
                </div>
              </div>

              {/* Dependents & Callers List */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ background: "var(--bg-code)", padding: "14px", borderRadius: "8px", border: "1px solid var(--border-primary)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "6px" }}>
                    DOWNSTREAM DEPENDENTS
                  </div>
                  {current.dependents.length > 0 ? (
                    current.dependents.map((dep) => (
                      <div key={dep} style={{ fontSize: "12.5px", color: "#CBD5E1", fontFamily: "monospace", margin: "2px 0" }}>
                        ↳ {dep}
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>Leaf node (no callers)</div>
                  )}
                </div>

                <div style={{ background: "var(--bg-code)", padding: "14px", borderRadius: "8px", border: "1px solid var(--border-primary)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-purple)", marginBottom: "6px" }}>
                    EXTRACTED SYMBOLS
                  </div>
                  {current.callers.map((sym) => (
                    <div key={sym} style={{ fontSize: "12.5px", color: "#CBD5E1", fontFamily: "monospace", margin: "2px 0" }}>
                      ● {sym}
                    </div>
                  ))}
                </div>
              </div>

              {/* Proposed Diff Block */}
              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                    Human-in-the-Loop Diff Proposal
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                    {current.diffSummary}
                  </span>
                </div>

                <div style={{ background: "var(--bg-code)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", padding: "16px", fontFamily: "monospace", fontSize: "12.5px", color: "#E2E8F0" }}>
                  <pre style={{ margin: 0, overflowX: "auto" }}>
                    <code>{current.diffCode}</code>
                  </pre>
                </div>

                {/* Diff Action Controls */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "14px" }}>
                  {diffAccepted === null ? (
                    <>
                      <button
                        className="btn-secondary"
                        style={{ padding: "8px 16px", fontSize: "13px" }}
                        onClick={() => setDiffAccepted(false)}
                      >
                        Decline Diff ✕
                      </button>
                      <button
                        className="btn-primary"
                        style={{ padding: "8px 18px", fontSize: "13px" }}
                        onClick={() => setDiffAccepted(true)}
                      >
                        Apply Patch to Disk ✓
                      </button>
                    </>
                  ) : diffAccepted ? (
                    <div style={{ color: "var(--accent-green)", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                      ✓ Patch safely applied to disk. SHA-256 delta sync updated.
                    </div>
                  ) : (
                    <div style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>
                      Patch declined. No changes written to working directory.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
