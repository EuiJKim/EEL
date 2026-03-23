import type { Metadata } from "next";
import { DM_Sans, Fraunces, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EEL",
  description: "프리미엄 순수 레진 아트퍼니처 — 당신만을 위해 처음부터 만들어집니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${dmSans.variable} ${fraunces.variable} ${notoSerifKR.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
