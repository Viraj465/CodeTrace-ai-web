import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollObserver from "@/components/ScrollObserver";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codetraceai.in"),
  title: "CodeTrace AI — The Governed Code Intelligence Layer for AI Agents",
  description:
    "Deterministic Call Graphs, Blast Radius Verification, and Evidence-Backed Reasoning for AI coding agents and developers. Local-first, works with any LLM, and fully air-gapped with Ollama.",
  keywords: [
    "CodeTrace AI",
    "Governed Pipeline Protocol",
    "Call Graph",
    "Blast Radius Verification",
    "Model Context Protocol",
    "MCP Server",
    "Tree-sitter AST",
    "Semantic Code Search",
    "Local Code Intelligence",
    "AI Coding Agent",
    "Ollama Local Coding",
  ],
  authors: [{ name: "Viraaj Sawant" }],
  openGraph: {
    title: "CodeTrace AI — The Governed Code Intelligence Layer for AI Agents",
    description:
      "Deterministic Call Graphs, Blast Radius Verification, and Evidence-Backed Reasoning, 100% Local.",
    type: "website",
    url: "https://codetraceai.in",
    siteName: "CodeTrace AI",
    images: [
      {
        url: "/codetrace-banner.png",
        width: 1200,
        height: 630,
        alt: "CodeTrace AI Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeTrace AI — Governed Code Intelligence Layer",
    description:
      "Deterministic Call Graphs, Blast Radius Verification, and Evidence-Backed Reasoning, 100% Local.",
    creator: "@__viraj__1",
  },
  icons: {
    icon: "/codetrace-icon.svg",
    apple: "/codetrace-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
