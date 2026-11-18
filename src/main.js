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
