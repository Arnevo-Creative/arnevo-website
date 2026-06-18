import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

interface HeroProps {
  onTalkClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTalkClick, onExploreClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-wild-sand bg-grain-texture px-6 py-20 lg:px-16 lg:py-24">
      {/* Abstract Art Nouveau Inspired Modern Flowing Line Drawings (Backdrop) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Decorative Grid backdrop */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#16232a_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        {/* Glowing pastel ambient wash */}
        <div className="absolute -top-[20%] -right-[15%] w-[60%] h-[70%] rounded-full bg-deep-sea/10 blur-[130px] animate-wave-slow"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-blaze-orange/5 blur-[120px] animate-wave-medium"></div>

        {/* Whipslash Art Nouveau curving lines rendered beautifully as SVGs */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wave line 1 */}
          <motion.path
            d="M -100 200 C 400 100, 300 700, 800 400 C 1100 200, 1200 600, 1600 500"
            stroke="#004D4D"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="wave-line-trail"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          {/* Wave line 2 (offset) */}
          <motion.path
            d="M -50 250 C 450 150, 250 800, 850 450 C 1050 250, 1250 550, 1650 450"
            stroke="#FF6321"
            strokeWidth="0.75"
            strokeDasharray="8 6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
          />
          {/* Rotating geometry - Art Nouveau circle */}
          <motion.circle
            cx="800"
            cy="400"
            r="160"
            stroke="#004D4D"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="800"
            cy="400"
            r="80"
            stroke="#FF6321"
            strokeWidth="1"
            className="opacity-40"
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />

          {/* Bottom left Nouveau swirl */}
          <path
            d="M 150 750 C 120 600, 300 500, 400 620 C 450 700, 320 780, 240 700 C 180 620, 260 450, 500 350"
            stroke="#004D4D"
            strokeWidth="1.25"
            strokeLinecap="round"
            className="opacity-30"
          />
        </svg>
      </div>

      {/* Hero content wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Actions panel */}
          <div className="lg:col-span-8 flex flex-col items-start justify-center">
            
            {/* Top small tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deep-sea/5 text-deep-sea text-xs font-semibold uppercase tracking-widest mb-8 border border-deep-sea/10"
            >
              <Sparkles className="h-3 w-3 text-blaze-orange animate-spin" />
              <span>SANAT VE STRATEJİNİN RİTMİ</span>
            </motion.div>

            {/* Giant Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-mirage leading-[1.08] mb-8"
            >
              Markaların{" "}
              <span className="relative inline-block text-deep-sea font-extrabold">
                görünme
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-blaze-orange opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,7 C30,2 70,2 100,7" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>{" "}
              biçimini{" "}
              <span className="text-blaze-orange font-bold font-serif">
                değiştirmeye
              </span>{" "}
              geliyoruz.
            </motion.h1>

            {/* Subtitle description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-lg md:text-xl text-mirage/80 leading-relaxed max-w-2xl mb-12 font-medium"
            >
              Arnevo, <span className="text-deep-sea font-bold">Art Nouveau</span> ruhunu modern tasarım anlayışıyla birleştiren; markalar için güçlü, tutarlı ve akılda kalan görsel dünyalar tasarlayan bir creative studio’dur.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              {/* Talk Primary button */}
              <button
                id="hero-cta-talk"
                onClick={onTalkClick}
                className="relative overflow-hidden group px-8 py-4 bg-blaze-orange text-wild-sand font-display font-semibold rounded-lg shadow-lg shadow-blaze-orange/20 transition-all duration-300 hover:shadow-xl hover:shadow-blaze-orange/30 hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="flex items-center justify-center gap-2">
                  Projeni Konuşalım
                  <MessageSquare className="h-4 w-4" />
                </span>
              </button>

              {/* Explore secondary button */}
              <button
                id="hero-cta-explore"
                onClick={onExploreClick}
                className="group px-8 py-4 border-2 border-deep-sea/20 hover:border-deep-sea text-deep-sea hover:bg-deep-sea/5 font-display font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  İşlerimizi Keşfet
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>
            </motion.div>
          </div>

          {/* Abstract visual graphic representation container (Art Nouveau visual bento) */}
          <div className="lg:col-span-4 relative flex justify-center items-center h-[350px] lg:h-[450px]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-full h-full max-w-[360px] lg:max-w-none flex justify-center items-center"
            >
              {/* Outer floating orbital */}
              <motion.div
                className="absolute w-72 h-72 lg:w-80 lg:h-80 rounded-full border border-blaze-orange/20 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-blaze-orange rounded-full shadow-lg shadow-blaze-orange/50"></div>
                <div className="absolute bottom-0 left-1/2 -ml-2 w-3 h-3 bg-deep-sea rounded-full"></div>
              </motion.div>

              {/* Middle loop */}
              <motion.div
                className="absolute w-56 h-56 lg:w-64 lg:h-64 rounded-full border border-dashed border-deep-sea/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute left-0 top-1/2 -mt-1.5 w-3 h-3 bg-deep-sea rounded-full"></div>
              </motion.div>

              {/* Dynamic decorative art plate block */}
              <div className="absolute w-44 h-44 lg:w-48 lg:h-48 rounded-full bg-deep-sea/5 border border-deep-sea/10 flex flex-col justify-center items-center shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-deep-sea/10 via-transparent to-blaze-orange/10"></div>
                
                {/* Central Handcrafted organic waving logo icon badge */}
                <motion.div
                  className="z-10 p-5 rounded-full bg-wild-sand/90 shadow-lg border border-deep-sea/10 flex justify-center items-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Logo iconOnly size="lg" />
                </motion.div>
                
                <span className="text-[10px] font-display font-black tracking-[0.3em] text-deep-sea uppercase mt-4 z-10">Arnevo Studio</span>
              </div>

              {/* Floating tags */}
              <motion.div
                className="absolute top-12 left-2 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-md shadow-md border border-deep-sea/5 text-deep-sea text-[11px] font-bold tracking-wider uppercase z-20 flex items-center gap-1.5"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blaze-orange"></div>
                ESTETİK RİTİM
              </motion.div>

              <motion.div
                className="absolute bottom-12 right-2 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-md shadow-md border border-deep-sea/5 text-deep-sea text-[11px] font-bold tracking-wider uppercase z-20 flex items-center gap-1.5"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-deep-sea"></div>
                HATIRLANIR İLETİŞİM
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Decorative Brand Anchor message bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-deep-sea/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wider uppercase font-semibold text-deep-sea/60">
        <div className="flex items-center gap-3">
          <span className="text-blaze-orange font-bold">●</span>
          <span>Markaların sadece görünür değil, hatırlanır olması için tasarlıyoruz.</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Arnevo © 2026</span>
          <span className="text-deep-sea/30">|</span>
          <span>İstanbul, Türkiye</span>
        </div>
      </div>
    </section>
  );
};
