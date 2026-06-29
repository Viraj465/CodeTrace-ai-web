"use client";

import React, { useState } from "react";

const files = [
  { name: "📁 src/", indent: false, isDir: true },
  { name: "📄 auth/jwt.py", indent: true, isDir: false },
  { name: "📄 auth/oauth.py", indent: true, isDir: false },
  { name: "📄 middleware/auth.py", indent: true, isDir: false },
  { name: "📄 middleware/rate_limiter.py", indent: true, isDir: false },
  { name: "📄 api/routes/users.py", indent: true, isDir: false },
  { name: "📄 api/routes/admin.py", indent: true, isDir: false },
  { name: "📄 models/user.py", indent: true, isDir: false },
  { name: "📁 tests/", indent: false, isDir: true },
  { name: "📄 test_auth.py", indent: true, isDir: false },
  { name: "📄 test_users.py", indent: true, isDir: false },
];

export default function Demo() {
  const [activeFile, setActiveFile] = useState(1);

  return (
    <section className="demo" id="demo">
      <div className="container">
        <div className="demo-header">
          <div className="section-label">Product</div>
          <h2 className="section-heading">
            A developer tool — not
            <br />
            another chatbot.
          </h2>
          <p className="section-subheading">
            CodeTrace AI runs locally, indexes your repository offline, and
            gives you an intelligent interface to explore, query, and
            understand your codebase.
          </p>
        </div>

        <div className="demo-panel">
          {/* Sidebar */}
          <div className="demo-sidebar">
            <div className="demo-sidebar-header">Repository</div>
            {files.map((file, i) => (
              <div
                key={i}
                className={`demo-file ${
                  file.indent ? "demo-file-indent" : ""
                } ${activeFile === i ? "demo-file-active" : ""}`}
                onClick={() => setActiveFile(i)}
              >
                {file.name}
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="demo-main">
            <div className="demo-main-header">
              <h3 className="demo-main-title">Dependency Graph</h3>
              <span className="demo-main-badge">Live Analysis</span>
            </div>

            <p className="demo-explanation">
              <strong>auth/jwt.py</strong> is a critical authentication module.
              It exports <code style={{ color: "var(--accent-cyan)" }}>create_token()</code>{" "}
              and <code style={{ color: "var(--accent-cyan)" }}>verify()</code>,
              consumed by 4 downstream modules. Modifying this file has a
              blast radius of <strong>8 files</strong> including 2 test suites.
            </p>

            <div className="demo-stats">
              <div className="demo-stat">
                <div className="demo-stat-value">12</div>
                <div className="demo-stat-label">Dependencies</div>
              </div>
              <div className="demo-stat">
                <div className="demo-stat-value">4</div>
                <div className="demo-stat-label">Dependents</div>
              </div>
              <div className="demo-stat">
                <div className="demo-stat-value">8</div>
                <div className="demo-stat-label">Blast Radius</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
