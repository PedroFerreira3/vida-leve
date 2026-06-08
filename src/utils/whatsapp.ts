const DEFAULT_WHATSAPP_NUMBER = "5511993546156";

export function getWhatsAppNumber() {
  return import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
}

export function getWhatsAppUrl(message: string) {
  const number = getWhatsAppNumber().replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${number}?text=${encodedMessage}`;
}
