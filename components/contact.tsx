"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-luxury-dark overflow-hidden px-6 md:px-12">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center p-8 md:p-16 rounded-[24px] border border-gold/10 bg-[#0D0E10] shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center gap-2 mb-6">
            <span className="w-10 h-[1px] bg-gold/50" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Contact direct</span>
            <span className="w-10 h-[1px] bg-gold/50" />
          </div>

          <motion.h2 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight"
          >
            Pregătit să îți aduci spațiul <span className="font-serif italic text-gold font-normal">în online?</span>
          </motion.h2>

          <motion.p 
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="text-luxury-text text-sm md:text-base font-light leading-relaxed max-w-xl mb-12"
          >
            Suntem pregătiți să transpunem realitatea spațiului tău în pixeli. Contactează-ne direct pentru o ofertă personalizată.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Card E-mail */}
            <motion.div
              variants={cardVariants}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center p-8 rounded-2xl border border-white/5 bg-[#111215] hover:border-gold/20 transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-6 text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-500">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-luxury-text/60 mb-3 block">
                E-mail Direct
              </span>
              <a 
                href="mailto:ilaz360.studio@gmail.com" 
                className="text-sm text-white hover:text-gold transition-colors font-medium break-all"
              >
                ilaz360.studio@gmail.com
              </a>
            </motion.div>

            {/* Card Telefon */}
            <motion.div
              variants={cardVariants}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center p-8 rounded-2xl border border-white/5 bg-[#111215] hover:border-gold/20 transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-6 text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-500">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-luxury-text/60 mb-3 block">
                Telefon / WhatsApp
              </span>
              <a 
                href="tel:+40751525405" 
                className="text-sm text-white hover:text-gold transition-colors font-medium"
              >
                0751 525 405
              </a>
            </motion.div>

            {/* Card Locații */}
            <motion.div
              variants={cardVariants}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center p-8 rounded-2xl border border-white/5 bg-[#111215] hover:border-gold/20 transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-6 text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-500">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-luxury-text/60 mb-3 block">
                Locații deservite
              </span>
              <span className="text-sm text-white font-medium">
                Brașov, Buzău & în toată țara
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
