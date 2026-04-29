import { Facebook, Github, Instagram, MapPin, Phone } from "lucide-react";
import { CONTACT_CONFIG, FOOTER_CONFIG, PHONE_DISPLAY, PHONE_E164 } from "../lib/config";
import { createDrukteWhatsAppUrl } from "../lib/whatsapp";

const inlineLinkClass =
  "inline-flex items-center gap-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 px-4 pb-10 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Bezoek ons</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl">
            Kom langs in Ninove
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
            Walk-ins zijn welkom. Check de drukte via WhatsApp of open meteen de route naar de barbershop.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT_CONFIG.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open adres in Google Maps"
              className="ios-glass-pill ios-glass-pill--primary w-full sm:w-auto"
            >
              <MapPin size={16} />
              <span>Route openen</span>
            </a>
            <a
              href={createDrukteWhatsAppUrl("algemene drukte")}
              target="_blank"
              rel="noreferrer"
              aria-label="Check drukte via WhatsApp"
              className="ios-glass-pill w-full sm:w-auto"
            >
              <Phone size={16} />
              <span>Check drukte</span>
            </a>
          </div>
        </div>

        <div className="grid gap-5 text-sm text-zinc-300 sm:grid-cols-2 lg:grid-cols-1">
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Adres</p>
            <a
              href={CONTACT_CONFIG.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-2 text-white/90 ${inlineLinkClass}`}
            >
              <MapPin size={15} />
              <span>{CONTACT_CONFIG.address.label}</span>
            </a>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Contact</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              <a href={`tel:${PHONE_E164}`} aria-label="Bel The Sener Barber" className={`text-white/90 ${inlineLinkClass}`}>
                <Phone size={15} />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={CONTACT_CONFIG.social.instagram.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Instagram profiel"
                className={`text-white/75 ${inlineLinkClass}`}
              >
                <Instagram size={15} />
                <span>Instagram</span>
              </a>
              <a
                href={CONTACT_CONFIG.social.facebook.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Facebook pagina"
                className={`text-white/75 ${inlineLinkClass}`}
              >
                <Facebook size={15} />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          <a
            href={FOOTER_CONFIG.projectRepoHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Open project repository"
            className={`w-fit text-xs text-white/45 hover:text-white/70 ${inlineLinkClass}`}
          >
            <Github size={14} />
            <span>{FOOTER_CONFIG.creditText}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
