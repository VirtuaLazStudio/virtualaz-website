"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Descriere", href: "#about" },
    { name: "Servicii", href: "#services" },
    { name: "Portofoliu", href: "#portfolio" },
    { name: "Prețuri", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glassmorphism py-4 border-b border-gold/10 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/20 group-hover:border-gold transition-colors duration-500">
              <Image
                src="/logo_round.png"
                alt="VirtuaLaz Tours Logo"
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:rotate-[15deg] group-hover:scale-105"
              />
            </div>
            <span className="text-xl font-medium tracking-wider text-white">
              VirtuaLaz <span className="text-gold font-serif italic font-light ml-0.5">Tours</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-light tracking-wide text-luxury-text hover:text-white transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full border border-gold text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold hover:text-luxury-black transition-all duration-300 gold-glow-hover"
            >
              Solicită Ofertă
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl md:hidden pt-28 px-6 flex flex-col gap-6"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light tracking-wide text-white border-b border-white/5 pb-4 hover:text-gold transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-4 rounded-full border border-gold text-center text-sm font-semibold uppercase tracking-wider text-gold hover:bg-gold hover:text-luxury-black transition-all duration-300"
            >
              Solicită Ofertă
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
