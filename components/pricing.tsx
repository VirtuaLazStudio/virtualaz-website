"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Calendar, Camera, Clock, Euro } from "lucide-react";

export default function Pricing() {
  const [projectType, setProjectType] = useState<"residential" | "commercial">("residential");
  const [area, setArea] = useState<number>(150); // default 150 sqm
  const [price, setPrice] = useState<number>(0);
  const [scanPoints, setScanPoints] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Dynamic pricing calculations
  useEffect(() => {
    // Price from 100 EUR (50mp) to 1000 EUR (1000mp) for residential
    let basePrice = projectType === "residential" 
      ? 100 + Math.round((area - 50) * 900 / 950) 
      : 150 + Math.round((area - 50) * 1250 / 950);
    
    // Panoramas/Scan points: from 5 (50mp) to 40 (1000mp)
    let points = Math.round(5 + (area - 50) * 35 / 950);
    
    // Duration: roughly 15-20 min per scan point, plus setup (in hours)
    let hours = Math.round((points * 15) / 60 * 10) / 10;
    
    setPrice(basePrice);
    setScanPoints(points);
    setDuration(Math.max(1.5, hours));
  }, [projectType, area]);

  const features = {
    residential: [
      "Scanare 360 HDR la rezoluție 8K",
      "Procesare grafică & corecție culori incluse",
      "Până la 5 hotspot-uri interactive standard",
      "Găzduire web gratuită 12 luni",
      "Embed facil în website-ul tău sau Imobiliare.ro",
      "Suport vizualizare VR (Virtual Reality)",
    ],
    commercial: [
      "Scanare 8K HDR cu echipamente avansate",
      "Corecție culori profesională & editare logo",
      "Hotspot-uri interactive custom (Video, Meniu, Rezervare directă)",
      "Branding complet integrat (logo, culori, meniu navigare)",
      "Găzduire web premium gratuită 12 luni",
      "Panou de statistici vizitatori (la cerere)",
    ]
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="pricing" className="relative py-24 md:py-36 bg-luxury-black overflow-hidden px-6 md:px-12">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">Estimare Costuri</span>
          <motion.h2 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6"
          >
            Prețuri Transparente. <span className="font-serif italic text-gold font-normal">Interactive.</span>
          </motion.h2>
          <motion.p 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-luxury-text text-sm md:text-base font-light max-w-xl leading-relaxed"
          >
            Folosește calculatorul de mai jos pentru a estima instantaneu prețul scanării spațiului tău în funcție de suprafață.
          </motion.p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Panel: Calculator Inputs (7 cols) */}
          <div className="lg:col-span-7 glassmorphism p-8 md:p-10 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Step 1: Select Project Type */}
              <div className="mb-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-text mb-4">
                  1. Tipul Proprietății
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setProjectType("residential")}
                    className={`py-4 px-6 rounded-2xl border text-sm font-medium transition-all duration-300 ${
                      projectType === "residential"
                        ? "border-gold bg-gold/10 text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                        : "border-white/5 bg-luxury-black/40 text-luxury-text hover:text-white hover:border-white/10"
                    }`}
                  >
                    Rezidențial
                  </button>
                  <button
                    onClick={() => setProjectType("commercial")}
                    className={`py-4 px-6 rounded-2xl border text-sm font-medium transition-all duration-300 ${
                      projectType === "commercial"
                        ? "border-gold bg-gold/10 text-white shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                        : "border-white/5 bg-luxury-black/40 text-luxury-text hover:text-white hover:border-white/10"
                    }`}
                  >
                    Comercial & HoReCa
                  </button>
                </div>
              </div>

              {/* Step 2: Slider for area */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-luxury-text">
                    2. Suprafața Spațiului
                  </h3>
                  <span className="text-xl font-semibold text-gold font-mono">
                    {area} <span className="text-xs font-normal text-luxury-text">mp</span>
                  </span>
                </div>
                
                <div className="relative mt-6">
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value))}
                    className="w-full h-1 bg-luxury-gray rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="relative h-5 text-[10px] text-luxury-text/50 mt-2 font-mono w-full">
                    <span className="absolute left-[0%] translate-x-0">50 mp</span>
                    <span className="absolute left-[26.3%] -translate-x-1/2">300 mp</span>
                    <span className="absolute left-[57.9%] -translate-x-1/2">600 mp</span>
                    <span className="absolute left-[100%] -translate-x-full">1000 mp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8 mt-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-luxury-text/60 mb-1 flex items-center gap-1">
                  <Camera className="w-3 h-3 text-gold/60" /> Puncte Scan
                </span>
                <span className="text-lg md:text-xl font-semibold text-white font-mono">
                  ~{scanPoints}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-luxury-text/60 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gold/60" /> Timp Scanare
                </span>
                <span className="text-lg md:text-xl font-semibold text-white font-mono">
                  {duration}h
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-luxury-text/60 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gold/60" /> Predare Rapidă
                </span>
                <span className="text-lg md:text-xl font-semibold text-white">
                  {area <= 150 ? "48h" : "72h"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Cost Showcase & Features (5 cols) */}
          <div className="lg:col-span-5 glassmorphism p-8 md:p-10 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-light mb-2 block">
                Cost Estimat
              </span>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-xs text-luxury-text font-light mr-1">de la</span>
                <span className="text-5xl md:text-6xl font-light tracking-tight text-white font-mono">
                  {price}
                </span>
                <span className="text-2xl font-light text-gold font-mono">EUR</span>
              </div>

              <p className="text-xs text-luxury-text/80 leading-relaxed mb-8 border-b border-white/5 pb-6">
                *Prețul final este determinat de complexitatea compartimentării și de hotspot-urile adiționale solicitate. Include TVA.
              </p>

              {/* Feature Checklist */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                  Ce este inclus:
                </h4>
                {features[projectType].map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-gold" />
                    </div>
                    <span className="text-xs md:text-sm text-luxury-text/90 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="mt-10 w-full py-4 rounded-2xl bg-gold text-luxury-black text-center text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] block"
            >
              Solicită Scanare Acum
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
