import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { catalogServices, serviceGroups, legacyServices } from './data.js';

export const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
export const serviceURL = service => `/hizmetler/${service.slug}`;
const arrow = '<span aria-hidden="true">↗</span>';
const number = index => String(index+1).padStart(2,'0');
const groupServices = group => catalogServices.filter(service => service.groupId === group.id);
const bullets = items => `<ul>${items.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`;

export function renderServiceMenu(currentSlug = '') {
  return `<div class="services-mega" id="services-menu"><div class="mega-top"><div><span class="mega-label">Arnevo / Hizmetler</span><p>Fikirden uygulamaya, birlikte.</p></div><a href="/hizmetler">Tüm hizmetler ${arrow}</a></div><div class="mega-grid">${serviceGroups.map(group=>`<details class="mega-group" open><summary>${escape(group.title)}<span class="mega-group-count">${group.services.length}</span></summary><ul>${groupServices(group).map(service=>`<li><a href="${serviceURL(service)}"${service.slug===currentSlug?' aria-current="page"':''}>${escape(service.title)}</a></li>`).join('')}</ul></details>`).join('')}</div><div class="mega-bottom"><span>Projeniz için nereden başlayacağınızı birlikte belirleyelim.</span><a href="/iletisim">Projenizi Konuşalım ${arrow}</a></div></div>`;
}

export function renderCatalogCategories() {
  return serviceGroups.map((group,index)=>`<a class="catalog-category" href="#group-${group.id}"><span class="catalog-number">${number(index)} /</span><h3>${escape(group.title)}</h3><p>${escape(group.intro)}</p><span class="catalog-category-bottom">${group.services.length} hizmet ${arrow}</span></a>`).join('');
}
export function renderCatalogIndex() {
  return serviceGroups.map((group,index)=>`<a href="#group-${group.id}"><span>${number(index)}</span>${escape(group.title)}</a>`).join('');
}
export function renderCatalogGroups() {
  return serviceGroups.map((group,index)=>`<section class="catalog-group" id="group-${group.id}" aria-labelledby="group-title-${group.id}"><div class="catalog-group-heading"><p class="overline">${number(index)} / ${group.services.length} hizmet</p><h3 id="group-title-${group.id}">${escape(group.title)}</h3><p>${escape(group.description)}</p></div><ul class="catalog-service-list">${groupServices(group).map(service=>`<li>${Object.entries(legacyServices).filter(([,slug])=>slug===service.slug).map(([id])=>`<span class="catalog-legacy-anchor" id="${id}"></span>`).join('')}<a href="${serviceURL(service)}"><span class="catalog-service-copy"><strong>${escape(service.title)}</strong><span>${escape(service.description)}</span></span>${arrow}</a></li>`).join('')}</ul></section>`).join('');
}
export function renderContactServiceOptions() {
  return serviceGroups.map(group=>`<optgroup label="${escape(group.title)}">${groupServices(group).map(service=>`<option value="${service.slug}">${escape(service.title)}</option>`).join('')}</optgroup>`).join('');
}

