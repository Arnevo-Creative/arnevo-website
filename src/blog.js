const cards = [...document.querySelectorAll('[data-blog-card]')];
const filters = [...document.querySelectorAll('.blog-filters button')];
const search = document.querySelector('#blog-search');
const searchForm = document.querySelector('.blog-search');
const resultCount = document.querySelector('.blog-result-count');
const empty = document.querySelector('.blog-empty');
const normalize = value => value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
let category = 'all';
let timer;

function applyFilters(updateURL = true) {
  const query = normalize(search.value.trim());
  let count = 0;
  for (const card of cards) {
    const visible = (category === 'all' || card.dataset.category === category) && normalize(card.dataset.search).includes(query);
    card.hidden = !visible;
    if (visible) count++;
  }
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
  resultCount.textContent = `${count} yazı${search.value.trim() ? ' bulundu' : ''}`;
  empty.hidden = count !== 0;
  if (updateURL) {
    const url = new URL(location.href);
    if (category !== 'all') url.searchParams.set('kategori',category); else url.searchParams.delete('kategori');
    if (search.value.trim()) url.searchParams.set('q',search.value.trim()); else url.searchParams.delete('q');
    history.replaceState(null,'',url);
  }
}
function restoreURL() {
  const params = new URLSearchParams(location.search);
  const selection = params.get('kategori');
  category = filters.some(button => button.dataset.category === selection) ? selection : 'all';
  search.value = (params.get('q') || '').slice(0,150);
  applyFilters(false);
}
filters.forEach(button => button.addEventListener('click',()=>{category=button.dataset.category;applyFilters();}));
search.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>applyFilters(),180);});
searchForm.addEventListener('submit',event=>{event.preventDefault();clearTimeout(timer);applyFilters();});
document.querySelector('#reset-blog').addEventListener('click',()=>{category='all';search.value='';applyFilters();filters[0].focus();});
window.addEventListener('popstate',restoreURL);
restoreURL();
