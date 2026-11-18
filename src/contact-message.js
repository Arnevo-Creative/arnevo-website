import { contactEmail } from './contact-config.js';

// Build a plain-text draft. Values are encoded as a body, never as mail headers.
export function createProjectMailto({ name, email, company, website, interests, packageName, timeline, message }) {
  const body = [
    'Merhaba Arnevo,', '', 'Projem hakkında sizinle görüşmek istiyorum.', '',
    `Ad soyad: ${name}`, `E-posta: ${email}`,
    ...(company ? [`Şirket / marka: ${company}`] : []),
    ...(website ? [`Web sitesi: ${website}`] : []),
    `İlgilendiğim hizmetler: ${interests.length ? interests.join(', ') : 'Birlikte belirleyelim'}`,
    `İlgilendiğim paket: ${packageName || 'Birlikte belirleyelim'}`,
    `Başlangıç zamanı: ${timeline}`, '', 'Proje özeti:', message,
  ].join('\r\n');
  const subject = `Arnevo | Proje talebi — ${name}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
