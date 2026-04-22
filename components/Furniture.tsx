import Image from "next/image";

const images = [
  "table2.jpg",
  "greentable2.jpg",
  "tiletable2.jpg",
  "acrylictable1.jpg",
  "cabinet1.jpg",
];

export default function Furniture() {
  return (
    <section
      className="min-h-screen flex"
      style={{ backgroundColor: "#D0DBCC" }}
    >
      {/* 좌측 여백 */}
      <div className="flex-[3]" />

      {/* 우측 사진 세로 배열 */}
      <div className="flex-[2] flex flex-col gap-4 pt-16 pb-16">
        {images.map((img) => (
          <div key={img} className="relative w-full h-[45vh]">
            <Image
              src={`/furniture/${img}`}
              alt={img}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
