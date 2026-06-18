"use client";
import React from "react";
import { LogoCloud } from "@/components/ui/logo-cloud-3";

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

export default function LogoCloudSection() {
  return (
    <section className="relative py-16 bg-transparent border-b border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <h2 className="text-center text-sm uppercase tracking-[0.2em] text-luxury-text/60 mb-8 font-medium">
          Infrastructură modernă și sigură
        </h2>

        <div className="w-full relative py-4">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          <LogoCloud logos={logos} />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        </div>

      </div>
    </section>
  );
}
