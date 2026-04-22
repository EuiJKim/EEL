"use client";

import { useState } from "react";
import Image from "next/image";

type Tab = "furniture" | "objet";

interface Work {
  src: string;
  alt: string;
  title: string;
}

const furnitureWorks: Work[] = [
  { src: "/eel/furniture/01.jpg", alt: "레진 테이블", title: "resin table" },
  { src: "/eel/furniture/02.jpg", alt: "레진 선반", title: "resin shelf" },
  { src: "/eel/furniture/03.jpg", alt: "레진 의자", title: "resin chair" },
  { src: "/eel/furniture/04.jpg", alt: "원목 테이블", title: "wood table" },
  { src: "/eel/furniture/05.jpg", alt: "레진 사이드테이블", title: "side table" },
  { src: "/eel/furniture/06.jpg", alt: "레진 스툴", title: "stool" },
];

const objetWorks: Work[] = [
  { src: "/eel/objet/01.jpg", alt: "레진 오브제", title: "resin objet" },
  { src: "/eel/objet/02.jpg", alt: "레진 캔들홀더", title: "candle holder" },
  { src: "/eel/objet/03.jpg", alt: "레진 화병", title: "vase" },
  { src: "/eel/objet/04.jpg", alt: "레진 트레이", title: "tray" },
];

export default function Gallery() {
  const [tab, setTab] = useState<Tab>("furniture");

  const works = tab === "furniture" ? furnitureWorks : objetWorks;

  return (
    <section
      className="min-h-screen pt-28 pb-20 px-8 md:px-16"
      style={{ backgroundColor: "#EAE8E0" }}
    >
      {/* 헤딩 */}
      <div className="mb-12">
        <p
          className="text-sm tracking-[0.4em] lowercase mb-3"
          style={{ color: "#7A8C6E" }}
        >
          works
        </p>
        <h2
          className="text-4xl md:text-5xl tracking-[0.1em] lowercase"
          style={{ color: "#2A2A20", fontWeight: 300 }}
        >
          gallery
        </h2>
      </div>

      {/* 탭 */}
      <div className="flex gap-8 mb-12">
        {(["furniture", "objet"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="text-base tracking-[0.2em] lowercase pb-1 transition-all duration-200"
            style={{
              color: tab === t ? "#2A2A20" : "#2A2A20",
              opacity: tab === t ? 1 : 0.4,
              borderBottom: tab === t ? "1px solid #7A8C6E" : "1px solid transparent",
              fontFamily: "var(--font-cormorant), Georgia, serif",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {works.map((work, i) => (
          <WorkCard key={`${tab}-${i}`} work={work} index={i} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "4/5",
        backgroundColor: "#D4CFC4",
        animationDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={work.src}
        alt={work.alt}
        fill
        className="object-cover transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
      />
      {/* 호버 오버레이 */}
      <div
        className="absolute inset-0 flex items-end p-5 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(42,42,32,0.55) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0,
        }}
      >
        <span
          className="text-sm tracking-[0.2em] lowercase"
          style={{ color: "#EAE8E0", fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {work.title}
        </span>
      </div>
    </div>
  );
}
