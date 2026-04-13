import type { Metadata } from "next";
import { Gravitas_One, Staatliches } from "next/font/google";
import "./globals.css";

const gravitasOne = Gravitas_One({
  variable: "--font-gravitas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const staatliches = Staatliches({
  variable: "--font-staatliches",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EEL — Furniture & Object Maker",
  description: "A Seoul-based studio crafting resin objects that are eccentric by nature, precise by hand",
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
      <body className={`${gravitasOne.variable} ${staatliches.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
