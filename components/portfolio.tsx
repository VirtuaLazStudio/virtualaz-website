"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Portfolio() {
  const [activeItems, setActiveItems] = React.useState<Record<number, boolean>>({});

  const portfolioItems = [
    {
      title: "BrasovHolidayApartaments",
      meta: "Rezidențial • Brașov",
      embed: "https://kuula.co/share/collection/7M2cX?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro",
      image: "/modern_living_room.png",
    },
    {
      title: "Satul de lut",
      meta: "Agroturism • Buzău",
      embed: "https://kuula.co/share/collection/7MNML?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro",
      image: "/clay_village_houses.png",
    },
    {
      title: "BrasovHolidayApartaments",
      meta: "Rezidențial • Brașov",
      embed: "https://kuula.co/share/collection/7M2cj?logo=1&info=1&fs=1&vr=0&gyro=0&initload=0&thumbs=3&inst=ro",
      image: "/modern_apartment_blocks.png",
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
    <section id="portfolio" className="relative py-24 md:py-36 bg-luxury-dark overflow-hidden px-6 md:px-12 border-t border-b border-white/5">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">Portofoliu Digital</span>
          <motion.h2 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6"
          >
            Lucrări <span className="font-serif italic text-gold font-normal">Recente</span>
          </motion.h2>
          <motion.p 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-luxury-text text-sm md:text-base font-light max-w-xl leading-relaxed"
          >
            Tururile noastre virtuale au generat deja peste 10.000 de vizualizări. Oamenii chiar vor să exploreze spațiile în detaliu înainte de a le vizita fizic.
          </motion.p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl overflow-hidden glassmorphism flex flex-col h-[500px] shadow-2xl"
            >
              {/* Media Container */}
              <div className="relative flex-grow bg-black h-[400px] overflow-hidden group/media">
                {activeItems[idx] ? (
                  <iframe
                    src={item.embed}
                    title={`${item.title} virtual tour`}
                    className="w-full h-full border-none"
                    allowFullScreen
                    allow="xr-spatial-tracking; vr; gyroscope; accelerometer"
                  />
                ) : (
                  <>
                    {/* Placeholder Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-105"
                    />
                    
                    {/* Play/Interactive Overlay */}
                    <div 
                      onClick={() => setActiveItems(prev => ({ ...prev, [idx]: true }))}
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/75 z-10 group/overlay"
                    >
                      <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-3 text-gold transition-all duration-300 group-hover/overlay:scale-110 group-hover/overlay:border-white group-hover/overlay:bg-gold/25 group-hover/overlay:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="translate-x-[1.5px]">
                          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">Explorează în 360°</span>
                    </div>
                  </>
                )}
              </div>

              {/* Card Info */}
              <div className="p-6 bg-[#0D0E10] border-t border-white/5 flex-shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-gold font-medium mb-1 block">
                  {item.meta}
                </span>
                <h3 className="text-lg font-light text-white tracking-wide">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
