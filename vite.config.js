import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderServicesContent } from './src/render-services.js';
import { renderContactContent } from './src/render-contact.js';
import { blogPosts } from './src/blog/data.js';
import { generateBlogPages, renderBlogContent } from './src/blog/render.js';
import { catalogServices } from './src/service-catalog/data.js';
import { generateServicePages, renderServiceMenu } from './src/service-catalog/render.js';
import { renderFooter } from './src/render-footer.js';
import { renderOptimizedImages } from './src/render-images.js';

const root = new URL('./', import.meta.url);
const file = path => fileURLToPath(new URL(path, root));
const base = process.env.VITE_BASE_PATH || '/';
if (!base.startsWith('/') || !base.endsWith('/') || base.startsWith('//')) throw new Error('VITE_BASE_PATH must be a local path with leading and trailing slashes.');
const localPath = path => base !== '/' && path?.startsWith(base) ? `/${path.slice(base.length)}` : path;
generateBlogPages(root);
generateServicePages(root);
const serviceRoutes = catalogServices.map(service => `hizmetler/${service.slug}`);
const blogRoutes = ['blog', ...blogPosts.map(post => `blog/${post.slug}`)];

// Vite's MPA mode needs an explicit clean-URL mapping for directory entries.
function innerPageRoutes(server) {
  server.middlewares.use((request, response, next) => {
    const requestPath = request.url?.split('?')[0];
    const path = localPath(requestPath);
    for (const page of ['hizmetler', 'iletisim', 'hakkimizda', ...blogRoutes, ...serviceRoutes]) {
      if (path === `/${page}` || path === `/${page}/`) {
        request.url = `${base}${page}/index.html${request.url.slice(requestPath.length)}`;
        break;
      }
    }
    next();
  });
}

export default defineConfig({
  base,
  appType: 'mpa',
  plugins: [{
    name: 'arnevo-shared-html',
    configureServer: innerPageRoutes,
    configurePreviewServer: innerPageRoutes,
    transformIndexHtml(html, context) {
      const pagePath = localPath(context.path);
      const isServices = pagePath.startsWith('/hizmetler');
      let header = readFileSync(file('./src/components/header.html'), 'utf8');
      const currentService = isServices ? (pagePath.split('/')[2] || '') : '';
      header = header.replace('<!-- arnevo:services-menu -->', renderServiceMenu(currentService));
      if (isServices) header = header.replace('data-services-link', 'data-services-link aria-current="page"');
      if (pagePath.startsWith('/iletisim')) header = header.replace('data-contact-link', 'data-contact-link aria-current="page"');
      if (pagePath.startsWith('/hakkimizda')) header = header.replace('data-about-link', 'data-about-link aria-current="page"');
      if (pagePath.startsWith('/blog')) header = header.replace('data-blog-link', 'data-blog-link aria-current="page"');
      const partials = {
        header,
        footer: renderFooter(readFileSync(file('./src/components/footer.html'), 'utf8')),
        ...renderServicesContent(),
        ...renderContactContent(),
        ...renderBlogContent(),
      };
      const rendered = renderOptimizedImages(html.replace(/<!-- arnevo:([\w-]+) -->/g, (marker, name) => {
        if (!(name in partials)) throw new Error(`Unknown Arnevo partial: ${name}`);
        return partials[name];
      }), base);
      if (base === '/') return rendered;
      // Shared components are injected after asset processing. Prefix their URLs too,
      // while leaving URLs already rewritten by Vite untouched.
      const withBase = url => url.startsWith(base) || url.startsWith('//') ? url : base + url.slice(1);
      return rendered
        .replace(/(\b(?:href|src|content)=["'])(\/(?!\/)[^"']*)/g, (_, prefix, url) => prefix + withBase(url))
        .replace(/(\bsrcset=["'])([^"']+)/g, (_, prefix, value) => prefix + value.replace(/(^|,\s*)(\/[^,\s]+)/g, (_, separator, url) => separator + withBase(url)))
        .replace(/("image":")(\/[^"\s]+)/g, (_, prefix, url) => prefix + withBase(url));
    },
    async handleHotUpdate({ file: changed, server }) {
      if (changed.endsWith('/src/image-manifest.json')) {
        await server.restart();
        return [];
      }
      if (changed.includes('/src/service-catalog/')) {
        await server.restart();
        return [];
      }
      if (changed.includes('/src/blog/posts/') && changed.endsWith('.json')) {
        await server.restart();
        return [];
      }
      if (changed.includes('/src/blog/') || changed.includes('/src/components/') || changed.endsWith('/src/services-data.js') || changed.endsWith('/src/render-services.js') || changed.endsWith('/src/render-contact.js') || changed.endsWith('/src/render-footer.js') || changed.endsWith('/src/contact-config.js')) {
        server.ws.send({ type: 'full-reload' });
      }
    },
  }, {
    name: 'arnevo-google-tag-manager',
    transformIndexHtml: {
      order: 'post',
      handler: () => [
        {
          tag: 'script',
          attrs: { async: true, src: 'https://www.googletagmanager.com/gtm.js?id=GTM-TZ2W9R3Z' },
          injectTo: 'head-prepend',
        },
        {
          tag: 'script',
          children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          injectTo: 'head-prepend',
        },
      ],
    },
  }],
  build: {
    rollupOptions: {
      input: { home: file('./index.html'), services: file('./hizmetler/index.html'), contact: file('./iletisim/index.html'), about: file('./hakkimizda/index.html'), blog: file('./blog/index.html'), ...Object.fromEntries(catalogServices.map(service => [`service-${service.slug}`, file(`./hizmetler/${service.slug}/index.html`)])), ...Object.fromEntries(blogPosts.map(post => [`blog-${post.slug}`, file(`./blog/${post.slug}/index.html`)])) },
    },
  },
});
