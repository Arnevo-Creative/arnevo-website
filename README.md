# Arnevo Creative Studio

Figma tasarımına göre hazırlanmış responsive ana sayfa. HTML, CSS ve JavaScript kullanır; Tailwind içermez. Vite yalnızca geliştirme sunucusu ve derleme için kullanılır.

## Çalıştırma

```sh
npm install
npm run dev
```

## Üretim derlemesi

```sh
npm run build
npm run preview
```

Çıktı `dist/` klasörüne yazılır. Görseller `public/assets/` altında yereldir. Manrope yazı tipi de yerel dosyalardan yüklenir.

GitHub üzerinden yayın için kaynak dosyalar ve `package-lock.json` depoya aktarılır; kurulum komutu `npm ci`, derleme komutu `npm run build`, yayın klasörü `dist` olur. `node_modules`, `dist`, yerel ortam/hosting ayarları ve blog kapaklarının özgün PNG kopyaları Git dışında tutulur. Web görselleri ile üretim promptları kaynakta kalır.

Yayın akışı Node.js 24 kullanır (`.nvmrc`). Yerelde varsayılan kök yol `/` olur. `VITE_BASE_PATH=/arnevo-website/` ile yapılan derlemede sayfa bağlantıları, ortak header/footer görselleri, responsive görseller, CSS varlıkları ve paylaşım metaverisi GitHub Pages alt yoluna uyarlanır.

GitHub deposu: `Arnevo-Creative/arnevo-website`. `.github/workflows/deploy-pages.yml`, `main` dalına gönderilen değişiklikleri `npm ci` ile kurar, GitHub Pages'in bildirdiği taban yolla derler, `npm run check:build` ile tüm sayfaların ve yerel bağlantıların çıktıda bulunduğunu doğrular, ardından `dist/` çıktısını Pages'e yayınlar. Yayın kaynağı GitHub Actions olmalıdır. Varsayılan hedef `https://arnevo-creative.github.io/arnevo-website/`; özel alan adı GitHub Pages ayarından bağlanırsa taban yol otomatik olarak köke döner.

Pages derlemesini yerelde kontrol etmek için:

```sh
VITE_BASE_PATH=/arnevo-website/ npm run build
VITE_BASE_PATH=/arnevo-website/ npm run check:build
VITE_BASE_PATH=/arnevo-website/ npm run preview
```

## Davranışlar

- Ortak header, Figma `200:935` tasarımına göre tam genişlikte beyazdır; sayfa açılır açılmaz görünür ve kaydırırken üstte sticky kalır. Masaüstünde 80 px, mobilde 72 px yüksekliğindedir. Turuncu amblemli koyu logo özgün yerel SVG olarak kullanılır.
- Mobil menü klavye ile kullanılabilir ve Escape tuşuyla kapanır.
- Menü bağlantıları ilgili ana sayfa bölümüne gider.
- Soru-cevap alanı erişilebilir yerel `details/summary` elemanlarını kullanır.

Figma'da kapalı görünen soruların cevapları uygulama için yazılmış taslak metinlerdir. Gerçek iletişim ve sosyal medya adresleri paylaşılmadığı için sayfa içi bağlantılar kullanılmıştır.

## Hizmetler sayfası

- Yerel rota: `/hizmetler` (`/hizmetler/` ve `/hizmetler/index.html` de aynı sayfayı açar).
- `hizmetler/index.html`: yedi bölüm, sayfaya özgü title ve meta description.
- `src/services-data.js`: hizmetler, kapsamlar, kategoriler, paketler ve süreç içerikleri.
- `src/render-services.js`: içerikleri semantik HTML'e dönüştürür; hizmet görselleri kavramsal CSS kompozisyonlarıdır, müşteri işi olarak sunulmaz.
- `src/services.css`: ana sayfanın renklerini, yerel Manrope fontunu, container ve tipografi ölçülerini sürdüren sayfa stilleri.
- `src/components/header.html` ve `footer.html`: sayfaların ortak parçaları. Ana sayfa görünümü korunur; Hizmetler bağlantısı eklenmiştir.
- `vite.config.js`: ortak parçaları ve hizmet verisini geliştirmede ve üretim derlemesinde HTML'e ekler. İçerikler tarayıcı JavaScript'ine bağlı değildir. Yeni framework, router veya paket eklenmemiştir.

Üretimde `dist/` klasörünü statik sunucuya yükleyin; `/hizmetler` için dizin index dosyalarının sunulması gerekir. Yapılandırmayı ekledikten sonra önceden çalışan Vite sunucusu yeniden başlatılmalıdır.

Teklif CTA'ları `/iletisim` sayfasına gider. Hizmete veya pakete özel seçimler query parametreleriyle forma aktarılır. Paket kapsamları ihtiyaçlara göre özelleştirilecek başlangıç önerileri olarak sunulur; fiyat eklenmemiştir.


