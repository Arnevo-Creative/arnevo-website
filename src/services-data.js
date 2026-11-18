// Content is rendered into HTML at build time, so it remains available without JavaScript.
export { contactDetailsHref as contactHref } from './contact-config.js';

export const services = [
  {
    id: 'ui-ux', title: 'UI/UX Tasarım', shortTitle: 'UI/UX Tasarım', category: 'Dijital deneyim', visual: 'interface',
    description: 'Kullanıcıların kolayca kullanabileceği, işletmelerin hedeflerine ulaşmasını sağlayan dijital deneyimler tasarlıyoruz.',
    scope: ['Kullanıcı deneyimi tasarımı', 'Kullanıcı arayüzü tasarımı', 'Wireframe ve prototipleme', 'Dashboard ve SaaS arayüzleri', 'Kullanıcı akışları', 'UX analizi ve iyileştirme'],
  },
  {
    id: 'mobil-uygulama', title: 'Mobil Uygulama Tasarımı', shortTitle: 'Mobil Uygulama', category: 'Mobil deneyim', visual: 'mobile',
    description: 'iOS ve Android için modern, kullanıcı dostu ve güçlü mobil uygulama deneyimleri oluşturuyoruz.',
    scope: ['iOS ve Android uygulama tasarımı', 'Mobil UI/UX', 'Onboarding deneyimleri', 'İnteraktif prototipler', 'Mobil tasarım sistemleri'],
  },
  {
    id: 'marka-kimligi', title: 'Marka ve Kurumsal Kimlik', shortTitle: 'Marka Kimliği', category: 'Markalaşma', visual: 'brand',
    description: 'Markanızın karakterini, değerlerini ve hikâyesini yansıtan özgün görsel kimlikler oluşturuyoruz.',
    scope: ['Logo tasarımı', 'Marka kimliği', 'Kurumsal kimlik sistemi', 'Renk ve tipografi sistemi', 'Brand guidelines', 'Kurumsal materyaller', 'Ambalaj ve uygulama tasarımları'],
  },
  {
    id: 'web-tasarim', title: 'Web Sitesi Tasarımı ve Geliştirme', shortTitle: 'Web Tasarım', category: 'Tasarım & teknoloji', visual: 'web',
    description: 'Markanızı dijital dünyada güçlü şekilde temsil eden, hızlı, modern ve kullanıcı odaklı web siteleri tasarlıyor ve geliştiriyoruz.',
    scope: ['Kurumsal web sitesi', 'Landing page', 'E-ticaret web sitesi', 'Responsive web tasarım', 'Frontend geliştirme', 'CMS entegrasyonları', 'Teknik SEO altyapısı'],
  },
  {
    id: 'sosyal-medya', title: 'Sosyal Medya Tasarımı ve Yönetimi', shortTitle: 'Sosyal Medya', category: 'İçerik & iletişim', visual: 'social',
    description: 'Markanızın dijital platformlarda tutarlı, dikkat çekici ve profesyonel görünmesini sağlıyoruz.',
    scope: ['Sosyal medya görsel kimliği', 'Instagram ve LinkedIn içerikleri', 'Post ve carousel tasarımları', 'İçerik planlaması', 'Reels ve video içerikleri', 'Sosyal medya hesap yönetimi'],
  },
  {
    id: 'dijital-pazarlama', title: 'Dijital Pazarlama', shortTitle: 'Dijital Pazarlama', category: 'Görünürlük & büyüme', visual: 'growth',
    description: 'Hedef kitlenize ulaşmanızı ve dijital kanallardaki performansınızı geliştirmenizi sağlayan pazarlama çözümleri sunuyoruz.',
    scope: ['Google Ads', 'Meta Ads', 'SEO çalışmaları', 'İçerik pazarlaması', 'Dijital kampanya yönetimi', 'Dönüşüm optimizasyonu', 'Performans analizi'],
  },
  {
    id: 'grafik-tasarim', title: 'Grafik Tasarım ve Kreatif Çözümler', shortTitle: 'Grafik Tasarım', category: 'Yaratıcı üretim', visual: 'graphic',
    description: 'Markanızın ihtiyaç duyduğu tüm basılı ve dijital iletişim materyallerini yaratıcı bir yaklaşımla tasarlıyoruz.',
    scope: ['Katalog ve broşür', 'Afiş ve poster', 'Dijital banner', 'Sunum tasarımı', 'Reklam kreatifleri', 'Basılı kurumsal materyaller'],
  },
];

