import type { Metadata } from "next";
import "./globals.css";
import { BUSINESS_NAME, LOCAL_BUSINESS_SCHEMA, SEO_DESCRIPTION, SITE_URL } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_NAME} | Barbier in Ninove`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: SEO_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} | Barbier in Ninove`,
    description: SEO_DESCRIPTION,
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: `${BUSINESS_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${BUSINESS_NAME} | Barbier in Ninove`,
    description: SEO_DESCRIPTION,
    images: ["/icon.svg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        {children}
      </body>
    </html>
  );
}