## İletişim sayfası

- `/iletisim`, `/iletisim/` ve `/iletisim/index.html` aynı sayfayı açar.
- `iletisim/index.html`, `src/contact.css`: proje formu, doğrudan e-posta bağlantısı ve mevcut tasarım dilindeki iletişim sayfası.
- `src/header.css`: tüm sayfalardaki beyaz sticky header ve responsive ana menü.
- `src/inner-pages.css`: iç sayfaların ortak buton, breadcrumb ve renk stilleri.
- `src/contact-config.js`: iletişim adresi (`info@arnevo.co`) ve sayfa rotası.
- `src/render-contact.js`: hizmet/paket seçeneklerini mevcut veri kaynağından HTML'e ekler.
- `src/contact.js`: form doğrulama, seçim aktarımı, karakter sayacı ve adres kopyalama.
- `src/contact-message.js`: form bilgilerinden Türkçe karakterleri ve satır sonlarını koruyan e-posta taslağını oluşturur.

Form, kullanıcının kendi e-posta uygulamasında `info@arnevo.co` alıcılı bir taslak açar. Ziyaretçi mesajını e-posta uygulamasında kontrol edip gönderir. Form değerleri taslak açıldıktan sonra silinmez. Gönderildi veya teslim edildi onayı gösterilmez. JavaScript kapalıyken doğrudan e-posta bağlantısı ve yerel mailto form eylemi kullanılabilir.

SMTP veya bir form servisi bağlı değildir; otomatik sunucu gönderimi, veritabanına kayıt veya üçüncü tarafa form verisi aktarımı yapılmaz. İleride sunucudan gönderim istenirse bir e-posta servisi ve sunucu tarafı entegrasyon gerekir. Hiçbir form bilgisi localStorage'a yazılmaz.

## Blog

`/blog` listeleme sayfası ve `/blog/{slug}` biçiminde 12 tam yazı eklendi. Yetenekler alanı kaldırıldı; menüye Blog, ana sayfaya üç yazılık bir vitrin eklendi. Eski `#yetenekler` bağlantısı artık kullanılmıyor.

- `src/blog/posts/*.json`: Türkçe yazı metinleri, kategori, açıklama, kapak alt metni ve gerektiğinde teknik kaynaklar.
- `src/blog/data.js`: içerik yükleme, kategori doğrulama ve metin uzunluğundan okuma süresi hesabı.
- `src/blog/render.js`: liste kartları, ana sayfa vitrini ve detay sayfaları. Vite başlarken ve derlemede `blog/{slug}/index.html` dosyalarını üretir; bu dosyalar yerine JSON kaynaklarını düzenleyin.
- `blog/index.html`, `src/blog.css`, `src/blog.js`: kategori filtreleri, Türkçe karakterlerle arama, sonuç sayısı ve boş sonuç durumu. Arama/kategori seçimi URL'de saklanır. JavaScript kapalıyken tüm yazılar okunabilir.
- Detay sayfalarında bölüm bağlantıları, iki ilgili yazı, ilgili hizmet ve iletişim bağlantıları; başlık/açıklama meta bilgileri ve BlogPosting yapılandırılmış verisi bulunur.
- Paylaşım görsellerinin kök dizine göre URL'leri, sitenin yayınlandığı alan adı altında çözülür. Mevcut projede canonical veya alan adı yapılandırması bulunmadığından yeni bir yayın alan adı varsayılmamıştır.

### Özgün blog görselleri

12 kapak, yerleşik `image_gen` aracıyla her yazı için ayrı üretildi. Arnevo'nun petrol yeşili, mint, mor ve krom malzeme dili kullanıldı. Üretim prompt seti ve dosya eşlemesi: `artifacts/blog-images/prompts.json`.

- Tam boyutlu özgün PNG'ler: `artifacts/blog-images/` (üretim sunucusuna kopyalanmaz).
- Web için 1440 px JPEG ve 720 px küçük sürümler: `public/assets/blog/`.
- Sayfalar responsive `srcset`, boyut bilgisi ve ekranın aşağısındaki görseller için lazy loading kullanır. Bu sürümlerde yalnızca boyutlandırma/JPEG sıkıştırma uygulanmıştır.

Yazıların yayın tarihi 15 Kasım 2026; yazar adı Arnevo Creative Studio'dur. İçerikler genel tasarım rehberleridir; gerçek müşteri vakası veya ölçülmüş performans iddiası içermez.

## Hakkımızda sayfası

