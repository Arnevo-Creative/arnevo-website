import { serviceGroups } from './service-catalog/data.js';
import { escape, serviceURL } from './service-catalog/render.js';
import { blogCategories, blogPosts } from './blog/data.js';

// Keep every footer destination in sync with the existing content catalog.
export function renderFooter(template) {
  const services = serviceGroups.map(group => `<section class="footer-link-group"><h3><a href="/hizmetler#group-${group.id}">${escape(group.title)}</a></h3><ul>${group.services.map(service => `<li><a href="${serviceURL(service)}">${escape(service.title)}</a></li>`).join('')}</ul></section>`).join('');
  const blog = blogCategories.map(category => `<section class="footer-link-group"><h3><a href="/blog?kategori=${category.id}">${escape(category.label)}</a></h3><ul>${blogPosts.filter(post => post.category === category.id).map(post => `<li><a href="/blog/${post.slug}">${escape(post.title)}</a></li>`).join('')}</ul></section>`).join('');
  return template.replace('<!-- arnevo:footer-services -->', services).replace('<!-- arnevo:footer-blog -->', blog);
}
