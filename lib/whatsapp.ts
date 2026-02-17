export const WHATSAPP_PHONE = "31600000000";

export function createDrukteMessage(serviceLabel: string) {
  return `Hi Sener Barbershop! Ik wil graag de wachttijd checken voor: ${serviceLabel}.`;
}

export function createWhatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createDrukteWhatsappUrl(serviceLabel: string) {
  return createWhatsappUrl(createDrukteMessage(serviceLabel));
}