export const categories = [
  { title: 'Branding & Creative', description: 'Markanızın karakterini ve görsel dünyasını oluşturuyoruz.', services: ['marka-kimligi', 'grafik-tasarim'], icon: '3ecd0.webp' },
  { title: 'Digital Design & Development', description: 'Kullanıcı odaklı ve etkileyici dijital deneyimler tasarlıyoruz.', services: ['ui-ux', 'mobil-uygulama', 'web-tasarim'], icon: 'ddc02.webp' },
  { title: 'Marketing & Growth', description: 'Markanızın görünürlüğünü artıran ve büyümesini destekleyen çözümler üretiyoruz.', services: ['sosyal-medya', 'dijital-pazarlama'], icon: '1c0b9.webp' },
];

export const advantages = [
  { title: 'Tek Noktadan Çözüm', description: 'Marka kimliğinden web sitesine, sosyal medyadan dijital pazarlamaya kadar ihtiyaç duyduğunuz çözümleri bir arada sunuyoruz.' },
  { title: 'Hızlı ve Verimli Süreçler', description: 'Sistematik iş akışlarımız ve modern üretim araçlarımızla projeleri verimli şekilde hayata geçiriyoruz.' },
  { title: 'Ulaşılabilir Hizmet Modelleri', description: 'İşletmenizin ihtiyaçlarına ve ölçeğine uygun, kapsamı net çözümler geliştiriyoruz.' },
  { title: 'Tutarlı Tasarım Kalitesi', description: 'Markanızın tüm dijital ve fiziksel temas noktalarında güçlü ve tutarlı bir görünüm oluşturuyoruz.' },
];

export const packages = [
  { id: 'markani-olustur', title: 'Markanı Oluştur', description: 'Yeni kurulan veya marka kimliğini yenilemek isteyen işletmeler için.', scope: ['Logo tasarımı', 'Kurumsal kimlik', 'Marka renkleri ve tipografi', 'Temel marka materyalleri', 'Sosyal medya görsel şablonları'] },
  { id: 'dijitale-tasi', title: 'Dijitale Taşı', description: 'Dijital varlığını oluşturmak veya güçlendirmek isteyen işletmeler için.', scope: ['Kurumsal web sitesi', 'Responsive tasarım', 'Temel SEO altyapısı', 'İletişim ve form entegrasyonları', 'Web sitesi içerik yerleşimi'] },
  { id: 'markani-buyut', title: 'Markanı Büyüt', description: 'Dijital kanallarda görünürlüğünü artırmak isteyen işletmeler için.', scope: ['Sosyal medya tasarımı', 'İçerik planlaması', 'Dijital kampanya kreatifleri', 'Dijital pazarlama desteği', 'Performans değerlendirmesi'] },
];

export const process = [
  { title: 'Keşif', description: 'İşletmenizi, ihtiyaçlarınızı ve hedeflerinizi anlıyoruz.' },
  { title: 'Strateji', description: 'Proje kapsamını, yaklaşımı ve uygulanacak çözümleri belirliyoruz.' },
  { title: 'Tasarım & Üretim', description: 'Fikirleri somut, etkileyici ve kullanışlı çıktılara dönüştürüyoruz.' },
  { title: 'Teslim & Gelişim', description: 'Projeyi hayata geçiriyor ve ihtiyaç duyulan sonraki adımları planlıyoruz.' },
];
