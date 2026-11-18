import { readFileSync } from 'node:fs';

const { images } = JSON.parse(readFileSync(new URL('./image-manifest.json', import.meta.url), 'utf8'));
const optimizedSources = new Map(Object.entries(images).map(([source, image]) => [image.src, { source, image }]));
const coverSizes = '(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) calc(50vw - 50px), 590px';
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}=(['"])(.*?)\\1`))?.[2];
const setAttribute = (tag, name, value) => {
  const pattern = new RegExp(`\\b${name}=(['"])(.*?)\\1`);
  return pattern.test(tag) ? tag.replace(pattern, `${name}="${value}"`) : tag.replace(/\s*\/?>$/, ` ${name}="${value}">`);
};

function displaySizes(source, tag) {
  if (attribute(tag, 'sizes')) return attribute(tag, 'sizes');
  const width = Number(attribute(tag, 'width'));
  if (source.startsWith('/assets/references/')) return '(max-width: 760px) 79px, 121px';
  if (source.includes('/sufle/')) return '(max-width: 760px) calc(33.7288vw - 13.4915px), (max-width: 1280px) calc(16.8644vw - 16.8644px), 199px';
  if (source.endsWith('/eb0e7.png')) return '(max-width: 403px) calc(100vw - 28px), (max-width: 1440px) 93.056vw, 1340px';
  if (source.endsWith('/cb432.png')) return '(max-width: 760px) 203px, (max-width: 1100px) 244px, 340px';
  if (source.endsWith('/09788.png')) return '(max-width: 760px) calc(128.33vw - 51.33px), 760px';
  if (source.endsWith('/61966.png')) return '(max-width: 760px) calc(87vw - 34.8px), 500px';
  if (source.endsWith('/ac4f7.png')) {
    if (width === 320) return '(max-width: 760px) 145px, (max-width: 1100px) 32vw, 400px';
    if (width === 400) return '(max-width: 760px) 165px, 400px';
    if (width === 480) return '(max-width: 760px) 190px, 480px';
    if (width === 370) return '(max-width: 760px) 160px, 450px';
    if (width === 290) return '(max-width: 760px) 145px, 290px';
    if (width === 150) return '(max-width: 760px) 100px, 150px';
    return '(max-width: 760px) 220px, (max-width: 1200px) 450px, 587px';
  }
  if (width && width <= 100) return `${width}px`;
  return coverSizes;
}

// Run after shared HTML is rendered, before the final deployment-base rewrite.
export function renderOptimizedImages(html, base = '/') {
  return html.replace(/<img\b[^>]*>/g, original => {
    const src = attribute(original, 'src');
    if (!src) return original;
    const canonical = base !== '/' && src.startsWith(base) ? `/${src.slice(base.length)}` : src;
    const { source, image } = images[canonical] ? { source: canonical, image: images[canonical] } : optimizedSources.get(canonical) || {};
    if (!image) return original;
    let tag = setAttribute(original, 'src', image.src);
    tag = setAttribute(tag, 'srcset', image.srcset);
    tag = setAttribute(tag, 'sizes', displaySizes(source, original));
    // Existing CSS defines gallery crops and masked compositions; keep their sizing.
    if (!attribute(tag, 'decoding')) tag = setAttribute(tag, 'decoding', 'async');
    if (!attribute(tag, 'loading') && attribute(tag, 'fetchpriority') !== 'high' && !source.endsWith('/cb432.png')) tag = setAttribute(tag, 'loading', 'lazy');
    return tag;
  });
}
