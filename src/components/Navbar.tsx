"use client";

import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "What's New", href: "#whats-new" },
  { label: "Protocol", href: "#protocol" },
  { label: "Tour", href: "#gallery" },
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Tools & MCP", href: "#mcp" },
  { label: "LLMs", href: "#llms" },
  { label: "Languages", href: "#languages" },
  { label: "CLI", href: "#cli" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/codetrace-icon.svg"
            alt="CodeTrace AI"
            width={32}
            height={32}
            className="navbar-logo-img"
          />
          <span>CodeTrace AI</span>
          <span className="navbar-logo-badge">v1.0.3</span>
        </a>

        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar-link"
              onClick={(e) => {
                handleClick(e, link.href);
                setIsOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className={`navbar-actions ${isOpen ? "open" : ""}`}>
          <a
            href="https://github.com/Viraj465/CodeTrace-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-github-btn"
            onClick={() => setIsOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="#pricing"
            className="navbar-cta-btn"
            onClick={(e) => {
              handleClick(e, "#pricing");
              setIsOpen(false);
            }}
          >
            Quick Start
          </a>
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span style={{ transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>
          <span style={{ opacity: isOpen ? 0 : 1 }}></span>
          <span style={{ transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></span>
        </button>
      </div>
    </nav>
  );
}
