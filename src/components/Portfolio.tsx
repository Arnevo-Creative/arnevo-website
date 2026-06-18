import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Filter, X, Sparkles, FolderKanban } from "lucide-react";
import { PortfolioItem } from "../types";

export const Portfolio: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filterOptions = [
    { key: "all", label: "Tüm İşler" },
    { key: "identity", label: "Kimlik & Tasarım" },
    { key: "digital", label: "Dijital & Web" },
    { key: "campaign", label: "Kampanya & Lansman" },
  ];

  const projects: PortfolioItem[] = [
    {
      id: "proj-1",
      title: "Marka Kimliği Tasarımı",
      category: "identity",
      description: "Zarif formlar ve güçlü tipografi ile şekillenen, çağdaş sanat evine yakışır esnek ve akılda kalıcı kurumsal kimlik yönergesi.",
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
      year: "2026",
      client: "Aura Sanat Galerisi",
      services: ["Logo Tasarımı", "Kurumsal Kimlik", "Tipografi Rehberi", "Ambalaj Çözümleri"],
      accentColor: "from-deep-sea to-[#006666]",
    },
    {
      id: "proj-2",
      title: "Sosyal Medya Görsel Dünyası",
      category: "campaign",
      description: "Modern gastronomi markası için sosyal medya feed bütünlüğünü baştan tasarladık; görünürlüğü %300 artıran şablon dili.",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
      year: "2025",
      client: "Nouveau Canteen",
      services: ["Sosyal Medya Stratejisi", "Görsel Şablon Seti", "Fotoğraf Sanat Yönetimi"],
      accentColor: "from-blaze-orange to-[#ff804a]",
    },
    {
      id: "proj-3",
      title: "Web Sitesi Arayüz Tasarımı",
      category: "digital",
      description: "Yenilikçi mimarlık stüdyosunun işlerini sergilemek üzere tasarlanmış, akışkan animasyonlu ve net ızgaralı portfolio web tasarımı.",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      year: "2026",
      client: "Mono Architects",
      services: ["Web UI/UX Tasarımı", "Etkileşim Tasarımı", "Responsive Grid Kurgusu"],
      accentColor: "from-[#002727] to-deep-sea",
    },
    {
      id: "proj-4",
      title: "Kampanya Tasarım Sistemi",
      category: "campaign",
      description: "Sürdürülebilir giyim markasının yeni koleksiyon lansmanı için oluşturulmuş; dijital, açık hava ve ambalajı birleştiren görsel ekosistem.",
      imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1200&auto=format&fit=crop",
      year: "2025",
      client: "Ecoluxe Clothing",
      services: ["Kampanya Ana Görseli (KV)", "Açık Hava Reklamları", "Sosyal Medya Hikayeleştirme"],
      accentColor: "from-blaze-orange via-deep-sea to-mirage",
    },
    {
      id: "proj-5",
      title: "Mobil Uygulama Arayüzü",
      category: "digital",
      description: "Mindfulness ve nefes takibi odaklı esenlik uygulaması için Art Nouveau akışkanlığını yansıtan dinlendirici, organik mobil arayüz.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
      year: "2026",
      client: "Rhythm Wellness",
      services: ["Mobil App UI/UX", "İnteraktif Akış Şemaları", "Karanlık Tema Tasarımı", "Mikro-Animasyonlar"],
      accentColor: "from-deep-sea to-blaze-orange",
    },
    {
      id: "proj-6",
      title: "Lansman Görsel Dili",
      category: "campaign",
      description: "Premium teknoloji zirvesi için tasarlanan; dijital ekranlar, sunum dokümanları ve basılı broşürlerde bütünlük sağlayan prestijli tema.",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      year: "2026",
      client: "Summit 26 Technology",
      services: ["Lansman Kimlik Dili", "Sunum Şablonları", "Event Tasarımları", "Sosyal Medya Kitleri"],
      accentColor: "from-mirage to-deep-sea",
    },
  ];

  const filteredProjects = selectedFilter === "all"
    ? projects
    : projects.filter(p => p.category === selectedFilter);

  return (
    <section id="islerimiz" className="relative py-24 lg:py-32 bg-wild-sand bg-grain-texture px-6 lg:px-16 overflow-hidden">
      
      {/* Absolute Decorative lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-deep-sea/10 to-transparent"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Header and Filter Navigation Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-blaze-orange uppercase block mb-4">
              PORTFOLYO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-mirage leading-none">
              Akılda kalan <span className="font-serif text-deep-sea font-semibold">işlerimiz</span>
            </h2>
          </div>

          {/* Inline Beautiful filter controls */}
          <div className="flex flex-wrap items-center gap-2 bg-deep-sea/5 p-1.5 rounded-xl border border-deep-sea/10">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                id={`portfolio-filter-btn-${opt.key}`}
                onClick={() => setSelectedFilter(opt.key)}
                className={`px-4 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === opt.key
                    ? "bg-deep-sea text-wild-sand shadow-sm"
                    : "text-mirage/60 hover:text-mirage hover:bg-deep-sea/5"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                id={`portfolio-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image panel */}
                <div className="relative overflow-hidden rounded-xl bg-mirage/5 aspect-4/3 mb-5 border border-deep-sea/10">
                  {/* Decorative background grid inside box */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mirage/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6">
                    <span className="text-[10px] font-bold tracking-widest text-blaze-orange uppercase mb-1">
                      {project.client}
                    </span>
                    <h4 className="text-white font-display font-bold text-xl leading-snug flex items-center gap-1">
                      {project.title}
                      <ArrowUpRight className="h-4 w-4 text-blaze-orange" />
                    </h4>
                  </div>

                  {/* Fallback pattern of abstract gradient representing high-design */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-20 mix-blend-multiply transition-transform duration-700 group-hover:scale-105`}></div>
                  
                  {/* Beautiful crisp Unsplash photography inside container */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />

                  {/* Top category pill tag */}
                  <div className="absolute top-4 left-4 bg-wild-sand/90 backdrop-blur px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest text-deep-sea border border-deep-sea/10 z-10">
                    {project.client}
                  </div>

                  {/* Top year tag */}
                  <div className="absolute top-4 right-4 bg-mirage/80 backdrop-blur px-2.5 py-1 rounded-md text-[9px] font-mono text-wild-sand tracking-widest z-10">
                    {project.year}
                  </div>
                </div>

                {/* Text and context below line */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-lg text-mirage group-hover:text-deep-sea transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-mirage/60 mt-1 line-clamp-1 font-medium font-sans">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-blaze-orange p-1.5 rounded-full border border-transparent group-hover:border-blaze-orange/20 group-hover:bg-blaze-orange/5 transition-all">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick portfolio note footer */}
        <div className="mt-16 text-center">
          <p className="text-xs text-mirage/40 font-mono tracking-wider uppercase flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blaze-orange" />
            BU COĞRAFYANIN KÜRESEL VİZYONUNU SİMGELİYORUZ. YAKINDA DAHA FAZLA PROJE SİZLERLE.
          </p>
        </div>

      </div>

      {/* High-Fidelity Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-mirage/70 backdrop-blur-md"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-wild-sand rounded-2xl shadow-2xl overflow-hidden border border-deep-sea/10 z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                id="portfolio-close-modal"
                id-data={selectedProject.id}
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-mirage/10 hover:bg-mirage text-mirage hover:text-white transition-colors"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Left Column: Visual representation */}
              <div className="md:col-span-5 relative bg-mirage flex flex-col justify-between overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${selectedProject.accentColor} opacity-40 mix-blend-multiply`}></div>
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity grayscale shadow-inner"
                />

                {/* Abstract Line deco */}
                <svg className="absolute inset-0 w-full h-full opacity-60 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-10,80 Q20,30 110,90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3"/>
                </svg>

                {/* Floating Content summary at bottom left */}
                <div className="relative z-10 p-8 mt-auto text-white">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blaze-orange block mb-1">
                    Müşteri
                  </span>
                  <h4 className="font-display font-extrabold text-2xl leading-tight mb-2">
                    {selectedProject.client}
                  </h4>
                  <div className="w-8 h-1 bg-blaze-orange rounded"></div>
                </div>
              </div>

              {/* Right Column: Narrative Detail and Work Scope specs */}
              <div className="md:col-span-7 p-8 sm:p-12 overflow-y-auto max-h-[90vh]">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-deep-sea uppercase mb-4">
                  <FolderKanban className="h-3.5 w-3.5" />
                  <span>Proje Detayı</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-mirage mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-mirage/80 leading-relaxed font-sans font-light text-base mb-8">
                  {selectedProject.description}
                </p>

                {/* Project Specs */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-deep-sea/10 py-6 mb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-mirage/40 font-bold block mb-1">
                      Hizmet Türü
                    </span>
                    <span className="text-sm font-semibold text-deep-sea">
                      {selectedProject.category === "identity" ? "Logo & Marka Kimliği" : selectedProject.category === "digital" ? "Web & Mobil Arayüz" : "Kampanya Entegrasyonu"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-mirage/40 font-bold block mb-1">
                      Yapım Yılı
                    </span>
                    <span className="text-sm font-semibold text-deep-sea">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>

                {/* Services Checklist */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-mirage font-bold mb-4">
                    BU PROJEDE SUNULAN DEĞERLER:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((srv, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1.5 rounded-lg bg-deep-sea/5 text-deep-sea font-display font-medium border border-deep-sea/10"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions close */}
                <div className="mt-12 flex items-center justify-end">
                  <button
                    id="portfolio-close-modal-btn"
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 bg-mirage hover:bg-blaze-orange text-white rounded-lg font-display font-semibold transition-colors duration-200 text-xs uppercase tracking-wider"
                  >
                    Pencereyi Kapat
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
