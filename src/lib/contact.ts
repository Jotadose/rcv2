export function getWhatsAppNumber(rawPhone: string) {
  return rawPhone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(rawPhone: string, message?: string) {
  const baseUrl = `https://wa.me/${getWhatsAppNumber(rawPhone)}`;
  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}
