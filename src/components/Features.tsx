"use client";

import React from "react";

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <div className="section-label">Features</div>
          <h2 className="section-heading">
            Built for engineers who read
            <br />
            more code than they write.
          </h2>
          <p className="section-subheading">
            A precise toolkit for navigating unfamiliar repositories — from
            first clone to confident shipping.
          </p>
        </div>

        <div className="features-grid">
          {/* Card 1: Autonomous Code Research */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3 className="feature-title">Autonomous Code Research</h3>
            <p className="feature-description">
              Ask anything about a repo in natural language. The agent traverses
              files, references, and semantic context to answer with citations
              to exact lines.
            </p>
            <div className="feature-code">
              <div className="feature-code-comment"># question</div>
              <div>
                <span className="feature-code-keyword">Where is </span>
                <span className="feature-code-highlight">UserToken</span>
                <span className="feature-code-keyword">
                  {" "}
                  created and validated?
                </span>
              </div>
              <div style={{ height: 12 }} />
              <div className="feature-code-comment"># answer</div>
              <div>
                <span className="feature-code-highlight">auth/jwt.py:42</span>
                <span className="feature-code-keyword"> issues tokens via </span>
                <span className="feature-code-method">create_token()</span>
                <span className="feature-code-keyword">, validated by </span>
                <span className="feature-code-method">verify()</span>
                <span className="feature-code-keyword"> in</span>
              </div>
              <div>
                <span className="feature-code-highlight">
                  middleware/auth.py:18
                </span>
                <span className="feature-code-keyword">.</span>
              </div>
              <div className="feature-code-tags">
                <span className="feature-code-tag">3 references</span>
                <span className="feature-code-tag">6 callers</span>
              </div>
            </div>
          </div>

          {/* Card 2: Structural Call Graph */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="8.5" y1="7.5" x2="15.5" y2="16.5" />
                <line x1="15.5" y1="7.5" x2="8.5" y2="16.5" />
              </svg>
            </div>
            <h3 className="feature-title">Structural Call Graph</h3>
            <p className="feature-description">
              Visualize every function call, dependency, and execution path.
              Trace how a single change ripples across modules.
            </p>
            <div className="feature-graph">
              <svg viewBox="0 0 400 180" fill="none">
                {/* Edges */}
                <line x1="200" y1="30" x2="100" y2="90" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
                <line x1="200" y1="30" x2="300" y2="90" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
                <line x1="100" y1="90" x2="60" y2="150" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
                <line x1="100" y1="90" x2="160" y2="150" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
                <line x1="300" y1="90" x2="260" y2="150" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
                <line x1="300" y1="90" x2="340" y2="150" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
                {/* Nodes */}
                <circle cx="200" cy="30" r="8" fill="#0D1117" stroke="#38BDF8" strokeWidth="1.5" />
                <circle cx="100" cy="90" r="7" fill="#0D1117" stroke="#38BDF8" strokeWidth="1.5" />
                <circle cx="300" cy="90" r="7" fill="#0D1117" stroke="#38BDF8" strokeWidth="1.5" />
                <circle cx="60" cy="150" r="6" fill="#0D1117" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
                <circle cx="160" cy="150" r="6" fill="#0D1117" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
                <circle cx="260" cy="150" r="6" fill="#0D1117" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
                <circle cx="340" cy="150" r="6" fill="#0D1117" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" />
                {/* Inner glow dots */}
                <circle cx="200" cy="30" r="3" fill="#38BDF8" opacity="0.6" />
                <circle cx="100" cy="90" r="2.5" fill="#38BDF8" opacity="0.5" />
                <circle cx="300" cy="90" r="2.5" fill="#38BDF8" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Card 3: Blast Radius Analysis */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 className="feature-title">Blast Radius Analysis</h3>
            <p className="feature-description">
              Before you edit production code, see exactly which files, tests,
              and consumers will be impacted. Ship without surprises.
            </p>
            <div className="feature-impact-list">
              <div className="feature-impact-item">
                <span className="feature-impact-icon" style={{ color: "#F85149" }}>●</span>
                <span className="feature-impact-file">auth/jwt.py</span>
                <span className="feature-impact-label">direct change</span>
              </div>
              <div className="feature-impact-item">
                <span className="feature-impact-icon" style={{ color: "#FEBC2E" }}>●</span>
                <span className="feature-impact-file">middleware/auth.py</span>
                <span className="feature-impact-label">1-hop dependent</span>
              </div>
              <div className="feature-impact-item">
                <span className="feature-impact-icon" style={{ color: "#FEBC2E" }}>●</span>
                <span className="feature-impact-file">api/routes/users.py</span>
                <span className="feature-impact-label">1-hop dependent</span>
              </div>
              <div className="feature-impact-item">
                <span className="feature-impact-icon" style={{ color: "var(--accent-cyan)" }}>●</span>
                <span className="feature-impact-file">tests/test_auth.py</span>
                <span className="feature-impact-label">test coverage</span>
              </div>
              <div className="feature-impact-item">
                <span className="feature-impact-icon" style={{ color: "var(--text-tertiary)" }}>●</span>
                <span className="feature-impact-file">api/routes/admin.py</span>
                <span className="feature-impact-label">2-hop dependent</span>
              </div>
            </div>
          </div>

          {/* Card 4: Semantic Repository Search */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="feature-title">Semantic Repository Search</h3>
            <p className="feature-description">
              Find relevant code by meaning, not keywords. Embedding-powered
              retrieval understands intent across files and languages.
            </p>
            <div className="feature-search-input">
              <span className="feature-search-input-icon">🔍</span>
              <span className="feature-search-input-text">
                &quot;how is rate limiting implemented?&quot;
              </span>
            </div>
            <div className="feature-search-result">
              <div className="feature-search-result-file">
                middleware/rate_limiter.py
              </div>
              <div className="feature-search-result-desc">
                Token bucket implementation with Redis backend
              </div>
              <div className="feature-search-result-score">
                similarity: 0.94
              </div>
            </div>
            <div className="feature-search-result">
              <div className="feature-search-result-file">
                config/limits.yaml
              </div>
              <div className="feature-search-result-desc">
                Rate limit thresholds per endpoint tier
              </div>
              <div className="feature-search-result-score">
                similarity: 0.87
              </div>
            </div>
          </div>

          {/* Card 5: Safe AI Code Changes */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="feature-title">Safe AI Code Changes</h3>
            <p className="feature-description">
              AI-generated patches that respect your architecture. Every
              suggestion is grounded in call graph analysis and blast radius
              checks.
            </p>
            <div className="feature-diff">
              <div className="feature-diff-file">
                middleware/rate_limiter.py
              </div>
              <div className="feature-diff-context">
                {" "}
                def check_rate_limit(self, key):
              </div>
              <div className="feature-diff-remove">
                - &nbsp;&nbsp;&nbsp;&nbsp;count = self.redis.incr(key)
              </div>
              <div className="feature-diff-add">
                + &nbsp;&nbsp;&nbsp;&nbsp;count = self.redis.incr(key)
              </div>
              <div className="feature-diff-add">
                + &nbsp;&nbsp;&nbsp;&nbsp;if count == 1:
              </div>
              <div className="feature-diff-add">
                + &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.redis.expire(key,
                self.window)
              </div>
              <div className="feature-diff-context">
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;return count &lt;= self.limit
              </div>
            </div>
          </div>

          {/* Card 6: Incremental Repository Sync */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </div>
            <h3 className="feature-title">Incremental Repository Sync</h3>
            <p className="feature-description">
              Only re-index what changed. Git-aware diff tracking ensures your
              knowledge graph stays current without full rebuilds.
            </p>
            <div className="feature-sync-stats">
              <div className="feature-sync-stat">
                <div className="feature-sync-stat-value">3</div>
                <div className="feature-sync-stat-label">Files Changed</div>
              </div>
              <div className="feature-sync-stat">
                <div className="feature-sync-stat-value">0.4s</div>
                <div className="feature-sync-stat-label">Sync Time</div>
              </div>
              <div className="feature-sync-stat">
                <div className="feature-sync-stat-value">142</div>
                <div className="feature-sync-stat-label">Total Files</div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Language Support */}
        <div className="multi-lang">
          <h3 className="multi-lang-title">Multi-Language Support</h3>
          <p className="multi-lang-desc">
            CodeTrace AI uses Tree-sitter grammars to parse any language. Works
            out of the box with these — and growing.
          </p>
          <div className="multi-lang-pills">
            {[
              "Python",
              "TypeScript",
              "JavaScript",
              "Rust",
              "Go",
              "Java",
              "C++",
              "C#",
              "Ruby",
              "PHP",
              "Swift",
              "Kotlin",
              "HTML & CSS",
              "Json",
              "Bash"
            ].map((lang) => (
              <span key={lang} className="multi-lang-pill">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
