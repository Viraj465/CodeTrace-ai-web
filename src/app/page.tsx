import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import Architecture from "@/components/Architecture";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Terminal />
        <Architecture />
        <Features />
        <Demo />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