export function renderServicePage(service) {
  const group = serviceGroups.find(item=>item.id===service.groupId);
  const related = groupServices(group).filter(item=>item.slug!==service.slug).slice(0,3);
  const schema = JSON.stringify({'@context':'https://schema.org','@type':'Service',name:service.title,description:service.description,serviceType:group.title,inLanguage:'tr',provider:{'@type':'Organization',name:'Arnevo Creative Studio'}}).replace(/</g,'\\u003c');
  return `<!doctype html>
<!-- Generated from src/service-catalog/groups; edit the JSON source. -->
<html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#001f21"><title>${escape(service.title)} Hizmeti | Arnevo</title><meta name="description" content="${escape(service.description)}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(service.title)} | Arnevo"><meta property="og:description" content="${escape(service.description)}"><link rel="stylesheet" href="/src/style.css"><link rel="stylesheet" href="/src/inner-pages.css"><link rel="stylesheet" href="/src/service-detail.css"><script type="application/ld+json">${schema}</script></head>
<body class="inner-page service-detail-page"><a class="skip-link" href="#main">İçeriğe geç</a><!-- arnevo:header -->
<main id="main"><section class="detail-hero" aria-labelledby="detail-title"><div class="container"><nav class="breadcrumbs" aria-label="İçerik yolu"><a href="/">Ana Sayfa</a><span aria-hidden="true">/</span><a href="/hizmetler">Hizmetler</a><span aria-hidden="true">/</span><a href="/hizmetler#group-${group.id}">${escape(group.title)}</a></nav><div class="detail-hero-grid"><div><p class="overline">${service.groupNumber} / ${escape(group.title)}</p><h1 id="detail-title">${escape(service.title)}</h1><p class="detail-tagline">${escape(service.tagline)}</p><p class="detail-description">${escape(service.description)}</p><div class="detail-actions"><a class="button button-mint" href="/iletisim?hizmet=${service.slug}">Projenizi Konuşalım ${arrow}</a><a class="detail-scope-link" href="#kapsam">Hizmet kapsamı <span aria-hidden="true">↓</span></a></div></div><div class="detail-hero-art" aria-hidden="true"><img src="/assets/ac4f7.png" alt="" width="320" height="320" fetchpriority="high"><span>Fikirden uygulamaya.</span></div></div><nav class="detail-section-nav" aria-label="Sayfa bölümleri"><a href="#yaklasim">Yaklaşımımız</a><a href="#kapsam">Kapsam</a><a href="#teslimler">Teslimler</a><a href="#surec">Süreç</a><a href="#sorular">Sık sorulanlar</a></nav></div></section>
<section class="detail-intro detail-section" id="yaklasim" aria-labelledby="intro-title"><div class="container detail-intro-grid"><div><p class="overline">01 / İhtiyaçtan çözüme</p><h2 id="intro-title">Doğru başlangıç,<br>net bir ihtiyaç.</h2></div><div><p>${escape(service.why)}</p><a class="detail-text-link" href="/iletisim?hizmet=${service.slug}">İhtiyacınızı birlikte değerlendirelim ${arrow}</a></div></div></section>
<section class="detail-scope detail-section" id="kapsam" aria-labelledby="scope-title"><div class="container"><div class="detail-heading"><p class="overline">02 / Hizmet kapsamı</p><h2 id="scope-title">Birlikte neler yapabiliriz?</h2><p>İşinize, mevcut yapınıza ve önceliklerinize göre aşağıdaki çalışma alanlarını birlikte değerlendiririz.</p></div><ol class="detail-scope-grid">${service.scope.map((item,index)=>`<li><span>${number(index)} /</span><h3>${escape(item)}</h3></li>`).join('')}</ol></div></section>
<section class="detail-deliverables detail-section" id="teslimler" aria-labelledby="deliverables-title"><div class="container detail-deliverables-grid"><div><p class="overline">03 / Somut çıktılar</p><h2 id="deliverables-title">Çalışma sonunda<br>elinizde ne olur?</h2><p>Nihai teslim listesi ve formatlar, ihtiyaç analizi sonrasında teklif kapsamında netleştirilir.</p></div>${bullets(service.deliverables)}</div></section>
<section class="detail-process detail-section" id="surec" aria-labelledby="process-title"><div class="container"><div class="detail-heading"><p class="overline">04 / Çalışma biçimimiz</p><h2 id="process-title">Adımları belli,<br>birlikte ilerleyen bir süreç.</h2></div><ol class="detail-timeline">${group.process.map((text,index)=>`<li><span>${number(index)}</span><h3>${['Keşif','Planlama','Uygulama & Test','Teslim & Değerlendirme'][index]}</h3><p>${escape(text)}</p></li>`).join('')}</ol></div></section>
<section class="detail-faq detail-section" id="sorular" aria-labelledby="faq-title"><div class="container detail-faq-grid"><div><p class="overline">05 / Aklınızdaki sorular</p><h2 id="faq-title">Biraz daha<br>netleştirelim.</h2></div><div><details open><summary>${escape(service.faq[0])}</summary><p>${escape(service.faq[1])}</p></details><details><summary>Süre ve bütçe nasıl belirleniyor?</summary><p>Mevcut yapınızı, ihtiyaçları, teslimleri ve bağımlılıkları değerlendirdikten sonra kapsam ve takvimi birlikte oluştururuz. Üçüncü taraf maliyetleri, erişim ihtiyaçları ve ek çalışmalar teklif aşamasında ayrıca belirtilir.</p></details></div></div></section>
<section class="detail-final"><div class="container"><div><p class="overline">${escape(service.title)} / Sıradaki adım</p><h2>Projenizi birlikte<br>şekillendirelim.</h2><p>Hedefinizi ve mevcut durumunuzu paylaşın. Size uygun başlangıcı ve çalışma kapsamını birlikte belirleyelim.</p></div><a class="button button-dark" href="/iletisim?hizmet=${service.slug}">Teklif Alın ${arrow}</a></div></section>
<section class="detail-related detail-section" aria-labelledby="related-title"><div class="container"><div class="detail-related-heading"><div><p class="overline">${escape(group.title)}</p><h2 id="related-title">Birlikte düşünülebilecek<br>diğer hizmetler.</h2></div><a class="detail-text-link" href="/hizmetler#group-${group.id}">Kategoriyi keşfedin ${arrow}</a></div><div class="detail-related-grid">${related.map(item=>`<a href="${serviceURL(item)}"><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><span>Hizmeti inceleyin ${arrow}</span></a>`).join('')}</div></div></section></main><!-- arnevo:footer --><script type="module" src="/src/main.js"></script></body></html>\n`;
}

export function generateServicePages(root) {
  for (const service of catalogServices) {
    const directory = new URL(`hizmetler/${service.slug}/`,root);mkdirSync(directory,{recursive:true});
    const target = new URL('index.html',directory);const html=renderServicePage(service);
    if (!existsSync(target) || readFileSync(target,'utf8')!==html) writeFileSync(target,html);
  }
}
