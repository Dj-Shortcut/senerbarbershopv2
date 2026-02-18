import { CONTACT_CONFIG, OPEN_DAYS, OPEN_HOUR, CLOSE_HOUR, PHONE_E164 } from "../config";
import { BUSINESS_NAME, SITE_URL } from "../seo";
import { SERVICES } from "../services";

const dayMap: Record<(typeof OPEN_DAYS)[number], string> = {
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

const BUSINESS_ID = `${SITE_URL}#barbershop`;

function toOffer(service: (typeof SERVICES)[number]) {
  const numericPrice = Number(service.price.replace("€", "").trim());

  return {
    "@type": "Offer",
    name: service.name,
    price: Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : undefined,
    priceCurrency: "EUR",
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BarberShop",
        "@id": BUSINESS_ID,
        name: BUSINESS_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/og-image`,
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Prijslijst",
          itemListElement: SERVICES.map(toOffer),
        },
        sameAs: [
          CONTACT_CONFIG.address.mapsHref,
          CONTACT_CONFIG.social.instagram.href,
          CONTACT_CONFIG.social.facebook.href,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: BUSINESS_NAME,
        publisher: {
          "@id": BUSINESS_ID,
        },
      },
    ],
  };
}
