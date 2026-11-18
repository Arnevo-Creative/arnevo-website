import { contactDetailsHref } from '../contact-config.js';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { blogPosts, blogCategories } from './data.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
const url = post => `/blog/${post.slug}`;
const date = post => new Intl.DateTimeFormat('tr-TR', {dateStyle:'long', timeZone:'Europe/Istanbul'}).format(new Date(`${post.date}T12:00:00Z`));
const image = (post, eager = false, sizes = '(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 45vw, 380px') => `<img src="/assets/blog/${post.slug}.webp" srcset="/assets/blog/${post.slug}-720.webp 720w, /assets/blog/${post.slug}.webp 1440w" sizes="${sizes}" width="1440" height="960" alt="${escape(post.coverAlt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
const metadata = post => `<div class="post-meta"><span>${escape(post.categoryLabel)}</span><span aria-hidden="true">/</span><span>${post.minutes} dk okuma</span></div>`;

export function blogCard(post, filterable = false) {
  return `<article class="blog-card" ${filterable ? `data-blog-card data-category="${post.category}" data-search="${escape([post.title, post.summary, post.categoryLabel].join(' '))}"` : ''}>
    <a class="blog-card-link" href="${url(post)}"><div class="blog-card-image">${image(post)}</div>${metadata(post)}<h3>${escape(post.title)}</h3><p>${escape(post.summary)}</p><span class="read-link">Yazıyı okuyun <span aria-hidden="true">→</span></span></a>
  </article>`;
}

export function renderBlogContent() {
  const featured = blogPosts[0];
  return {
    'blog-count': String(blogPosts.length),
    'blog-category-count': String(blogCategories.length).padStart(2, '0'),
    'blog-featured': `<a class="featured-post" href="${url(featured)}"><div class="featured-image">${image(featured, true, '(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(50vw - 40px), 655px')}</div><div class="featured-copy"><p class="overline">Öne çıkan yazı</p>${metadata(featured)}<h2>${escape(featured.title)}</h2><p>${escape(featured.summary)}</p><span class="read-link">Yazıyı okuyun <span aria-hidden="true">→</span></span></div></a>`,
    'blog-filters': blogCategories.map(category => `<button type="button" data-category="${category.id}" aria-pressed="false">${escape(category.label)}<span>${blogPosts.filter(post => post.category === category.id).length}</span></button>`).join(''),
    'blog-cards': blogPosts.map(post => blogCard(post, true)).join(''),
    'home-blog': `<section class="home-blog" id="blog" aria-labelledby="home-blog-title"><div class="container"><div class="home-blog-heading"><div><p class="overline">Arnevo / Blog</p><h2 id="home-blog-title">İyi fikirler,<br>paylaştıkça büyür.</h2></div><a class="blog-all-link" href="/blog">Tüm yazılar <span aria-hidden="true">↗</span></a></div><div class="blog-grid">${[blogPosts[0],blogPosts[3],blogPosts[6]].map(post => blogCard(post)).join('')}</div></div></section>`,
  };
}

export function renderBlogArticle(post) {
  const related = blogPosts.filter(item => item.category === post.category && item.slug !== post.slug).slice(0,2);
  const sections = post.sections.map((section,index) => `<section id="bolum-${index+1}" aria-labelledby="baslik-${index+1}"><h2 id="baslik-${index+1}">${escape(section.title)}</h2>${section.paragraphs.map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}${section.bullets ? `<ul>${section.bullets.map(bullet => `<li>${escape(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('');
  const schema = JSON.stringify({ '@context':'https://schema.org', '@type':'BlogPosting', headline:post.title, description:post.summary, inLanguage:'tr', datePublished:post.date, author:{'@type':'Organization',name:'Arnevo Creative Studio'}, image:`/assets/blog/${post.slug}.jpg`, articleSection:post.categoryLabel }).replace(/</g,'\\u003c');
  return `<!doctype html>
<!-- Generated from src/blog/posts/${post.slug}; edit the JSON source, not this page. -->
<html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#001f21"><title>${escape(post.title)} | Arnevo Blog</title><meta name="description" content="${escape(post.summary)}"><meta property="og:type" content="article"><meta property="og:title" content="${escape(post.title)}"><meta property="og:description" content="${escape(post.summary)}"><meta property="og:image" content="/assets/blog/${post.slug}.jpg"><meta property="og:image:alt" content="${escape(post.coverAlt)}"><link rel="stylesheet" href="/src/style.css"><link rel="stylesheet" href="/src/inner-pages.css"><link rel="stylesheet" href="/src/blog.css"><script type="application/ld+json">${schema}</script></head>
<body class="inner-page blog-article-page"><a class="skip-link" href="#main">İçeriğe geç</a><!-- arnevo:header -->
<main id="main"><article>
<header class="article-header"><div class="container"><nav class="breadcrumbs" aria-label="İçerik yolu"><a href="/">Ana Sayfa</a><span aria-hidden="true">/</span><a href="/blog">Blog</a><span aria-hidden="true">/</span><a href="/blog?kategori=${post.category}">${escape(post.categoryLabel)}</a></nav>${metadata(post)}<h1>${escape(post.title)}</h1><p class="article-summary">${escape(post.summary)}</p><div class="article-byline"><span>Arnevo Creative Studio</span><time datetime="${post.date}">${date(post)}</time></div></div></header>
<div class="container article-cover"><img src="/assets/blog/${post.slug}.webp" srcset="/assets/blog/${post.slug}-720.webp 720w, /assets/blog/${post.slug}.webp 1440w" sizes="(max-width:760px) calc(100vw - 40px), min(1200px, 92vw)" width="1440" height="960" alt="${escape(post.coverAlt)}" fetchpriority="high"></div>
<div class="container article-layout"><aside class="article-sidebar"><nav class="article-toc" aria-label="Bu yazıda"><p class="overline">Bu yazıda</p><ol>${post.sections.map((section,index) => `<li><a href="#bolum-${index+1}">${escape(section.title)}</a></li>`).join('')}</ol><a class="article-back" href="/blog">← Tüm yazılar</a></nav></aside><div class="article-body"><p class="article-intro">${escape(post.intro)}</p>${sections}<aside class="article-takeaway"><span class="overline">Aklınızda kalsın</span><p>${escape(post.takeaway)}</p></aside>${post.sources?.length ? `<section class="article-sources" aria-labelledby="sources-title"><h2 id="sources-title">Kaynaklar ve ileri okuma</h2><ul>${post.sources.map(source => `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.label)} <span aria-hidden="true">↗</span></a></li>`).join('')}</ul></section>` : ''}<div class="article-end"><span>Arnevo / ${escape(post.categoryLabel)}</span><a href="#main">Başa dön ↑</a></div></div></div>
</article><section class="article-cta"><div class="container"><div><p class="overline">Fikirden uygulamaya</p><h2>Markanız için<br>birlikte düşünelim.</h2><p>Yazıdaki fikirleri kendi markanıza taşımak istiyorsanız projenizi konuşalım.</p></div><div class="article-cta-actions"><a class="button button-dark" href="${contactDetailsHref}">Projenizi Konuşalım <span aria-hidden="true">↗</span></a><a href="/hizmetler#${post.service}">İlgili hizmeti inceleyin ↗</a></div></div></section>
<section class="related-posts"><div class="container"><div class="home-blog-heading"><h2>Okumaya devam edin.</h2><a class="blog-all-link" href="/blog">Tüm yazılar ↗</a></div><div class="blog-grid related-grid">${related.map(item => blogCard(item)).join('')}</div></div></section></main><!-- arnevo:footer --><script type="module" src="/src/main.js"></script></body></html>\n`;
}

// Materialize normal HTML entry points for the existing Vite MPA, in dev and build.
export function generateBlogPages(root) {
  for (const post of blogPosts) {
    const directory = new URL(`blog/${post.slug}/`, root);
    mkdirSync(directory, {recursive:true});
    const target = new URL('index.html', directory);
    const html = renderBlogArticle(post);
    if (!existsSync(target) || readFileSync(target,'utf8') !== html) writeFileSync(target,html);
  }
}
