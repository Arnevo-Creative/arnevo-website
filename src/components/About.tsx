import React from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, Layers } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="hakkimizda" className="relative py-24 lg:py-32 bg-mirage text-wild-sand overflow-hidden px-6 lg:px-16">
      {/* Decorative vector overlays */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full border border-blaze-orange/30 animate-wave-slow"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full border border-deep-sea/30 animate-wave-medium"></div>
        
        {/* Dynamic flowing lines */}
        <svg className="absolute inset-0 w-full h-full text-deep-sea opacity-40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-200,300 Q200,100 600,450 T1400,200" stroke="currentColor" strokeWidth="1" />
          <path d="M-100,350 Q300,150 700,500 T1500,250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Heading & Large Aesthetic Statement */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blaze-orange/10 text-blaze-orange text-xs font-semibold uppercase tracking-widest mb-6 border border-blaze-orange/20">
              <Compass className="h-3 w-3 animate-spin-slow" />
              <span>Vizyon & Estetik</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-8">
              Tasarımı yalnızca estetik değil,{" "}
              <span className="text-blaze-orange font-serif">marka hafızası</span> olarak görüyoruz.
            </h2>


          </div>

          {/* Right Column: Narrative and Brand Philosophy and Core Pillars */}
          <div className="lg:col-span-6 lg:pl-6 flex flex-col justify-center">
            <div className="space-y-6 text-white/85 text-lg leading-relaxed font-sans font-light">
              <p>
                <span className="text-white font-semibold">Arnevo</span>, ilhamını <span className="text-blaze-orange font-semibold">Art Nouveau’nun</span> akışkan çizgilerinden, zarif formlarından ve sanatla tasarımı bir araya getiren güçlü estetik anlayışından alır.
              </p>
              <p className="border-l-2 border-blaze-orange pl-5 my-6 text-wild-sand/90 font-serif">
                "Bizim için tasarım, yalnızca güzel görünen işler üretmek değil; markalara karakter, ritim ve hatırlanabilirlik kazandırmaktır."
              </p>
              <p>
                Her projeye estetik bir bakışla, stratejik bir düşünceyle ve yaratıcı bir disiplinle yaklaşırız. Klasik detayları, modern dünyanın gereklilikleriyle harmanlayarak zamansız görsel sistemler inşa ediyoruz.
              </p>
            </div>

            {/* Iconic Values / Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-2">
                <span className="text-blaze-orange text-2xl font-serif">01.</span>
                <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white">ESTETİK BAKIŞ</h5>
                <p className="text-white/60 text-xs leading-relaxed">Art Nouveau akışkanlığını çağdaş sadelikle birleştiriyoruz.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-blaze-orange text-2xl font-serif">02.</span>
                <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white">STRATEJİK ODAK</h5>
                <p className="text-white/60 text-xs leading-relaxed">Hedef kitleyi kavrayan, pazar hafızasını tetikleyen kurgular.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-blaze-orange text-2xl font-serif">03.</span>
                <h5 className="font-display font-bold text-sm tracking-wider uppercase text-white">MARKA RİTMİ</h5>
                <p className="text-white/60 text-xs leading-relaxed">Tüm temas noktalarından sızan tutarlı ve taze görsel dil.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
