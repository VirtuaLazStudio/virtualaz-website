"use client";
import React from "react";
import Navbar from "@/components/navbar";
import HeroScroll from "@/components/hero-scroll";
import About from "@/components/about";
import Services from "@/components/services";
import Pricing from "@/components/pricing";
import Portfolio from "@/components/portfolio";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import LogoCloudSection from "@/components/logo-cloud-section";
import { FloatingPaths } from "@/components/ui/background-paths";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-luxury-black w-full text-white overflow-hidden">
      {/* Background Animated Paths */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 text-gold">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Dynamic Floating particles or background decorations */}
      <div className="absolute top-[10%] left-[-10%] w-[35%] aspect-square bg-gold/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-[50%] right-[-10%] w-[40%] aspect-square bg-gold/5 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar />

      {/* Hero section with ContainerScroll & Kuula Tour */}
      <HeroScroll />

      {/* Partners / Logo Cloud */}
      <LogoCloudSection />

      {/* Concept & Philosophy section */}
      <About />

      {/* Services Showcase */}
      <Services />

      {/* Portfolio Showcase */}
      <Portfolio />

      {/* Interactive Pricing Estimator Slider */}
      <Pricing />

      {/* Contact Form with Custom styling */}
      <Contact />

      {/* Footer & Compliance */}
      <Footer />
    </main>
  );
}
