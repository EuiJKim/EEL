"use client";

import { useState } from "react";
import Navbar from "@/components/eel/Navbar";
import Hero from "@/components/eel/Hero";
import Gallery from "@/components/eel/Gallery";
import About from "@/components/eel/About";
import Contact from "@/components/eel/Contact";

type Section = "home" | "gallery" | "about" | "contact";

export default function EelPage() {
  const [section, setSection] = useState<Section>("home");

  return (
    <>
      <Navbar onSelect={setSection} current={section} />
      <main>
        {section === "home" && <Hero />}
        {section === "gallery" && <Gallery />}
        {section === "about" && <About />}
        {section === "contact" && <Contact />}
      </main>
    </>
  );
}
