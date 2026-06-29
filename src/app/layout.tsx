import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CodeTrace AI — Understand Any Codebase. Trace Execution. Ship with Confidence.",
  description:
    "CodeTrace-AI is an autonomous engineering intelligence platform that understands entire repositories through structural analysis, semantic search, dependency mapping, call graphs, and AI reasoning.",
  keywords: [
    "code analysis",
    "codebase understanding",
    "call graph",
    "semantic search",
    "AI code review",
    "dependency mapping",
  ],
  openGraph: {
    title: "CodeTrace AI",
    description:
      "Understand Any Codebase. Trace Execution. Ship with Confidence.",
    type: "website",
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
