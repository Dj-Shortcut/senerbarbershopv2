export const PHONE_E164 =
  process.env.NEXT_PUBLIC_PHONE_E164 ?? process.env.PHONE_E164 ?? "+32488383871";

export const PHONE_DISPLAY = "+32 488 38 38 71";

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
  creditText: "Built & maintained by DJ Shortcut",
  maintainerHref: "https://github.com/Dj-Shortcut",
  projectRepoText: "Project repo",
  projectRepoHref: "https://github.com/Dj-Shortcut/senerbarbershop",
} as const;
