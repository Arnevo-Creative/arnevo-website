import React from "react";
import { motion } from "motion/react";
import { Sparkles, Milestone, Compass, HeartHandshake } from "lucide-react";

interface AdvantageItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

export const WhyArnevo: React.FC = () => {
  const advantages: AdvantageItem[] = [
    {
      id: "adv-1",
      num: "01",
      title: "Sanatsal bakışla stratejik düşünceyi birleştiririz.",
      desc: "İlham dolu estetiği salt sürprizsizlik veya rastgelelik için değil; pazar dinamikleri ve rasyonel marka konumlandırması doğrultusunda şekillendiririz.",
    },
    {
      id: "adv-2",
      num: "02",
      title: "Markalar için tutarlı ve akılda kalan görsel sistemler kurarız.",
      desc: "Tekil, kopuk parçalar üretmez; gelecekte de büyüyecek ve genişleyebilecek, her açıdan uyum içinde çalışan tasarımsal ekosistemler oluştururuz.",
    },
    {
      id: "adv-3",
      num: "03",
      title: "Her işi tekil bir tasarım çıktısı değil, marka algısının parçası olarak ele alırız.",
      desc: "Yapılan her afiş, her piksel ve her çizgi, tüketicinin zihninde birikecek olan itibarlı ve köklü marka algısının kilit birer tuğlasıdır.",
    },
    {
      id: "adv-4",
      num: "04",
      title: "Dijital ve basılı tüm temas noktalarında bütünlüklü bir dil oluştururuz.",
      desc: "Web arayüzünden basılı ambalaja, sosyal medya hikayelerinden editoryal raporlara kadar her platformda aynı güçlü titreşimi koruruz.",
    },
  ];

  return (
    <section id="neden-arnevo" className="relative py-24 lg:py-32 bg-mirage text-wild-sand overflow-hidden px-6 lg:px-16">
      
      {/* Background flowing decor reminiscent of Art Nouveau lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="absolute bottom-0 right-0 w-[50%] h-[70%] text-deep-sea"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Elegant geometric swirl path */}
          <path
            d="M 500 500 C 400 350, 200 450, 150 250 C 100 50, 300 0, 100 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="200" r="100" stroke="#FF6321" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>

        {/* Floating circles */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full border border-blaze-orange/30 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs font-bold tracking-[0.3em] text-blaze-orange uppercase block mb-4">
            NEDEN BİZ?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Çünkü iyi tasarım sadece dikkat çekmez, <span className="font-serif text-blaze-orange font-semibold">iz bırakır</span>.
          </h2>
          <p className="text-white/60 text-sm font-sans mt-6 max-w-xl">
            Arnevo olarak her projedeki temel hedefimiz, markaların hızlı tüketilen dünyada kalıcı görsellikler kazanmasını ve benzersiz bir iz bırakmasını sağlamaktır.
          </p>
        </div>

        {/* Elegant Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {advantages.map((adv, index) => (
            <motion.div
              key={adv.id}
              id={`why-card-${adv.id}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-5 sm:gap-6 group"
            >
              {/* Premium Numeric Pillar Indicator */}
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="font-serif text-3xl text-blaze-orange leading-none mb-2 select-none group-hover:scale-110 transition-transform">
                  {adv.num}
                </span>
                <div className="w-[1px] h-full bg-gradient-to-b from-blaze-orange to-transparent"></div>
              </div>

              {/* Advantage Content */}
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3 group-hover:text-blaze-orange transition-colors">
                  {adv.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans font-light">
                  {adv.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Studio Motto Accent */}
        <div className="mt-24 bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blaze-orange/10 rounded-lg text-blaze-orange">
              <Milestone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Arnevo Creative Studio İmzası</h4>
              <p className="text-xs text-white/50 font-sans mt-0.5">Tasarladığımız her marka ruhunuza yeni bir soluk üfler.</p>
            </div>
          </div>
          <div className="text-right text-xs uppercase tracking-widest text-deep-sea">
            <span className="text-blaze-orange font-bold font-serif text-base">"Sade, Güçlü, Zamansız"</span>
          </div>
        </div>

      </div>
    </section>
  );
};
