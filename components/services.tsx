"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Hotel, Store, Ship, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Building2 className="w-6 h-6 text-gold" />,
      title: "Imobiliare de Lux",
      description: "Vizionări interactive 24/7. Clienții explorează proprietățile de lux de la distanță, accelerând decizia de cumpărare.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Hotel className="w-6 h-6 text-gold" />,
      title: "HoReCa & Locații",
      description: "Prezintă atmosfera unică a locației. Clienții pot alege masa sau pot explora camerele înainte de rezervare.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Store className="w-6 h-6 text-gold" />,
      title: "Showrooms & Retail",
      description: "E-commerce 3D imersiv. Adăugăm puncte de cumpărare direct pe produsele expuse în magazinul tău 360°.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
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
    <section id="services" className="relative py-24 md:py-36 bg-luxury-dark overflow-hidden px-6 md:px-12">
      {/* Light glow background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">Servicii Premium</span>
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
            Fiecare industrie are particularități unice. Am adaptat fluxurile noastre de scanare 8K pentru a capta excelența în fiecare detaliu.
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
              className="group relative h-[380px] md:h-[420px] rounded-[36px] cursor-pointer transition-all duration-500 hover:-translate-y-2"
            >
              {/* Outer Glow (Delicate, very close to border, slow gold waves) */}
              <div className="absolute inset-[-3px] rounded-[39px] overflow-hidden blur-[6px] opacity-45 group-hover:opacity-85 transition-opacity duration-500 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#FFF5E0_25%,transparent_50%,#FFF5E0_75%,transparent_100%)] bg-[length:200%_200%] animate-flow-border-slow" />
              </div>

              {/* Sharp Fluid Border */}
              <div className="absolute inset-0 rounded-[36px] overflow-hidden p-[2.5px] z-0 pointer-events-none opacity-65 group-hover:opacity-100 blur-[0.5px] transition-opacity duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#FFF5E0_25%,transparent_50%,#FFF5E0_75%,transparent_100%)] bg-[length:200%_200%] animate-flow-border-slow" />
              </div>

              {/* Inner Card (clipped) */}
              <div className="absolute inset-[2.5px] rounded-[33.5px] overflow-hidden bg-[#0D0E10] flex flex-col justify-end p-8 md:p-10 z-10">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent z-10" />
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] ease-out opacity-45"
                  />
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-luxury-black/80 border border-gold/20 flex items-center justify-center mb-6 group-hover:border-gold transition-colors duration-500">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-light text-white tracking-wide mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-luxury-text text-xs md:text-sm font-light leading-relaxed mb-6 max-w-md opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-white transition-colors duration-300">
                    <span>Solicită ofertă dedicată</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
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