- `/hakkimizda`, `/hakkimizda/` ve `/hakkimizda/index.html` aynı sayfayı açar.
- `hakkimizda/index.html`: stüdyo anlatımı, 20 yıllık tasarım ve reklam ajansı deneyimi, 100’den fazla markaya hizmet verme bilgisi, çalışma yaklaşımı ve hizmet bağlantıları.
- `src/about.css`: mevcut renk, font, ortak header/footer ve butonlarla uyumlu responsive sayfa stilleri.
- Ana sayfadaki tanıtım metni, “Bizi Tanıyın”, ortak menü ve footer yeni sayfaya bağlanmıştır.

Deneyim ve marka sayısı bilgileri işletme sahibinin sağladığı içeriktir. Ajansın kuruluş yılı, ekip büyüklüğü, ödül, müşteri adı veya doğrulanmamış başarı istatistiği eklenmemiştir. Sayfa yeni bir bağımlılık veya animasyon sistemi kullanmaz.

## Genişletilmiş hizmet kataloğu ve açılır menü

- Sekiz kategori altında 59 ayrı hizmet: `src/service-catalog/groups/*.json`.
- İlk hizmet grubunun adı “Tasarım ve Markalaşma”dır. Sekiz kategori ve hizmet adları Türkçe olarak sunulur; Google Ads, Shopify, TikTok, LinkedIn, SEO ve LLM gibi marka adları ve teknik kısaltmalar korunur. Mevcut sayfa adresleri, kategori kimlikleri ve form değerleri aynı kaldığından eski bağlantılar çalışmaya devam eder. Menü, footer, detay sayfaları, metaveri ve iletişim seçenekleri aynı katalogdan üretilir.
- `src/service-catalog/data.js`: katalog doğrulaması ve eski bağlantı eşlemeleri.
- `src/service-catalog/render.js`: mega menü, katalog bölümleri, iletişim formu seçenekleri ve ortak detay şablonu.
- `/hizmetler/{slug}` rotasındaki sayfalar Vite başlarken veya derlemede `hizmetler/{slug}/index.html` olarak üretilir. İçerikleri değiştirmek için üretilen HTML yerine kategori JSON dosyalarını düzenleyin.
- Her detay sayfasında açıklama, ihtiyaç/yaklaşım metni, beş kapsam maddesi, üç örnek teslim, kategoriye göre dört aşamalı süreç, hizmete özel SSS, ilgili hizmetler ve seçimi iletişim formuna taşıyan CTA bulunur.
- `src/services-menu.css` ve `src/main.js`: masaüstünde kaydırılabilir mega menü, mobilde kategori disclosure listeleri; Enter/Space, Escape, dışarı tıklama ve odak geri dönüşü. Menü yalnızca hover'a bağlı değildir. Native details/summary sayesinde masaüstündeki hizmet açılır menüsü JavaScript kapalıyken de açılır; mevcut mobil ana menü JavaScript kullanır.
- `src/service-detail.css`: tüm hizmet sayfalarının ortak responsive şablonu. Mevcut tasarım sistemi ve yerel görseller kullanılır; yeni bağımlılık eklenmemiştir.
- İletişim formundaki “İlgilendiğiniz hizmet” alanında 59 hizmet kategori bazlı seçilebilir. Mevcut yedi genel ilgi alanı ve paket seçimi korunur; yeni hizmet seçimi e-posta taslağına eklenir.
- Blog ve Hakkımızda sayfalarındaki eski `#marka-kimligi`, `#web-tasarim`, `#sosyal-medya` gibi bağlantılar katalogdaki ilgili kayıtlara gider.

Kapsamlar başlangıç çerçevesidir. Kesin teslim, süre, lisans/platform giderleri ve medya bütçeleri teklif aşamasında belirlenir. İçeriklere doğrulanmamış sertifika, iş ortaklığı, müşteri adı veya performans garantisi eklenmemiştir.

## Ortak footer

- `src/components/footer.html` ve `src/footer.css`: sol üstte beyaz logo, stüdyo anlatımı, ana sayfalar, üç sütunlu hizmet dizini ve kategorilere ayrılmış blog yazıları. Beyaz boşluk içinde yuvarlatılmış petrol yeşili panel; tablet ve mobilde uyarlanan sütunlar.
- `src/render-footer.js`: 59 hizmet bağlantısını mevcut hizmet kataloğundan, 12 yazı bağlantısını blog verisinden üretir. Kategori başlıkları ilgili hizmet bölümü veya blog filtresine gider. Footer tüm 76 sayfaya derleme sırasında eklenir; JavaScript olmadan da tüm bağlantılar kullanılabilir.
- E-posta bağlantısı `info@arnevo.co`, üst bağlantısı `#main` hedefine gider. İşletme sahibinin isteğiyle Çerezler, Politikalar ve Kullanım Koşulları başlıkları kaldırılmıştır.
