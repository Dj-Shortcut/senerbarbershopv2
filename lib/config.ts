export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+32488383871";

export const PHONE_E164 =
  process.env.NEXT_PUBLIC_PHONE_E164 ?? process.env.PHONE_E164 ?? "+32488383871";

export const PHONE_DISPLAY = "0488 38 38 71";

export const OPEN_DAYS = ["tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

export const OPEN_HOUR = {
  tuesday: "09:00",
  wednesday: "09:00",
  thursday: "09:00",
  friday: "09:00",
  saturday: "09:00",
} as const;

export const CLOSE_HOUR = {
  tuesday: "19:00",
  wednesday: "19:00",
  thursday: "19:00",
  friday: "19:00",
  saturday: "19:00",
} as const;

export const HOLIDAYS_BY_YEAR: Record<number, string[]> = {
  2026: ["01-01", "12-25", "12-26"],
};

export const vacationEnabled = false;
export const vacationReturnDate = "15/08/2026";

export const CONTACT_CONFIG = {
  social: {
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/the_barber_sener/",
    },
    facebook: {
      label: "Facebook",
      href: "https://www.facebook.com/KAPSALONsener",
    },
  },
  address: {
    label: "Beverstraat 22, 9400 Ninove",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Beverstraat%2022%2C%209400%20Ninove",
  },
} as const;

export const FOOTER_CONFIG = {
  creditText: "Built & maintained by DJ-Shortcut",
  projectRepoHref: "https://github.com/Dj-Shortcut/senerbarbershop",
} as const;
