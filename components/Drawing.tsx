import Image from "next/image";

const images = [
  "draw.jpg",
  "draw1.jpg",
  "draw2.jpg",
  "draw3.jpg",
  "draw4.jpg",
  "draw5.jpg",
  "draw6.jpg",
  "draw7.jpg",
];

export default function Drawing() {
  return (
    <section
      className="min-h-screen flex"
      style={{ backgroundColor: "#D0DBCC" }}
    >
      {/* 좌측 1/5 — 여백 */}
      <div className="flex-[1]" />

      {/* 우측 4/5 — 사진 세로 배열 */}
      <div className="flex-[4] flex flex-col pt-16">
        {images.map((img) => (
          <div key={img} className="relative w-full h-64">
            <Image
              src={`/drawing/${img}`}
              alt={img}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
