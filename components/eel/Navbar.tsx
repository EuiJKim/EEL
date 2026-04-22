"use client";

import { useState } from "react";

type Section = "home" | "gallery" | "about" | "contact";

interface NavbarProps {
  onSelect: (section: Section) => void;
  current: Section;
}

export default function Navbar({ onSelect, current }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const links: { label: string; section: Section }[] = [
    { label: "gallery", section: "gallery" },
    { label: "about", section: "about" },
    { label: "contact", section: "contact" },
  ];

  const handleSelect = (section: Section) => {
    onSelect(section);
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6"
      style={{ backgroundColor: "#EAE8E0" }}
    >
      <button
        onClick={() => handleSelect("home")}
        className="text-2xl tracking-[0.3em] lowercase hover:opacity-60 transition-opacity duration-200"
        style={{ color: "#2A2A20", fontFamily: "var(--font-cormorant), Georgia, serif" }}
        aria-label="홈으로"
      >
        eel
      </button>

      {/* 데스크탑 메뉴 */}
      <ul className="hidden md:flex gap-10">
        {links.map(({ label, section }) => (
          <li key={section}>
            <button
              onClick={() => handleSelect(section)}
              className="text-sm tracking-[0.2em] lowercase transition-opacity duration-200"
              style={{
                color: current === section ? "#7A8C6E" : "#2A2A20",
                opacity: current === section ? 1 : 0.7,
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1rem",
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* 모바일 햄버거 */}
      <button
        className="md:hidden flex flex-col gap-[5px]"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-6 h-[1px] transition-all duration-300"
            style={{
              backgroundColor: "#2A2A20",
              transform:
                open && i === 0
                  ? "translateY(6px) rotate(45deg)"
                  : open && i === 1
                  ? "scaleX(0)"
                  : open && i === 2
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
            }}
          />
        ))}
      </button>

      {/* 모바일 드롭다운 */}
      <div
        className="absolute top-full left-0 w-full md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: open ? "200px" : "0",
          backgroundColor: "#EAE8E0",
        }}
      >
        <ul className="flex flex-col px-8 pb-6 gap-4">
          {links.map(({ label, section }, i) => (
            <li key={section}>
              <button
                onClick={() => handleSelect(section)}
                className="text-lg tracking-[0.2em] lowercase transition-opacity duration-200"
                style={{
                  color: current === section ? "#7A8C6E" : "#2A2A20",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  transform: open ? "translateY(0)" : "translateY(10px)",
                  opacity: open ? 1 : 0,
                  transition: `transform 0.3s ease ${i * 0.06}s, opacity 0.3s ease ${i * 0.06}s`,
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
