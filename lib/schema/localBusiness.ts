import { CONTACT_CONFIG, OPEN_DAYS, OPEN_HOUR, CLOSE_HOUR, PHONE_E164 } from "../config";
import { BUSINESS_NAME, SITE_URL } from "../seo";

const dayMap: Record<(typeof OPEN_DAYS)[number], string> = {
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.8339,
      longitude: 4.0261,
    },
    openingHoursSpecification: OPEN_DAYS.map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayMap[day]}`,
      opens: OPEN_HOUR[day],
      closes: CLOSE_HOUR[day],
    })),
    sameAs: [
      CONTACT_CONFIG.address.mapsHref,
      CONTACT_CONFIG.social.instagram.href,
      CONTACT_CONFIG.social.facebook.href,
    ],
  };
}
