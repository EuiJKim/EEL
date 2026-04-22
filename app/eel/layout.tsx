import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "eel — resin furniture & objet",
  description: "레진을 주재료로 가구와 오브제를 만드는 핸드크래프트 스튜디오",
};

export default function EelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cormorant.variable}`}
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
    >
      {children}
    </div>
  );
}
