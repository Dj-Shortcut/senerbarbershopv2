import { PHONE_E164 } from "./config";

const WHATSAPP_PHONE = ((PHONE_E164 ?? "").replace(/\D/g, "") || "+32488383871".replace(/\D/g, ""));
// Fallback keeps WhatsApp links functional even if env config is missing at runtime.

export function createDrukteMessage(serviceLabel: string) {
  return `Hi Sener Barbershop! Ik wil graag de wachttijd checken voor: ${serviceLabel}.`;
}

export function createWhatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createDrukteWhatsappUrl(serviceLabel: string) {
  return createWhatsappUrl(createDrukteMessage(serviceLabel));
}
