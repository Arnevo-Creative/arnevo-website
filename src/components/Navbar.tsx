import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HAKKIMIZDA", href: "#hakkimizda" },
    { label: "HİZMETLERİMİZ", href: "#hizmetler" },
    { label: "YAKLAŞIM", href: "#yaklasim" },
    { label: "İŞLERİMİZ", href: "#islerimiz" },
    { label: "NEDEN ARNEVO", href: "#neden-arnevo" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-wild-sand/80 backdrop-blur-xl border-b border-deep-sea/10 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between">
          
          {/* Logo link */}
          <a href="#" className="focus:outline-none" aria-label="Arnevo Creative Studio Ana Sayfa">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-display font-bold uppercase tracking-wider text-mirage/70 hover:text-deep-sea transition-colors relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blaze-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              id="navbar-cta-contact"
              href="#iletisim"
              className="px-5 py-2.5 bg-deep-sea hover:bg-blaze-orange text-white rounded-lg text-xs font-display font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 shadow-sm"
            >
              PROJENİ KONUŞALIM
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-mirage hover:bg-deep-sea/5 focus:outline-none"
            aria-label="Menüyü Aç/Kapat"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer panel overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-24 bg-wild-sand/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between px-6 pb-12"
          >
            <div className="flex flex-col gap-6 py-6 border-t border-deep-sea/10">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-black text-2xl text-mirage uppercase tracking-wider py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#iletisim"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-black text-2xl text-blaze-orange uppercase tracking-wider py-2"
              >
                İLETİŞİM
              </a>
            </div>

            <div className="space-y-6 pt-6 border-t border-deep-sea/10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-deep-sea block mb-1">
                  Arnevo Creative Studio
                </span>
                <p className="text-xs text-mirage/60 leading-relaxed font-sans font-light">
                  Kemankeş Karamustafa Paşa Mh., Beyoğlu, İstanbul / Türkiye
                </p>
              </div>

              {/* Mobile CTA */}
              <a
                id="navbar-mobile-cta"
                href="#iletisim"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 bg-blaze-orange text-white flex items-center justify-center gap-2 font-display font-bold uppercase tracking-widest rounded-lg text-xs"
              >
                PROJENİ KONUŞALIM
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
