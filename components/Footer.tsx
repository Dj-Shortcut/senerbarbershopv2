import { Facebook, Github, Instagram, MapPin, Phone } from "lucide-react";
import { CONTACT_CONFIG, FOOTER_CONFIG, PHONE_DISPLAY, PHONE_E164 } from "../lib/config";

export default function Footer() {
  return (
    <footer className="mt-16 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/25 backdrop-blur-md sm:p-6">
        <div className="grid gap-3 text-sm text-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={CONTACT_CONFIG.social.instagram.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Instagram profiel"
            className="inline-flex items-center gap-2 text-white/85 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          >
            <Instagram size={15} />
            <span>Instagram</span>
          </a>
          <a
            href={CONTACT_CONFIG.social.facebook.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Facebook pagina"
            className="inline-flex items-center gap-2 text-white/85 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          >
            <Facebook size={15} />
            <span>Facebook</span>
          </a>
          <a href={`tel:${PHONE_E164}`} aria-label="Bel The Sener Barber" className="inline-flex items-center gap-2 text-white/85 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
            <Phone size={15} />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a
            href={CONTACT_CONFIG.address.mapsHref}
            target="_blank"
            rel="noopener"
            aria-label="Open adres in Google Maps"
            className="inline-flex items-center gap-2 text-white/85 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          >
            <MapPin size={15} />
            <span>{CONTACT_CONFIG.address.label}</span>
          </a>
          <a
            href={FOOTER_CONFIG.projectRepoHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Open project repository"
            className="inline-flex items-center gap-2 text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
          >
            <Github size={15} />
            <span>{FOOTER_CONFIG.creditText}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
