"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V12H15V21" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Imobiliare",
      description: "Vizionări interactive 24/7. Clienții explorează proprietățile de lux de la distanță, accelerând decizia de cumpărare.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V16M8 12H16" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Horeca & Evenimente",
      description: "Prezintă atmosfera unică a locației. Clienții pot alege masa sau pot explora camerele înainte de rezervare.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Showrooms & Retail",
      description: "E-commerce 3D imersiv. Adăugăm puncte de cumpărare direct pe produsele expuse în magazinul tău 360°.",
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
    <section id="services" className="relative py-24 md:py-36 bg-transparent overflow-hidden px-6 md:px-12">
      {/* Light glow background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">Servicii Specializate</span>
          <motion.h2 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6"
          >
            Lentila noastră. <span className="font-serif italic text-gold font-normal">Spațiul tău.</span>
          </motion.h2>
          <motion.p 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-luxury-text text-sm md:text-base font-light max-w-xl leading-relaxed"
          >
            Fiecare industrie are nevoi diferite. Am dezvoltat fluxuri de lucru optimizate pentru a pune în valoare particularitățile fiecărui spațiu scanat.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[380px] rounded-[36px] cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Outer Glow (Delicate, very close to border, slow gold waves) */}
              <div className="absolute inset-[-2px] rounded-[38px] overflow-hidden blur-[6px] opacity-45 group-hover:opacity-85 transition-opacity duration-500 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#FFF5E0_25%,transparent_50%,#FFF5E0_75%,transparent_100%)] bg-[length:200%_200%] animate-flow-border-slow" />
              </div>

              {/* Sharp Fluid Border */}
              <div className="absolute inset-0 rounded-[36px] overflow-hidden p-[2.5px] z-0 pointer-events-none opacity-65 group-hover:opacity-100 blur-[0.5px] transition-opacity duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#FFF5E0_25%,transparent_50%,#FFF5E0_75%,transparent_100%)] bg-[length:200%_200%] animate-flow-border-slow" />
              </div>

              {/* Inner Card (clipped) */}
              <div className="absolute inset-[2.5px] rounded-[33.5px] bg-[#0D0E10] flex flex-col p-12 z-10 flex-grow">
                <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
                  <div>
                    <div className="text-gold mb-8 inline-flex">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-serif font-normal text-[#F5F5F0] tracking-wide mb-5">
                      {service.title}
                    </h3>
                    
                    <p className="text-luxury-text text-sm font-light leading-relaxed mb-8 text-[#8A8A82]">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold group-hover:text-gold-light transition-colors duration-300">
                    <span>Detalii Serviciu</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
