"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Cpu, Target } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Cpu className="w-5 h-5 text-gold" />,
      title: "Claritate Absolută 8K HDR",
      description: "Fiecare panoramă este procesată manual pentru a păstra culorile naturale, echilibrul de lumini și detalii microscopice.",
    },
    {
      icon: <Target className="w-5 h-5 text-gold" />,
      title: "Hotspot-uri Custom",
      description: "Integrăm butoane interactive directe (video de prezentare, text descriptiv, link direct către achiziție sau rezervări).",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
      title: "Compatibilitate Totală",
      description: "Experiența se încarcă instantaneu pe orice dispozitiv (Mobil, Desktop, Tabletă) și este gata pentru ochelarii VR.",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-gold" />,
      title: "Implementare Directă pe site-ul tău / Google Maps",
      description: "Integrare facilă prin iframe în orice pagină web și publicare pe Google Street View pentru vizibilitate sporită.",
    },
  ];

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
    <section id="about" className="relative py-24 md:py-36 bg-luxury-black overflow-hidden px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Conceptul VirtuaLaz</span>
          </div>
          
          <motion.h2 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white mb-8 leading-tight"
          >
            Spațiul tău, redat <br />
            <span className="font-serif italic text-gold font-normal">fără compromisuri.</span>
          </motion.h2>
          
          <motion.p 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-luxury-text text-sm md:text-base font-light leading-relaxed mb-6"
          >
            Treci de la imagini statice la o experiență imersivă 360°! Cu VirtuaLaz Tours, clienții îți explorează locația de oriunde și interacționează direct cu spațiul prin hotspoturi inteligente (detalii, prețuri, rezervări), transformând simpli vizitatori în clienți plătitori.
          </motion.p>
          
          <motion.p 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-luxury-text/70 text-sm font-light leading-relaxed mb-10"
          >
            Nu ne limităm la simple scanări automate. Edităm individual fiecare panoramă, optimizăm tranzițiile pentru o mișcare fluidă și naturală și adăugăm puncte de interacțiune inteligente care aduc informație relevantă direct în interiorul experienței 360°.
          </motion.p>

          {/* Features Checklist */}
          <div className="flex flex-col gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium tracking-wide mb-1">{feature.title}</h4>
                  <p className="text-luxury-text text-xs font-light leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Premium Image Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/3] md:aspect-[16/11] rounded-[24px] overflow-hidden border border-gold/10"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/60 z-20 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/60 z-20 pointer-events-none" />
          
          {/* Dark Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
          
          <Image
            src="/portfolio_villa.png"
            alt="Scanare camera intr-o vila moderna"
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-[2000ms] ease-out"
          />
        </motion.div>

      </div>
    </section>
  );
}
