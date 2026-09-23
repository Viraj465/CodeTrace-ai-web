"use client";

import React, { useState } from "react";

interface LanguageItem {
  name: string;
  category: "treesitter" | "structural";
  type: string;
  ext: string;
}

const languages: LanguageItem[] = [
  { name: "Python", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".py" },
  { name: "TypeScript", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".ts, .tsx" },
  { name: "JavaScript", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".js, .jsx" },
  { name: "Rust", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".rs" },
  { name: "Go", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".go" },
  { name: "Java", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".java" },
  { name: "C++", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".cpp, .hpp" },
  { name: "C", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".c, .h" },
  { name: "C#", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".cs" },
  { name: "PHP", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".php" },
  { name: "Swift", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".swift" },
  { name: "Kotlin", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".kt" },
  { name: "Bash", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".sh" },
  { name: "HTML", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".html" },
  { name: "CSS", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".css" },
  { name: "JSON", category: "treesitter", type: "Tree-sitter AST + Call Graph", ext: ".json" },
  { name: "YAML", category: "structural", type: "Structural Symbol Indexer", ext: ".yaml, .yml" },
  { name: "TOML", category: "structural", type: "Structural Symbol Indexer", ext: ".toml" },
  { name: "SQL", category: "structural", type: "Structural Symbol Indexer", ext: ".sql" },
  { name: "Dockerfile", category: "structural", type: "Structural Symbol Indexer", ext: "Dockerfile" },
];

export default function LanguageGrid() {
  const [filter, setFilter] = useState<"all" | "treesitter" | "structural">("all");

  const filtered = languages.filter((l) => {
    if (filter === "all") return true;
    return l.category === filter;
  });

  return (
    <section className="lang-section" id="languages">
      <div className="container">
        {/* Header */}
        <div className="text-center reveal-on-scroll">
          <div className="section-label section-label-centered">Language Ecosystem</div>
          <h2 className="section-heading section-heading-gradient">
            Native Support for 21 Programming & Config Languages
          </h2>
          <p className="section-subheading mx-auto">
            17 parsed with native Tree-sitter grammars into complete symbol + call graphs; 4 config and data formats parsed into structural symbol hierarchies.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="lang-filter-bar reveal-on-scroll">
          <button
            className={`lang-filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Languages (21)
          </button>
          <button
            className={`lang-filter-btn ${filter === "treesitter" ? "active" : ""}`}
            onClick={() => setFilter("treesitter")}
          >
            Tree-sitter AST & Call Graphs (17)
          </button>
          <button
            className={`lang-filter-btn ${filter === "structural" ? "active" : ""}`}
            onClick={() => setFilter("structural")}
          >
            Structural Config & Data (4)
          </button>
        </div>

        {/* Languages Grid */}
        <div className="lang-grid-display reveal-on-scroll">
          {filtered.map((item) => (
            <div key={item.name} className="lang-item-card">
              <div className="lang-item-name">{item.name}</div>
              <div className="lang-item-type">{item.type}</div>
              <div style={{ fontSize: "11px", color: "var(--text-tertiary)", marginTop: "6px", fontFamily: "monospace" }}>
                {item.ext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
