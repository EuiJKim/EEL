import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col md:flex-row items-center pt-24"
      style={{ backgroundColor: "#EAE8E0" }}
    >
      {/* 텍스트 영역 */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-16 py-12 md:py-0">
        <p
          className="text-sm tracking-[0.4em] lowercase mb-6 animate-fade-in-up"
          style={{ color: "#7A8C6E" }}
        >
          handcrafted studio
        </p>
        <h1
          className="text-7xl md:text-9xl tracking-[0.15em] lowercase leading-none mb-8 animate-fade-in-up"
          style={{ color: "#2A2A20", fontWeight: 300 }}
        >
          eel
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-xs animate-fade-in-up-delay-1"
          style={{ color: "#2A2A20", opacity: 0.75, fontStyle: "italic" }}
        >
          resin, wood, metal —<br />
          소재가 가진 고유한 결을 살려<br />
          가구와 오브제를 만듭니다.
        </p>
        <div
          className="mt-12 h-[1px] w-16 animate-fade-in-up-delay-2"
          style={{ backgroundColor: "#7A8C6E" }}
        />
      </div>

      {/* 이미지 영역 */}
      <div className="flex-1 w-full md:w-auto relative" style={{ minHeight: "60vh" }}>
        <div
          className="w-full h-full absolute inset-0 md:relative md:h-full"
          style={{ minHeight: "60vh" }}
        >
          <HeroImage />
        </div>
      </div>
    </section>
  );
}

function HeroImage() {
  // 이미지가 있으면 표시, 없으면 플레이스홀더
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ minHeight: "60vh", backgroundColor: "#D4CFC4" }}
    >
      <Image
        src="/eel/hero.jpg"
        alt="eel 대표 작품"
        fill
        className="object-cover"
        onError={() => {}}
        priority
      />
      {/* 텍스처 오버레이 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, rgba(122,140,110,0.08) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
