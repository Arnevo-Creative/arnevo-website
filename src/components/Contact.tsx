import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MapPin, Mail, Clock, Phone, Sparkles, CheckCircle2 } from "lucide-react";
import { ContactFormData } from "../types";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    company: "",
    email: "",
    interests: [],
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Available service categories that fit their requirements
  const serviceOptions = [
    "Branding & Kurumsal Kimlik",
    "Grafik Tasarım",
    "Sosyal Medya",
    "Web Sitesi",
    "Mobil Uygulama",
    "Kampanya & Lansman",
  ];

  const handleInterestToggle = (service: string) => {
    let current = [...formData.interests];
    if (current.includes(service)) {
      current = current.filter((item) => item !== service);
    } else {
      current.push(service);
    }
    setFormData({ ...formData, interests: current });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Lütfen tüm zorunlu alanları doldurun (Ad Soyad, E-posta ve Mesaj).");
      return;
    }

    setIsSubmitting(true);
    // Simulating API loading with exquisite timing before success display
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      company: "",
      email: "",
      interests: [],
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <section id="iletisim" className="relative py-24 lg:py-32 bg-wild-sand bg-grain-texture px-6 lg:px-16 overflow-hidden">
      
      {/* Decorative SVG curves */}
      <div className="absolute inset-x-0 bottom-0 top-[40%] pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full text-deep-sea" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,500 C200,300 500,700 900,400 T1700,600" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M-50,550 C250,350 550,750 950,450 T1750,650" stroke="#FF6321" strokeWidth="0.5" strokeDasharray="4 4" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Intention text and Studio Coordinates */}
          <div className="lg:col-span- così lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] text-blaze-orange uppercase block mb-4">
                BİRLİKTE ÜRETELİM
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-mirage leading-tight mb-6">
                Markanız için akılda kalan bir <span className="font-serif text-deep-sea">görsel dünya</span> kuralım.
              </h2>
              <p className="text-mirage/80 leading-relaxed font-sans font-medium mb-12">
                Yeni bir marka kimliği, sosyal medya tasarım sistemi, web sitesi ya da kampanya fikri için bizimle iletişime geçin. Projenizi birlikte büyütelim.
              </p>
            </div>

            {/* Studio Coordinates Map Plate */}
            <div className="space-y-6 bg-white/40 backdrop-blur rounded-xl p-8 border border-deep-sea/10">
              <h4 className="text-xs uppercase tracking-widest font-black text-deep-sea mb-4">
                ARNEVO STUDIO OFİS
              </h4>
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-deep-sea/5 text-deep-sea mt-0.5">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-xs text-mirage/50 font-bold uppercase tracking-widest block mb-1">Adresimiz</span>
                  <p className="text-sm font-semibold text-mirage leading-relaxed">
                    Kemankeş Karamustafa Paşa Mh., Mumhane Cd. No:34, Beyoğlu, İstanbul / Türkiye
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-deep-sea/5 text-deep-sea mt-0.5">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-xs text-mirage/50 font-bold uppercase tracking-widest block mb-1">E-Posta</span>
                  <a href="mailto:hello@arnevo.studio" className="text-sm font-semibold text-deep-sea hover:text-blaze-orange transition-colors">
                    hello@arnevo.studio
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-deep-sea/5 text-deep-sea mt-0.5">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-xs text-mirage/50 font-bold uppercase tracking-widest block mb-1">Çalışma Saatleri</span>
                  <p className="text-sm font-semibold text-mirage">
                    Pazartesi – Cuma: 09:30 – 18:30 (GMT+3)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form and State animation */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-2xl border border-deep-sea/5 shadow-xl shadow-deep-sea/5 relative overflow-hidden min-h-[580px]">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                // FORM STATE
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-[11px] font-display font-black tracking-wider uppercase text-mirage/60">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Örn: Ayşe Yılmaz"
                        className="px-4 py-3 bg-deep-sea/5 border border-deep-sea/10 rounded-lg text-mirage text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blaze-orange focus:border-transparent transition-all placeholder:text-mirage/30"
                      />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-[11px] font-display font-black tracking-wider uppercase text-mirage/60">
                        Şirket / Girişim
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Örn: Arnevo Studio A.Ş."
                        className="px-4 py-3 bg-deep-sea/5 border border-deep-sea/10 rounded-lg text-mirage text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blaze-orange focus:border-transparent transition-all placeholder:text-mirage/30"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[11px] font-display font-black tracking-wider uppercase text-mirage/60">
                      E-posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Örn: hello@sirketiniz.com"
                      className="px-4 py-3 bg-deep-sea/5 border border-deep-sea/10 rounded-lg text-mirage text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blaze-orange focus:border-transparent transition-all placeholder:text-mirage/30"
                    />
                  </div>

                  {/* Services Needed Checklist */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-display font-black tracking-wider uppercase text-mirage/60 block">
                      Hizmet İhtiyacı (Çoklu Seçebilirsiniz)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service, index) => {
                        const isSelected = formData.interests.includes(service);
                        return (
                          <button
                            key={index}
                            type="button"
                            id={`contact-interest-btn-${index}`}
                            onClick={() => handleInterestToggle(service)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all duration-200 border ${
                              isSelected
                                ? "bg-blaze-orange text-white border-blaze-orange"
                                : "bg-deep-sea/5 hover:bg-deep-sea/10 text-mirage border-transparent"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[11px] font-display font-black tracking-wider uppercase text-mirage/60">
                      Proje Özetiniz & Mesajınız *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Markanız, bütçeniz ve gerçekleştirmek istediğiniz yaratıcı fikirleriniz hakkında kısa bir özet..."
                      className="px-4 py-3 bg-deep-sea/5 border border-deep-sea/10 rounded-lg text-mirage text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blaze-orange focus:border-transparent transition-all resize-none placeholder:text-mirage/30"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-form-submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden group w-full py-4 bg-blaze-orange text-wild-sand font-display font-semibold rounded-lg shadow-lg shadow-blaze-orange/20 transition-all duration-300 hover:shadow-xl hover:shadow-blaze-orange/30 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Kayıt Yapılıyor...
                        </>
                      ) : (
                        <>
                          Projeni Konuşalım
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                // SUCCESS STATE
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  {/* Glowing success circle */}
                  <div className="w-16 h-16 rounded-full bg-deep-sea/10 text-deep-sea flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 className="h-10 w-10 text-deep-sea" />
                  </div>

                  <span className="text-xs font-bold tracking-[0.3em] text-blaze-orange uppercase block mb-2">
                    TEŞEKKÜRLER!
                  </span>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-mirage mb-4">
                    Tasarım Talebiniz Alındı
                  </h3>

                  <p className="text-mirage/70 max-w-md text-sm sm:text-base leading-relaxed mb-8">
                    Sevgili <span className="font-bold text-mirage">{formData.fullName}</span>, bizimle iletişime geçtiğin için çok memnunuz. Yaratıcı ekibimiz proje detaylarını incelemeye başladı.
                  </p>

                  {/* Response details */}
                  <div className="w-full max-w-sm bg-wild-sand/80 border border-deep-sea/10 p-5 rounded-lg text-left text-xs mb-8">
                    <div className="flex justify-between py-1.5 border-b border-deep-sea/5">
                      <span className="text-mirage/50 uppercase font-black tracking-widest">Geri Dönüş Süresi</span>
                      <span className="font-bold text-deep-sea font-display">&lt; 24 Saat</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-deep-sea/5">
                      <span className="text-mirage/50 uppercase font-black tracking-widest">İrtibat E-Postası</span>
                      <span className="font-bold text-mirage font-mono">{formData.email}</span>
                    </div>
                    {formData.interests.length > 0 && (
                      <div className="flex justify-between py-1.5">
                        <span className="text-mirage/50 uppercase font-black tracking-widest">İlgi Alanları</span>
                        <span className="font-bold text-blaze-orange">{formData.interests.join(", ")}</span>
                      </div>
                    )}
                  </div>

                  <button
                    id="contact-form-reset-btn"
                    onClick={resetForm}
                    className="px-6 py-3 border border-deep-sea/20 hover:border-deep-sea text-deep-sea rounded-lg text-xs font-display font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Yeni Bir Mesaj Gönder
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
