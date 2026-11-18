import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const publicRoot = join(root, 'public/assets');
const archiveRoot = join(root, 'artifacts/image-originals');
const manifestPath = join(root, 'src/image-manifest.json');
const settings = JSON.parse(readFileSync(new URL('./image-settings.json', import.meta.url), 'utf8'));
const previous = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { images: {} };
const walk = dir => existsSync(dir) ? readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() && entry.name !== 'versions' ? walk(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : []) : [];
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const raster = path => /\.(?:png|jpe?g)$/i.test(path);
const sources = [...new Set([...walk(publicRoot).filter(raster).map(path => relative(publicRoot, path)), ...walk(archiveRoot).filter(raster).map(path => relative(archiveRoot, path))])].sort();
const images = {};
const unused = [];

for (const name of sources) {
  const legacy = join(publicRoot, name);
  const original = join(archiveRoot, name);
  const url = `/assets/${name}`;
  mkdirSync(dirname(original), { recursive: true });
  if (!existsSync(original)) copyFileSync(legacy, original);
  else if (existsSync(legacy) && previous.images[url] && hash(legacy) !== previous.images[url].legacySha && hash(legacy) !== hash(original)) {
    const version = join(archiveRoot, 'versions', name.replace(/(\.[^.]+)$/, `-${hash(original).slice(0, 12)}$1`));
    mkdirSync(dirname(version), { recursive: true });
    if (!existsSync(version)) copyFileSync(original, version);
    copyFileSync(legacy, original);
  }
  const metadata = await sharp(original).metadata();
  if (settings.unused.includes(name)) {
    unused.push({ source: url, originalBytes: statSync(original).size });
    if (existsSync(legacy)) unlinkSync(legacy);
    continue;
  }
  const thumbnail = /^blog\/.+-720\.jpg$/.test(name);
  const options = settings.assets[name] || (name.startsWith('sufle/') ? { widths: [320, 640], lossless: true } : { widths: [480, 720, 1080, 1440], quality: 84 });
  const widths = [...new Set(options.widths.map(width => Math.min(width, metadata.width)))].sort((a, b) => a - b);
  const largest = widths.at(-1);
  const candidates = [];
  if (!thumbnail) {
    for (const width of widths) {
      const outputName = name.replace(/\.[^.]+$/, width === largest ? '.webp' : `-${width}.webp`);
      const output = join(publicRoot, outputName);
      mkdirSync(dirname(output), { recursive: true });
      const temporary = output + '.tmp';
      const info = await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: options.quality || 90, lossless: options.lossless || false, alphaQuality: 100, effort: 6 }).toFile(temporary);
      renameSync(temporary, output);
      candidates.push({ src: `/assets/${outputName}`, width: info.width, height: info.height, bytes: info.size });
    }
  }
  // JPEG social-preview URLs remain available; site images use the WebP files.
  const keepLegacy = extname(name).toLowerCase() !== '.png' && !thumbnail;
  if (keepLegacy) {
    const temporary = legacy + '.tmp';
    await sharp(original).rotate().resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(temporary);
    if (statSync(temporary).size < statSync(original).size) renameSync(temporary, legacy);
    else { unlinkSync(temporary); copyFileSync(original, legacy); }
  } else if (existsSync(legacy)) unlinkSync(legacy);
  images[url] = { originalBytes: statSync(original).size, sourceSha: hash(original), legacyBytes: keepLegacy ? statSync(legacy).size : 0, legacySha: keepLegacy ? hash(legacy) : null, sourceWidth: metadata.width, sourceHeight: metadata.height, alpha: metadata.hasAlpha, candidates };
  console.log(`Optimized ${name}`);
}
for (const [url, image] of Object.entries(images)) {
  if (!image.candidates.length) {
    const parent = images[url.replace('-720.jpg', '.jpg')];
    const variant = parent?.candidates.find(candidate => candidate.width === 720);
    if (!variant) throw new Error(`Missing 720px WebP for ${url}`);
    image.candidates = [variant];
  }
  const largest = image.candidates.at(-1);
  Object.assign(image, { src: largest.src, width: largest.width, height: largest.height, srcset: image.candidates.map(candidate => `${candidate.src} ${candidate.width}w`).join(', ') });
}
const imageFiles = walk(publicRoot).filter(path => /\.(?:png|jpe?g|webp|svg)$/i.test(path));
const originalBytes = Object.values(images).reduce((sum, image) => sum + image.originalBytes, 0) + unused.reduce((sum, image) => sum + image.originalBytes, 0);
const publishedBytes = imageFiles.reduce((sum, path) => sum + statSync(path).size, 0);
const webpBytes = walk(publicRoot).filter(path => path.endsWith('.webp')).reduce((sum, path) => sum + statSync(path).size, 0);
const stats = { originalRasterBytes: originalBytes, publishedImageBytes: publishedBytes, webpBytes, sourceImages: sources.length, archivedUnused: unused.length };
writeFileSync(manifestPath, JSON.stringify({ stats, unused, images }, null, 2) + '\n');
console.log(JSON.stringify(stats));
