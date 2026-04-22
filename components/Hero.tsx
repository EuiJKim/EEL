import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-start"
      style={{ backgroundColor: "#D0DBCC" }}
    >
      {/* 좌측 1/5 — 텍스트 */}
      <div className="flex-[1] flex flex-col gap-5 px-6 pt-36 text-xs min-h-screen" style={{ color: "#000000" }}>
        <p className="tracking-widest uppercase leading-relaxed">
          Material-driven<br />Studio based in Seoul
        </p>

        <div className="leading-relaxed">
          <p>Things made to catch light, and keep it.</p>
          <br />
          <p>Not fixed, but enduring —</p>
          <p>A structure that remains, even quietly.</p>
        </div>

        <div className="flex flex-col gap-1">
          <a
            href="mailto:plumcatmango@gmail.com"
            className="hover:opacity-60 transition-opacity duration-200 break-all"
          >
            Info: plumcatmango@gmail.com
          </a>
          <a
            href="https://www.instagram.com/eel.eel.eel.eel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-200"
          >
            Instagram @eel.eel.eel.eel
          </a>
        </div>
      </div>

      {/* mimi1 — 2/5 */}
      <div className="flex-[2] relative min-h-screen overflow-hidden">
        <Image
          src="/mimi1.jpg"
          alt="mimi1"
          fill
          className="object-cover"
          style={{ transform: 'scale(1.26)', transformOrigin: 'bottom center' }}
          priority
        />
      </div>

      {/* mimi — 2/5 */}
      <div className="flex-[2] relative min-h-screen overflow-hidden">
        <Image
          src="/objet22.jpg"
          alt="objet22"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </section>
  );
}
