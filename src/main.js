import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

new Lenis({
  autoRaf: true,
  stopInertiaOnNavigate: true,
  prevent: element => element.matches('.services-mega, .menu-open #navigation, .service-index')
});

const actionIcons = document.querySelectorAll(
  ':is(.button, .hero-contact, .home-contact-link, .text-link, .studio-text-link, .detail-text-link, .blog-all-link, .read-link, .practice-link, .footer-contact, .footer-back-top, .catalog-service-list a) > span'
);
for (const icon of actionIcons) {
  const direction = icon.textContent.trim();
  if (!/^[↗→↑↓]$/.test(direction) && !icon.closest('.hero-contact')) continue;
  if (direction === '↓') icon.classList.add('action-arrow-down');
  if (direction === '↑') icon.classList.add('action-arrow-up');
  icon.classList.add('action-arrow');
  icon.setAttribute('aria-hidden', 'true');
  icon.replaceChildren();
}

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

const faq = document.querySelector('.faq:has(details[name="home-faq"])');
if (faq && typeof faq.animate === 'function') {
  const questions = [...faq.querySelectorAll('details[name="home-faq"]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Map();
  let activeQuestion = questions.find(question => question.open);

  function animateAnswer(question, expanded) {
    const summary = question.querySelector('summary');
    const answer = question.querySelector('p');
    const startHeight = question.getBoundingClientRect().height;
    const startOpacity = question.open ? getComputedStyle(answer).opacity : 0;
    animations.get(question)?.forEach(animation => animation.cancel());
    animations.delete(question);

    question.classList.remove('faq-animating', 'faq-closing');
    if (reducedMotion.matches) {
      question.open = expanded;
      return;
    }

    question.open = true;
    const endHeight = (expanded ? question : summary).getBoundingClientRect().height;
    const timing = { duration: 440, easing: 'cubic-bezier(.25, .65, .35, 1)' };
    question.classList.add('faq-animating');
    question.classList.toggle('faq-closing', !expanded);
    const resize = question.animate({ height: [`${startHeight}px`, `${endHeight}px`] }, timing);
    const fade = answer.animate({ opacity: [startOpacity, expanded ? 1 : 0] }, timing);
    animations.set(question, [resize, fade]);
    resize.onfinish = () => {
      question.open = expanded;
      question.classList.remove('faq-animating', 'faq-closing');
      animations.delete(question);
    };
  }

  for (const question of questions) {
    question.removeAttribute('name');
    question.querySelector('summary').addEventListener('click', event => {
      event.preventDefault();
      const previous = activeQuestion;
      activeQuestion = previous === question ? undefined : question;
      if (previous) animateAnswer(previous, false);
      if (activeQuestion) animateAnswer(activeQuestion, true);
    });
  }
}

const intro = document.querySelector('.home-intro');
const root = document.documentElement;
if (intro && root.classList.contains('home-intro-active')) {
  const listeners = new AbortController();
  const finishIntro = () => {
    root.classList.remove('home-intro-active');
    listeners.abort();
  };

  if (window.scrollY > 0) {
    finishIntro();
  } else {
    const logo = intro.querySelector('.home-intro-logo');
    const headerLogo = header.querySelector('.brand-full');
    const positionLogo = () => {
      const bounds = headerLogo.getBoundingClientRect();
      intro.style.setProperty('--intro-logo-x', `${bounds.left}px`);
      intro.style.setProperty('--intro-logo-y', `${bounds.top}px`);
      intro.style.setProperty('--intro-logo-scale', bounds.width / logo.offsetWidth);
    };
    positionLogo();
    const options = { signal: listeners.signal };
    document.querySelector('.hero .chrome-word').addEventListener('animationend', event => {
      if (event.animationName === 'home-intro-art') finishIntro();
    }, options);
    window.addEventListener('resize', positionLogo, options);
    window.addEventListener('scroll', finishIntro, { ...options, passive: true });
    window.addEventListener('keydown', finishIntro, options);
    window.addEventListener('pointerdown', finishIntro, { ...options, passive: true });
    try {
      sessionStorage.setItem('arnevo-intro-seen', 'true');
    } catch {}
  }
}

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

const serviceIndex = document.querySelector('.service-index');
if (serviceIndex && 'IntersectionObserver' in window) {
  const categories = [...document.querySelectorAll('.catalog-group')];
  const visible = new Set();
  let currentLink;
  const activeCategory = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    const category = categories.find(group => visible.has(group));
    if (!category) return;
    const link = serviceIndex.querySelector(`[href="#${category.id}"]`);
    if (link === currentLink) return;
    currentLink?.removeAttribute('aria-current');
    currentLink = link;
    currentLink?.setAttribute('aria-current', 'location');
  }, { rootMargin: '-120px 0px 0px 0px' });
  categories.forEach(group => activeCategory.observe(group));
}

if ('IntersectionObserver' in window) {
  const reveals = document.querySelectorAll([
    'main > section > .container > :not(.projects, .blog-grid, .catalog-layout)',
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

  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(({ target }, index) => {
      target.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 60}ms`);
      target.classList.replace('scroll-reveal-pending', 'scroll-revealed');
      observer.unobserve(target);
    });
  });

  const viewportHeight = document.documentElement.clientHeight;
  for (const element of reveals) {
    const bounds = element.getBoundingClientRect();
    if (bounds.top < viewportHeight && bounds.bottom > 0 && !element.hidden) continue;
    element.classList.add('scroll-reveal-pending');
    observer.observe(element);
  }
}
