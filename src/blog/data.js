import { readdirSync, readFileSync } from 'node:fs';

export const blogCategories = [
  { id: 'grafik-tasarim', label: 'Grafik Tasarım' },
  { id: 'sosyal-medya', label: 'Sosyal Medya' },
  { id: 'branding', label: 'Branding' },
  { id: 'kurumsal-kimlik', label: 'Kurumsal Kimlik' },
];
export const publishedDate = '2026-11-15';
export const blogPosts = readdirSync(new URL('./posts/', import.meta.url))
  .filter(name => name.endsWith('.json')).sort()
  .map(name => {
    const post = JSON.parse(readFileSync(new URL(`./posts/${name}`, import.meta.url), 'utf8'));
    const category = blogCategories.find(item => item.id === post.category);
    if (!category || !/^[a-z0-9-]+$/.test(post.slug)) throw new Error(`Invalid blog post: ${name}`);
    const words = [post.intro, ...post.sections.flatMap(section => [...section.paragraphs, ...(section.bullets || [])]), post.takeaway].join(' ').split(/\s+/).length;
    return { ...post, categoryLabel: category.label, minutes: Math.max(2, Math.ceil(words / 200)), date: publishedDate };
  });
if (new Set(blogPosts.map(post => post.slug)).size !== blogPosts.length) throw new Error('Duplicate blog slug');
