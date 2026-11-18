const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const servicesDropdown = document.querySelector('.services-dropdown');
const servicesSummary = servicesDropdown.querySelector(':scope > summary');
const mobileQuery = window.matchMedia('(max-width: 760px)');

function updateHeader() {
  header.classList.toggle('header-scrolled', window.scrollY > 24);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('pageshow', updateHeader);

function closeServiceMenu() { servicesDropdown.open = false; }
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Menüyü aç');
  header.classList.remove('menu-open');
  closeServiceMenu();
}
function resetGroups() {
  document.querySelectorAll('.mega-group').forEach(group => { group.open = !mobileQuery.matches; });
}
resetGroups();
toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
  header.classList.toggle('menu-open', isOpen);
  if (!isOpen) closeServiceMenu();
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (servicesDropdown.open) {
    closeServiceMenu();servicesSummary.focus();
  } else if (header.classList.contains('menu-open')) {
    closeMenu();toggle.focus();
  }
});
document.addEventListener('pointerdown', event => { if (!header.contains(event.target)) closeMenu(); });
header.addEventListener('focusout', event => {
  if (event.relatedTarget && !header.contains(event.relatedTarget)) closeServiceMenu();
});
mobileQuery.addEventListener('change', () => { closeMenu();resetGroups(); });
const cover = document.querySelector('.maarif');
if (cover) new ResizeObserver(([entry]) => {
  cover.style.setProperty('--cover-scale', entry.contentRect.width / 590);
}).observe(cover);

const references = document.querySelector('.references');
if (references) {
  const logos = references.querySelector('.reference-logos');
  const repeatedLogos = logos.cloneNode(true);
  repeatedLogos.setAttribute('aria-hidden', 'true');
  repeatedLogos.classList.add('reference-logos-copy');
  logos.after(repeatedLogos);

  const pause = references.querySelector('.references-toggle');
  pause.hidden = false;
  pause.addEventListener('click', () => {
    const paused = pause.getAttribute('aria-pressed') === 'true';
    pause.setAttribute('aria-pressed', String(!paused));
    references.classList.toggle('references-paused', !paused);
  });
  references.classList.add('references-animated');
}

const scrollDrivenReveal = CSS.supports('animation-timeline', 'view(block 0px 10%)')
  && CSS.supports('animation-range', 'entry 0% entry 95%');

if (scrollDrivenReveal || 'IntersectionObserver' in window) {
  const reveals = document.querySelectorAll([
    'main > section > .container > :not(.projects, .blog-grid)',
    'main > section.container > *',
    'main > .references .references-window',
    'main > .contact > *',
    '.projects > .project',
    '.blog-grid > .blog-card',
    '.catalog-group',
    '.article-body > section',
    '.footer-layout > *',
    '.footer-journal',
    '.footer-bottom'
  ].join(', '));

  const observer = scrollDrivenReveal ? null : new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('scroll-revealed');
      observer.unobserve(entry.target);
    }
  });

  const viewportHeight = document.documentElement.clientHeight;
  for (const element of reveals) {
    const bounds = element.getBoundingClientRect();
    if (bounds.top < viewportHeight && bounds.bottom > 0 && !element.hidden) continue;
    if (observer) observer.observe(element);
    else element.classList.add('scroll-reveal-target');
  }
}
