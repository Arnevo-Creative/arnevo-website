import { advantages, packages, process, contactHref } from './services-data.js';
import { catalogServices, serviceGroups } from './service-catalog/data.js';
import { escape, renderCatalogCategories, renderCatalogIndex, renderCatalogGroups } from './service-catalog/render.js';
const number = index => String(index+1).padStart(2,'0');
const arrow = '<span aria-hidden="true">↗</span>';
export function renderServicesContent() {
  return {
    'catalog-count': String(catalogServices.length),
    'catalog-group-count': String(serviceGroups.length),
    'categories': renderCatalogCategories(),
    'service-index': renderCatalogIndex(),
    'service-rows': renderCatalogGroups(),
    'advantages': advantages.map((item,index)=>`<article><span class="item-number">${number(index)} /</span><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p></article>`).join(''),
    'packages': packages.map((item,index)=>`<article class="package-card"><span class="item-number">${number(index)} /</span><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p><ul class="package-scope">${item.scope.map(text=>`<li>${escape(text)}</li>`).join('')}</ul><a class="button button-outline" href="${contactHref}?paket=${item.id}" aria-label="${escape(item.title)} paketi için teklif al">Teklif Al ${arrow}</a></article>`).join(''),
    'process': process.map((item,index)=>`<li><span class="step-number">${number(index)}</span><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p></li>`).join(''),
  };
}
