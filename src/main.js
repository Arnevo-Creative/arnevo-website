const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const servicesDropdown = document.querySelector('.services-dropdown');
const servicesSummary = servicesDropdown.querySelector(':scope > summary');
const mobileQuery = window.matchMedia('(max-width: 760px)');
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
