import { contactEmail } from './contact-config.js';
import { createProjectMailto } from './contact-message.js';

const form = document.querySelector('#project-form');
const message = document.querySelector('#message');
const status = document.querySelector('#form-status');
const copyStatus = document.querySelector('#copy-status');
const params = new URLSearchParams(window.location.search);

// Only accept service/package values already present in the rendered form.
for (const choice of form.querySelectorAll('input[name="hizmet"]')) {
  choice.checked = params.get('hizmet') === choice.value;
}
const specificService = form.elements.namedItem('detay_hizmet');
if ([...specificService.options].some(option => option.value === params.get('hizmet'))) {
  specificService.value = params.get('hizmet');
}
const packageSelect = form.elements.namedItem('paket');
if ([...packageSelect.options].some(option => option.value === params.get('paket'))) {
  packageSelect.value = params.get('paket');
}

form.addEventListener('invalid', event => {
  event.target.setAttribute('aria-invalid', 'true');
}, true);
form.addEventListener('input', event => {
  event.target.setCustomValidity?.('');
  event.target.removeAttribute('aria-invalid');
  status.textContent = '';
  document.querySelector('#message-count').textContent = `${message.value.length} / 5000`;
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.namedItem('ad');
  name.value = name.value.trim();
  message.value = message.value.trim();
  name.setCustomValidity(name.value.length < 2 ? 'Lütfen adınızı ve soyadınızı yazın.' : '');
  message.setCustomValidity(message.value.length < 20 ? 'Projenizi en az 20 karakterle anlatın.' : '');
  if (!form.reportValidity()) return;

  const field = key => form.elements.namedItem(key).value.trim();
  const interests = [...form.querySelectorAll('input[name="hizmet"]:checked')].map(input => input.dataset.title);
  if (specificService.value) interests.push(specificService.selectedOptions[0].textContent);
  const selectedPackage = packageSelect.value ? packageSelect.selectedOptions[0].textContent : 'Birlikte belirleyelim';
  const mailto = createProjectMailto({
    name: field('ad'), email: field('eposta'), company: field('sirket'),
    website: field('web'), interests, packageName: selectedPackage,
    timeline: field('zaman'), message: field('mesaj'),
  });

  // Opening a mail client is not delivery. Keep the form intact and state the next step.
  status.textContent = 'E-posta taslağınız hazır. Açılan e-posta uygulamasında mesajınızı kontrol edip Gönder’i seçin. Uygulama açılmadıysa info@arnevo.co adresine doğrudan yazabilirsiniz.';
  window.location.href = mailto;
});

document.querySelector('.copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(contactEmail);
    copyStatus.textContent = 'E-posta adresi kopyalandı.';
  } catch {
    copyStatus.textContent = `Kopyalama kullanılamıyor. Adresimiz: ${contactEmail}`;
  }
});
