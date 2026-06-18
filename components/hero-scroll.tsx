"use client";
import React, { useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Play, Navigation2, MousePointerClick } from "lucide-react";

export default function HeroScroll() {
  const [interact, setInteract] = useState(false);

  return (
    <section id="hero-scroll" className="relative w-full bg-transparent overflow-hidden flex flex-col justify-center items-center">
      {/* Golden Ambient Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center justify-center px-4">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-gold mb-4 inline-flex items-center gap-3">
                <span className="w-10 h-[1px] bg-gold/50" />
                Redefinim Spațiul
                <span className="w-10 h-[1px] bg-gold/50" />
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight">
                Experiențe <span className="gold-gradient-text font-serif italic font-normal">360°</span> <br className="hidden md:inline" />
                <span className="text-gold font-serif italic font-normal">
                  dintr
                  <span style={{ fontStyle: "normal", fontFamily: "'Times New Roman', Georgia, serif", fontWeight: 300, display: "inline-block", transform: "translateY(-0.03em)", margin: "0 0.05em" }}>
                    -
                  </span>
                  o altă perspectivă
                </span>
              </h1>
              <p className="mt-6 text-sm md:text-base text-luxury-text max-w-xl font-light leading-relaxed">
                Adu-ți clienții în interiorul proprietății tale de oriunde s-ar afla.
              </p>
            </div>
          }
        >
          <div className="relative w-full h-full bg-black">
            {/* Embedded 360 Virtual Tour Iframe */}
            <iframe
              src="https://kuula.co/share/collection/7MbfB?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro"
              className={`w-full h-full border-0 transition-opacity duration-700 ${
                interact ? "opacity-100 pointer-events-auto" : "opacity-80 pointer-events-none"
              }`}
              allowFullScreen
              allow="xr-spatial-tracking; gyroscope; accelerometer"
              title="VirtuaLaz Tours 360 Virtual Tour Demo"
            />

            {/* Smart Scroll Hijack Preventer Overlay */}
            {!interact && (
              <div className="absolute inset-0 bg-luxury-black/65 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center select-none">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-5 animate-pulse-slow">
                  <Navigation2 className="w-6 h-6 text-gold rotate-45 transform translate-x-0.5 -translate-y-0.5" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                  Tur Virtual Interactiv 360°
                </h3>
                <p className="text-xs md:text-sm text-luxury-text max-w-xs mb-6 font-light">
                  Apasă pe butonul de mai jos pentru a naviga în interiorul proprietății.
                </p>
                <button
                  onClick={() => setInteract(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-luxury-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-gold-light hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                  <MousePointerClick className="w-4 h-4" />
                  Explorează Spațiul
                </button>
              </div>
            )}

            {/* Return to Scroll Button (visible when interacting) */}
            {interact && (
              <button
                onClick={() => setInteract(false)}
                className="absolute bottom-4 right-4 z-20 px-4 py-2 rounded-full glassmorphism border border-gold/30 text-gold text-[10px] font-semibold uppercase tracking-wider hover:bg-gold hover:text-luxury-black transition-all duration-300"
              >
                Dezactivează Turul
              </button>
            )}
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
