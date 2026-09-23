import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatsNew from "@/components/WhatsNew";
import Terminal from "@/components/Terminal";
import GovernedProtocol from "@/components/GovernedProtocol";
import VisualShowcase from "@/components/VisualShowcase";
import Features from "@/components/Features";
import Architecture from "@/components/Architecture";
import AgenticTools from "@/components/AgenticTools";
import McpIntegration from "@/components/McpIntegration";
import LlmEcosystem from "@/components/LlmEcosystem";
import LanguageGrid from "@/components/LanguageGrid";
import Demo from "@/components/Demo";
import CliReference from "@/components/CliReference";
import Changelog from "@/components/Changelog";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatsNew />
        <Terminal />
        <GovernedProtocol />
        <VisualShowcase />
        <Features />
        <Architecture />
        <AgenticTools />
        <McpIntegration />
        <LlmEcosystem />
        <LanguageGrid />
        <Demo />
        <CliReference />
        <Changelog />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
