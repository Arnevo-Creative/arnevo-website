import { readdirSync, readFileSync } from 'node:fs';

export const serviceGroups = readdirSync(new URL('./groups/', import.meta.url))
  .filter(name => name.endsWith('.json')).sort()
  .map(name => JSON.parse(readFileSync(new URL(`./groups/${name}`, import.meta.url), 'utf8')));
export const catalogServices = serviceGroups.flatMap((group, groupIndex) => group.services.map((service, index) => ({ ...service, groupId:group.id, groupTitle:group.title, groupNumber:String(groupIndex+1).padStart(2,'0'), number:String(index+1).padStart(2,'0') })));
const seen = new Set();
for (const service of catalogServices) {
  if (!/^[a-z0-9-]+$/.test(service.slug) || seen.has(service.slug) || !service.description || !service.why || service.scope.length < 5 || service.deliverables.length < 3 || service.faq.length !== 2) throw new Error(`Invalid service: ${service.slug}`);
  seen.add(service.slug);
}

// Existing blog, About and contact links remain useful after expanding the catalog.
export const legacyServices = {
  'ui-ux':'website-design', 'mobil-uygulama':'mobile-app-design', 'marka-kimligi':'brand-identity',
  'web-tasarim':'website-design', 'sosyal-medya':'social-media-design',
  'dijital-pazarlama':'performance-marketing', 'grafik-tasarim':'graphic-design',
};
