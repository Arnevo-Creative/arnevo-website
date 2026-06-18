import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Settings, Compass, Shuffle, CheckCircle, ArrowRight } from "lucide-react";

interface ApproachStep {
  id: number;
  stage: string;
  name: string;
  desc: string;
  icon: any;
  details: string[];
  duration: string;
}

export const Approach: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: ApproachStep[] = [
    {
      id: 1,
      stage: "Aşamalar 01",
      name: "Anlarız",
      desc: "Markanın hedeflerini, hedef kitlesini, vizyonunu ve en temel iletişim ihtiyacını derin sorularla analiz ederek netleştiririz.",
      icon: Eye,
      details: [
        "Kurucu ortaklar ve kilit paydaşlarla kapsamlı keşif atölyeleri düzenlenmesi.",
        "Mevcut pazar analizi ve rakiplerin görsel zayıflıklarının tespiti.",
        "Kitle psikolojisi ve görsel dil beklentilerinin haritalandırılması.",
      ],
      duration: "1-2 Hafta",
    },
    {
      id: 2,
      stage: "Aşamalar 02",
      name: "Kurgularız",
      desc: "Keşfettiklerimizden yola çıkarak sürprizsiz ve nokta atışı bir görsel dil, ana tasarım yönü ve stratejik iletişim kurguları hazırlarız.",
      icon: Compass,
      details: [
        "Farklı artistik yönleri gösteren 2 adet tematik Moodboard hazırlanması.",
        "Renk psikolojisi matrisleri ve tipografi hiyerarşisi tasarımı.",
        "Ana fikir ve tasarım konsepti 'Creative Direction' sunumu.",
      ],
      duration: "1 Hafta",
    },
    {
      id: 3,
      stage: "Aşamalar 03",
      name: "Tasarlıyoruz",
      desc: "Markanın karakterini, değerlerini ve ritmini birebir yansıtan, özgün, tutarlı ve titizlikle işlenmiş yüksek nitelikli tasarımlar üretiriz.",
      icon: Shuffle,
      details: [
        "Art Nouveau süzgecinden geçmiş modern logo ve kurumsal kimlik eskizleri.",
        "Tüm kilit temas noktaları, dijital arayüz şablonları ve dinamik düzen kurguları.",
        "Detay kalitesi yüksek, piksel kusursuzluğunda basılı/dijital mockup'lar.",
      ],
      duration: "2-3 Hafta",
    },
    {
      id: 4,
      stage: "Aşamalar 04",
      name: "Sisteme Dönüştürürüz",
      desc: "Tek seferlik geçici bir tasarım çıktısı değil; ekibinizin kolayca yönetebileceği, canlı ve sürdürülebilecek ölçeklenebilir marka dili sunarız.",
      icon: Settings,
      details: [
        "Tüm kuralları, varyasyonları içeren dijital interaktif Marka Kimliği Kitabı (Brand Guide).",
        "Ekibiniz için Figma kütüphaneleri, sosyal medya içerik şablonları kiti.",
        "Kusursuz geliştirme entegrasyonu için varlıkların (assets) hazır servis organizasyonu.",
      ],
      duration: "1 Hafta",
    },
  ];

  return (
    <section id="yaklasim" className="relative py-24 lg:py-32 bg-deep-sea text-wild-sand overflow-hidden px-6 lg:px-16">
      
      {/* Background decoration loops inside Approach */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg className="absolute top-[20%] left-[5%] w-[600px] h-[600px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#FF6321" strokeWidth="0.5" strokeDasharray="3 3" />
          <path d="M50,10 L50,90 M10,50 L90,50" stroke="#F4F7F5" strokeWidth="0.25" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold tracking-[0.3em] text-blaze-orange uppercase block mb-4">
              ÜRETİM SÜRECİMİZ
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Her marka için ayrı bir <span className="font-serif text-blaze-orange font-semibold">görsel ritim</span> kurarız.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <p className="text-white/70 text-sm leading-relaxed font-sans font-normal">
              Yaratıcı yolculuğu şansa bırakmıyoruz. Arnevo'nun kurumsal adımları, sanatsal ilhamı katı disiplinle birleştirerek markanız için öngörülebilir mükemmelliği garanti eder.
            </p>
          </div>
        </div>

        {/* Process Steps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Active Navigation List (Cards style left side) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = activeStep === step.id;
              
              return (
                <button
                  key={step.id}
                  id={`approach-step-btn-${step.id}`}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-6 rounded-xl border flex items-start gap-4 transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 border-blaze-orange shadow-lg shadow-blaze-orange/10 pl-8 text-white scale-[1.01]"
                      : "bg-white/5 border-white/5 hover:bg-white/7 border-white/10 text-white/70 hover:pl-7"
                  }`}
                >
                  <div className={`p-3 rounded-lg flex-shrink-0 transition-colors ${
                    isActive ? "bg-blaze-orange text-white" : "bg-white/5 text-white/50"
                  }`}>
                    <StepIcon className="h-5 w-5" />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-blaze-orange">
                        {step.stage}
                      </span>
                      <span className="text-xs font-serif text-white/40">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg">
                      {step.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Step Display Details (Right side) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 sm:p-12 rounded-2xl relative min-h-[440px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blaze-orange/5 blur-2xl rounded-full"></div>
            
            <AnimatePresence mode="wait">
              {steps.map((step) => {
                if (step.id !== activeStep) return null;
                const StepIcon = step.icon;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-between h-full space-y-8"
                  >
                    <div>
                      {/* Big decorative head index */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-blaze-orange/10 text-blaze-orange flex items-center justify-center">
                          <StepIcon className="h-6 w-6 animate-pulse" />
                        </div>
                        <span className="font-serif text-5xl text-white/10 select-none">
                          0{step.id}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-2xl text-white mb-4">
                        Nasıl {step.name}?
                      </h3>

                      {/* Main Paragraph */}
                      <p className="text-white/80 font-sans font-light text-base leading-relaxed mb-6">
                        {step.desc}
                      </p>

                      {/* Strategic deliverables checklists */}
                      <div className="border-t border-white/10 pt-6 mt-6">
                        <h4 className="text-xs font-display font-semibold tracking-widest text-white uppercase mb-4">
                          BU FAZDA NE SUNUYORUZ?
                        </h4>
                        <ul className="space-y-3.5">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                              <CheckCircle className="h-4 w-4 text-blaze-orange flex-shrink-0 mt-0.5" />
                              <span className="font-sans">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline connection */}
                    <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-6 mt-8">
                      <span>Arnevo Metodolojisi</span>
                      <span className="flex items-center gap-1">
                        Sıradaki: {step.id < 4 ? steps[step.id].name : "Proje Lansmanı"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
