"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isConsentAccepted = localStorage.getItem("cookie-consent-accepted");
    if (!isConsentAccepted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem("cookie-consent-accepted", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 md:bottom-8 left-1/2 w-[calc(100%-2rem)] max-w-[800px] bg-[#0D0E10] border border-gold/25 rounded-2xl p-6 md:py-5 md:px-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)] z-[9999] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8"
        >
          <p className="text-xs md:text-sm text-luxury-text/90 font-light leading-relaxed">
            Acest site folosește cookie-uri pentru a vă oferi o experiență îmbunătățită. Prin continuarea navigării, vă exprimați acordul.
          </p>
          <button
            onClick={handleAccept}
            className="shrink-0 bg-gold text-luxury-black text-xs font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-gold-light hover:scale-105 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.15)] rounded-none"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
