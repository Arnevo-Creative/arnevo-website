import React from "react";
import { Logo } from "./Logo";
import { ArrowUp, Mail, MapPin, Instagram, Linkedin, Globe, MessageCircleHeart } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Ana Sayfa", href: "#" },
    { label: "Hakkımızda", href: "#hakkimizda" },
    { label: "Hizmetlerimiz", href: "#hizmetler" },
    { label: "Yaklaşım", href: "#yaklasim" },
    { label: "İşlerimiz", href: "#islerimiz" },
    { label: "Neden Arnevo", href: "#neden-arnevo" },
    { label: "İletişim", href: "#iletisim" },
  ];

  return (
    <footer className="relative bg-mirage text-wild-sand pt-20 pb-12 overflow-hidden px-6 lg:px-16 border-t border-white/5">
      
      {/* Decorative backdrop wave lines */}
      <div className="absolute inset-x-0 top-0 pointer-events-none opacity-10">
        <svg className="w-full h-24 text-blaze-orange" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
          <path d="M0,50 C300,100 600,0 900,50 C1200,100 1300,30 1440,50 L1440,0 L0,0 Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Logo brand info column (4 columns) */}
          <div className="md:col-span-5 space-y-6">
            <Logo inverse size="lg" />
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Art Nouveau ruhunu modern ve iddialı tasarım diliyle harmanlayarak, markalar için sadece görünen değil, hafızalara kazınan görsel evrenler kuruyoruz.
            </p>
            
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-linkedin"
                className="p-3 bg-white/5 hover:bg-blaze-orange hover:text-white rounded-lg transition-all duration-300 border border-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-instagram"
                className="p-3 bg-white/5 hover:bg-blaze-orange hover:text-white rounded-lg transition-all duration-300 border border-white/10"
                aria-label="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-dribbble"
                className="p-3 bg-white/5 hover:bg-blaze-orange hover:text-white rounded-lg transition-all duration-300 border border-white/10"
                aria-label="Dribbble"
              >
                <Globe className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                id="footer-social-behance"
                className="p-3 bg-white/5 hover:bg-blaze-orange hover:text-white rounded-lg transition-all duration-300 border border-white/10"
                aria-label="Behance"
              >
                <MessageCircleHeart className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick links column (3 columns) */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-black text-blaze-orange">
              HARİTA & NAVİGASYON
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-blaze-orange transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-blaze-orange/40"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact snippet (4 columns) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-black text-blaze-orange">
              ARNEVO STUDIO ANKARA & İSTANBUL
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blaze-orange flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/70 leading-relaxed">
                  Kemankeş Karamustafa Paşa Mh., Mumhane Cd. No:34, Beyoğlu, İstanbul / Türkiye
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blaze-orange flex-shrink-0" />
                <a href="mailto:hello@arnevo.studio" className="text-xs text-white/70 hover:text-blaze-orange transition-colors">
                  hello@arnevo.studio
                </a>
              </div>
            </div>

            {/* Premium scroll up CTA */}
            <div className="pt-4">
              <button
                id="footer-scroll-top-btn"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-blaze-orange text-xs font-display font-bold uppercase tracking-wider transition-all border border-white/10 group cursor-pointer"
              >
                YUKARI ÇIK
                <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Studio copyrights and meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 text-xs text-white/40">
          <p>© 2026 Arnevo Creative Studio. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href="#hakkimizda" className="hover:text-blaze-orange transition-colors">Gizlilik Sözleşmesi</a>
            <span>•</span>
            <a href="#hizmetler" className="hover:text-blaze-orange transition-colors">Kullanım Koşulları</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
