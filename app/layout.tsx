import type { Metadata } from "next";
import { Gravitas_One, Staatliches, DM_Sans, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const gravitasOne = Gravitas_One({
  variable: "--font-gravitas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Inter — body/UI text on /journal.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Space Grotesk — display/title + wordmark on /journal.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const staatliches = Staatliches({
  variable: "--font-staatliches",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eel-studio.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "EEL — Furniture & Object Maker",
  description: "A Seoul-based studio crafting resin objects that are eccentric by nature, precise by hand",
  openGraph: {
    title: "EEL — Resin Atelier",
    description: "A Seoul-based studio crafting resin objects that are eccentric by nature, precise by hand. Made-to-order, cured over 21 days.",
    url: SITE_URL,
    siteName: "EEL",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EEL — Seoul resin atelier",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EEL — Resin Atelier",
    description: "A Seoul-based studio crafting resin objects, eccentric by nature, precise by hand.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Telex&display=swap" rel="stylesheet" />
      </head>
      <body className={`${gravitasOne.variable} ${staatliches.variable} ${dmSans.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''} />
        {children}
      </body>
    </html>
  );
}
