import { services, packages } from './services-data.js';
import { contactEmail } from './contact-config.js';
import { renderContactServiceOptions } from './service-catalog/render.js';

const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
export function renderContactContent() {
  return {
    'contact-email': `<a class="contact-email" href="mailto:${contactEmail}">${contactEmail}<span aria-hidden="true">↗</span></a>`,
    'contact-services': services.map(service => `<label class="interest-choice"><input type="checkbox" name="hizmet" value="${service.id}" data-title="${escape(service.title)}"><span>${escape(service.shortTitle)}</span></label>`).join(''),
    'contact-service-options': renderContactServiceOptions(),
    'contact-packages': packages.map(item => `<option value="${item.id}">${escape(item.title)}</option>`).join(''),
  };
}
