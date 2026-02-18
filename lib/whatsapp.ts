import { WHATSAPP_NUMBER } from "./config";

const whatsappPhone =
  (WHATSAPP_NUMBER ?? "").replace(/\D/g, "") || "+32488383871".replace(/\D/g, "");

export function createDrukteMessage(serviceLabel: string) {
  return `Hi The Sener Barber! Ik wil graag de wachttijd checken voor: ${serviceLabel}.`;
}

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function createDrukteWhatsAppUrl(serviceLabel: string) {
  return createWhatsAppUrl(createDrukteMessage(serviceLabel));
}
