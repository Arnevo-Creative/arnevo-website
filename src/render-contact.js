import { contactEmail, contactPhones } from './contact-config.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
export function renderContactContent() {
  return {
    'contact-channels': `<li class="contact-channel"><h3>E-posta</h3><a class="contact-channel-value" href="mailto:${contactEmail}">${escape(contactEmail)}<span aria-hidden="true">→</span></a><p>Projenizi e-posta ile paylaşın.</p></li>${contactPhones.map(phone => {
      const href = phone.whatsapp ? `https://wa.me/${phone.international.slice(1)}` : `tel:${phone.international}`;
      return `<li class="contact-channel"><h3>${phone.whatsapp ? 'WhatsApp' : 'Telefon'}</h3><a class="contact-channel-value" href="${href}" aria-label="${phone.whatsapp ? 'WhatsApp’tan yazın' : 'Telefonla arayın'}: ${escape(phone.display)}"${phone.whatsapp ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escape(phone.display)}<span aria-hidden="true">→</span></a><p>${phone.whatsapp ? 'WhatsApp üzerinden bize yazın.' : 'Bizi arayın, fikrinizi konuşalım.'}</p>${phone.whatsapp ? `<a class="contact-call-link" href="tel:${phone.international}" aria-label="Telefonla arayın: ${escape(phone.display)}">Telefonla arayın <span aria-hidden="true">↗</span></a>` : ''}</li>`;
    }).join('')}`,
  };
}
