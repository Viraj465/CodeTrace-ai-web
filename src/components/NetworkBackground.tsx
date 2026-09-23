"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const nodeCount = 22;
    const connectionDistance = 280;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 3 + Math.random() * 3,
        opacity: 0.18 + Math.random() * 0.28,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const pulse =
          Math.sin(time * 0.001 * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5;
        const currentOpacity = node.opacity * (0.6 + pulse * 0.4);

        // Draw connections
        for (const other of nodes) {
          if (other === node) continue;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const lineOpacity = (1 - dist / connectionDistance) * 0.1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            // Alternate between cyan and purple for connections
            const usePurple = (Math.floor(node.x) + Math.floor(other.x)) % 3 === 0;
            ctx.strokeStyle = usePurple
              ? `rgba(139, 92, 246, ${lineOpacity})`
              : `rgba(56, 189, 248, ${lineOpacity})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.5, 0, Math.PI * 2);
        const usePurpleGlow = Math.floor(node.x) % 2 === 0;
        ctx.fillStyle = usePurpleGlow
          ? `rgba(139, 92, 246, ${currentOpacity * 0.14})`
          : `rgba(56, 189, 248, ${currentOpacity * 0.14})`;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = usePurpleGlow
          ? `rgba(167, 139, 250, ${currentOpacity})`
          : `rgba(56, 189, 248, ${currentOpacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
