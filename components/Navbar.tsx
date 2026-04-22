"use client";

import { useState } from "react";

type Section = "home" | "furniture" | "objet" | "drawing" | "contact";

const menuItems: { label: string; section: Section }[] = [
  { label: "furniture", section: "furniture" },
  { label: "objet", section: "objet" },
  { label: "drawing", section: "drawing" },
  { label: "say hello", section: "contact" },
];

interface NavbarProps {
  onSelect: (section: Section) => void;
}

export default function Navbar({ onSelect }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (section: Section) => {
    onSelect(section);
    setOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {/* 상단 바 */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
        {/* 왼쪽: 햄버거 + EEL */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[6px]"
            aria-label="메뉴 열기"
          >
            <span
              className="block w-8 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: "#000000",
                transform: open ? "translateY(7.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-8 h-[1.5px] transition-all duration-300"
              style={{
                backgroundColor: "#000000",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-8 h-[1.5px] transition-all duration-300 origin-center"
              style={{
                backgroundColor: "#000000",
                transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>

          <button
            onClick={() => handleSelect("home")}
            className="text-2xl leading-none select-none tracking-normal"
            style={{ fontFamily: "inherit", color: "#000000" }}
          >
            EEL
          </button>
        </div>

        {/* 오른쪽: 장바구니 */}
        <button aria-label="장바구니" className="hover:opacity-60 transition-opacity duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>
      </div>

      {/* 메뉴 오버레이 */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center pl-16 transition-all duration-500"
        style={{
          backgroundColor: "#D0DBCC",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav>
          <ul className="flex flex-col gap-6">
            {menuItems.map((item, i) => (
              <li
                key={item.label}
                style={{
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transition: `transform 0.4s ease ${i * 0.07}s, opacity 0.4s ease ${i * 0.07}s`,
                }}
              >
                <button
                  onClick={() => handleSelect(item.section)}
                  className="text-4xl md:text-5xl hover:opacity-60 transition-opacity duration-200"
                  style={{ fontFamily: "inherit", color: "#000000" }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
