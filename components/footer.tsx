"use client";
import React from "react";
import { Instagram, Facebook, Tiktok } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/5 py-12 md:py-16 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Branding */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gold/20 group-hover:border-gold transition-colors duration-500">
              <Image
                src="/logo_round.png"
                alt="VirtuaLaz Tours Logo"
                fill
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:rotate-[15deg] group-hover:scale-105"
              />
            </div>
            <span className="text-lg font-medium tracking-wider text-white">
              VirtuaLaz <span className="text-gold font-serif italic font-light ml-0.5">Tours</span>
            </span>
          </a>
          <div className="inline-flex items-center gap-3 mt-2">
            <span className="w-6 h-[1px] bg-gold/50" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium">
              Prezență digitală de lux, direct, fără intermediari.
            </span>
          </div>
        </div>

        {/* Middle links removed to keep only Social Media and Branding */}

        {/* Right Side: Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/virtualaz_tours/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-white/5 bg-luxury-dark hover:border-gold/40 flex items-center justify-center text-luxury-text hover:text-gold transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61581594847466&locale=ro_RO"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-white/5 bg-luxury-dark hover:border-gold/40 flex items-center justify-center text-luxury-text hover:text-gold transition-all duration-300"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://www.tiktok.com/@virtualaz_tours360"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-white/5 bg-luxury-dark hover:border-gold/40 flex items-center justify-center text-luxury-text hover:text-gold transition-all duration-300"
            aria-label="TikTok"
          >
            <Tiktok className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Compliance / Legal Links & Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-luxury-text/40 font-light">
        <span>
          &copy; {new Date().getFullYear()} VirtuaLaz Tours SRL. Toate drepturile rezervate.
        </span>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a>
          <a href="#" className="hover:text-white transition-colors">Politică de Confidențialitate (GDPR)</a>
          <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANPC</a>
          <a href="#" className="hover:text-white transition-colors">SOL / SAL</a>
        </div>
      </div>
    </footer>
  );
}
