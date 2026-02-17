import { CONTACT_CONFIG, PHONE_E164 } from "./config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thesenerbarber.be";

export const BUSINESS_NAME = "The Sener Barber";

export const SEO_TITLE =
  "The Sener Barber – Barbier in Ninove | 4,9⭐ Reviews";

export const SEO_DESCRIPTION =
  "The Sener Barber in Ninove: premium barbier en herenkapper voor strakke fades, baardstyling en verzorgde looks. Ontdek onze topservice en ervaar waarom klanten ons 4,9⭐ beoordelen.";

export const OPENING_HOURS_SPEC = [
  "Tu 10:00-19:00",
  "We 10:00-19:00",
  "Th 10:00-20:00",
  "Fr 10:00-20:00",
  "Sa 09:00-18:00",
];

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Barbershop",
  name: BUSINESS_NAME,
  url: SITE_URL,
  telephone: PHONE_E164,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beverstraat 22",
    postalCode: "9400",
    addressLocality: "Ninove",
    addressCountry: "BE",
  },
  openingHours: OPENING_HOURS_SPEC,
  sameAs: [
    CONTACT_CONFIG.social.instagram.href,
    CONTACT_CONFIG.social.facebook.href,
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "55",
  },
};
