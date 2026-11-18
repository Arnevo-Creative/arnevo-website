import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { catalogServices } from '../src/service-catalog/data.js';
import { blogPosts } from '../src/blog/data.js';

const output = resolve('dist');
const base = process.env.VITE_BASE_PATH || '/';
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(item => item.isDirectory() ? files(join(directory, item.name)) : [join(directory, item.name)]);
const pages = files(output).filter(file => file.endsWith('.html'));
assert.equal(pages.length, 5 + catalogServices.length + blogPosts.length, 'Missing generated pages');
const checked = new Set();

function checkURL(reference, from) {
  const url = new URL(reference.replaceAll('&amp;', '&'), `https://build.invalid${base}${from.slice(output.length + 1)}`);
  if (url.origin !== 'https://build.invalid') return;
  assert.ok(url.pathname.startsWith(base), `URL escapes deployment base: ${reference} in ${from}`);
  let target = join(output, decodeURIComponent(url.pathname.slice(base.length)));
  if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
  assert.ok(existsSync(target), `Missing target: ${reference} in ${from}`);
  if (url.hash && target.endsWith('.html')) {
    const id = decodeURIComponent(url.hash.slice(1));
    assert.ok(readFileSync(target, 'utf8').includes(`id="${id}"`), `Missing anchor: ${reference} in ${from}`);
  }
  checked.add(url.pathname + url.hash);
}

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  assert.ok(!html.includes('<!-- arnevo:'), `Unrendered component: ${page}`);
  assert.equal((html.match(/class="header"/g) || []).length, 1, page);
  assert.equal((html.match(/class="site-footer"/g) || []).length, 1, page);
  for (const match of html.matchAll(/\b(href|src|content)=["']([^"']+)["']/g)) {
    if (match[2].startsWith('/') || (match[1] !== 'content' && match[2].startsWith('#'))) checkURL(match[2], page);
  }
  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/g)) {
    for (const candidate of match[1].split(',')) checkURL(candidate.trim().split(/\s+/)[0], page);
  }
  for (const match of html.matchAll(/"image":"([^"]+)"/g)) checkURL(match[1], page);
}
for (const file of files(join(output, 'assets')).filter(file => file.endsWith('.css'))) {
  for (const match of readFileSync(file, 'utf8').matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)) {
    if (!match[1].startsWith('data:')) checkURL(match[1], file);
  }
}
console.log(`Verified ${pages.length} pages and ${checked.size} local URLs under ${base}`);
