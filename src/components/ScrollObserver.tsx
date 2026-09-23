"use client";

import { useEffect } from "react";

// Content is visible by default: `.reveal-on-scroll` only hides elements once
// <html> carries `reveal-ready`, which this component adds after hydration.
// If the JS bundle never runs (slow dev compile, blocked chunk, extension,
// hydration crash) the page still renders instead of staying blank.
export default function ScrollObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const progressBar = document.getElementById("scroll-progress-bar");
    const handleScroll = () => {
      const totalScroll = root.scrollTop;
      const windowHeight = root.scrollHeight - root.clientHeight;
      if (windowHeight > 0 && progressBar) {
        progressBar.style.width = `${(totalScroll / windowHeight) * 100}%`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealed = new WeakSet<Element>();

    const reveal = (el: Element) => {
      revealed.add(el);
      el.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const track = (el: Element) => {
      if (revealed.has(el)) return;
      const r = el.getBoundingClientRect();
      // Already on screen (or animations off): show now, never hide it first.
      if (reduceMotion || (r.top < window.innerHeight && r.bottom > 0)) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    };

    document.querySelectorAll(".reveal-on-scroll").forEach(track);
    root.classList.add("reveal-ready");

    // Tabs and filters mount new `.reveal-on-scroll` nodes after load, and a
    // React re-render that changes className drops `is-visible`. Catch both.
    const mutations = new MutationObserver((records) => {
      records.forEach((rec) => {
        if (rec.type === "attributes") {
          const el = rec.target as Element;
          if (revealed.has(el) && !el.classList.contains("is-visible")) {
            el.classList.add("is-visible");
          }
          return;
        }
        rec.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.classList.contains("reveal-on-scroll")) track(node);
          node.querySelectorAll(".reveal-on-scroll").forEach(track);
        });
      });
    });
    mutations.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <div
      id="scroll-progress-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        zIndex: 9999,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        id="scroll-progress-bar"
        style={{
          height: "100%",
          width: "0%",
          background: "var(--progress-gradient, linear-gradient(90deg, #38BDF8 0%, #818CF8 50%, #8B5CF6 100%))",
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
