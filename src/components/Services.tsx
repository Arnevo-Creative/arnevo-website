import React from "react";
import { motion } from "motion/react";
import {
  Palette,
  Award,
  Bookmark,
  Share2,
  Megaphone,
  Globe2,
  Smartphone,
  Presentation,
  Compass,
} from "lucide-react";

export interface ServiceData {
  id: string;
  num: string;
  title: string;
  description: string;
  bullets: string[];
  icon: any;
}

export const Services: React.FC = () => {
  const servicesList: ServiceData[] = [
    {
      id: "branding",
      num: "01",
      title: "Branding & Kurumsal Kimlik",
      description: "Markanızın karakterini, duruşunu ve görsel dünyasını baştan sona tasarlarız.",
      bullets: ["Logo & amblem", "Kurumsal renk kuralları", "Tipografi sistemi"],
      icon: Award,
    },
    {
      id: "grafik-tasarim",
      num: "02",
      title: "Grafik Tasarım",
      description: "Dijital ve basılı tüm iletişim kanalları için güçlü, tutarlı ve dikkat çekici tasarımlar üretiriz.",
      bullets: ["Basılı dökümanlar", "Editoryal yayınlar", "İllüstrasyonlar"],
      icon: Palette,
    },
    {
      id: "sosyal-medya",
      num: "03",
      title: "Sosyal Medya Tasarımı",
      description: "Markanızın sosyal medyada yalnızca görünmesini değil, akılda kalmasını sağlayan kreatif içerik sistemleri oluştururuz.",
      bullets: ["Kreatif içerik kurgusu", "Özel şablon tasarımları", "Motion içerikler"],
      icon: Share2,
    },
    {
      id: "web-sitesi",
      num: "04",
      title: "Web Sitesi Tasarımı",
      description: "Marka algısını güçlendiren, kullanıcı dostu ve modern web arayüzleri tasarlarız.",
      bullets: ["Arayüz tasarımı (UI/UX)", "Responsive tasarım", "Mikro-etkileşimler"],
      icon: Globe2,
    },
    {
      id: "mobil-uygulama",
      num: "05",
      title: "Mobil Uygulama Tasarımı",
      description: "Mobil deneyimler için estetik, anlaşılır ve kullanımı kolay arayüzler oluştururuz.",
      bullets: ["Mobil arayüz mimarisi", "Kullanıcı deneyimi akışları", "Prototipleme"],
      icon: Smartphone,
    },
    {
      id: "kampanya-lansman",
      num: "06",
      title: "Kampanya ve Lansman Tasarımları",
      description: "Markanızın mesajını güçlü bir görsel dile dönüştüren kampanya dünyaları ve lansman dökümanları tasarlarız.",
      bullets: ["Kampanya ana görseli (KV)", "Lansman kitleri", "Etkinlik görselleri"],
      icon: Megaphone,
    },
    {
      id: "logo-kimlik",
      num: "07",
      title: "Logo ve Kurumsal Kimlik Tasarımı",
      description: "Markanızı temsil eden, akılda kalıcı sembolleri, logotipleri ve tam kapsamlı kurumsal kimlik yönergelerini hazırlarız.",
      bullets: ["Logotip tasarımı", "Kurumsal kimlik kılavuzu", "Yenileme (Rebranding)"],
      icon: Bookmark,
    },
    {
      id: "sunum-dokuman",
      num: "08",
      title: "Sunum ve Dijital Doküman Tasarımları",
      description: "İş fikirlerinizi ve projelerinizi yatırımcılara veya iş ortaklarınıza aktaran premium sunum dosyaları kurarız.",
      bullets: ["Pitch deck tasarımı", "Yatırımcı raporları", "Kurumsal broşürler"],
      icon: Presentation,
    },
    {
      id: "gorsel-dil",
      num: "09",
      title: "Marka Görsel Dili Oluşturma",
      description: "Markaların tüm iletişim zeminlerinde tutarlı, ritmik ve kendilerine has bir sanatsal vizyonla konuşmasını sağlarız.",
      bullets: ["Görsel ritim kurgusu", "Marka dili denetimi", "Sürdürülebilir şablonlar"],
      icon: Compass,
    },
  ];

  return (
    <section id="hizmetler" className="relative py-24 lg:py-32 bg-wild-sand bg-grain-texture px-6 lg:px-16 overflow-hidden">
      {/* Decorative backdrop details */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg className="absolute top-[30%] -right-12 w-64 h-64 text-deep-sea/10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 3"/>
        </svg>
        <svg className="absolute bottom-[20%] -left-12 w-80 h-80 text-blaze-orange/10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 6"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <span className="text-xs font-bold tracking-[0.3em] text-blaze-orange uppercase block mb-4">
            NELER YAPIYORUZ?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-mirage leading-tight">
            Markanızın ihtiyaç duyduğu <span className="font-serif text-deep-sea font-semibold">yaratıcı üretim</span> alanları
          </h2>
          <div className="w-16 h-[2px] bg-blaze-orange mt-8"></div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative bg-white border border-deep-sea/5 rounded-xl p-8 hover:shadow-xl hover:shadow-deep-sea/5 transition-all group flex flex-col justify-between"
              >
                {/* Flow Lines pattern inside card on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-deep-sea via-blaze-orange to-deep-sea origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl"></div>
                
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Visual Icon Container */}
                    <div className="p-4 rounded-lg bg-deep-sea/5 text-deep-sea group-hover:bg-blaze-orange group-hover:text-white transition-colors duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {/* Index Number */}
                    <span className="font-display font-light text-xl text-deep-sea/25 font-mono">
                      {service.num}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-mirage mb-4 group-hover:text-deep-sea transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-mirage/70 text-sm leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Bullets lists */}
                <div className="border-t border-deep-sea/5 pt-4 mt-auto">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {service.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-[10px] font-display font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-deep-sea/5 text-deep-sea/80"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
