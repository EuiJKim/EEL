export default function About() {
  const materials = [
    { name: "resin", desc: "투명하고 깊이 있는 레진을 주재료로" },
    { name: "wood", desc: "원목의 결과 온기를 함께" },
    { name: "metal", desc: "철과 황동으로 구조와 디테일을" },
    { name: "stone", desc: "돌과 모래로 자연의 질감을" },
  ];

  return (
    <section
      className="min-h-screen pt-28 pb-20 px-8 md:px-16"
      style={{ backgroundColor: "#EAE8E0" }}
    >
      <div className="max-w-5xl">
        {/* 헤딩 */}
        <div className="mb-16">
          <p
            className="text-sm tracking-[0.4em] lowercase mb-3"
            style={{ color: "#7A8C6E" }}
          >
            studio
          </p>
          <h2
            className="text-4xl md:text-5xl tracking-[0.1em] lowercase"
            style={{ color: "#2A2A20", fontWeight: 300 }}
          >
            about
          </h2>
        </div>

        {/* 2열 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* 스토리 */}
          <div>
            <p
              className="text-xl md:text-2xl leading-relaxed mb-8"
              style={{ color: "#2A2A20", fontWeight: 300, lineHeight: "1.9" }}
            >
              eel은 소재가 가진 고유한 아름다움을 최대한 살리는
              핸드크래프트 스튜디오입니다.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "#2A2A20", opacity: 0.7, lineHeight: "2", fontStyle: "italic" }}
            >
              레진의 흐름과 투명함, 나무의 결, 금속의 단단함 —
              각각의 소재가 만나 새로운 형태를 이루는 순간에서
              작업의 영감을 얻습니다. 하나하나 손으로 만들어지는
              eel의 작품은 모두 세상에 단 하나뿐입니다.
            </p>

            <div
              className="mt-10 h-[1px] w-12"
              style={{ backgroundColor: "#7A8C6E" }}
            />
          </div>

          {/* 소재 리스트 */}
          <div>
            <p
              className="text-sm tracking-[0.3em] lowercase mb-8"
              style={{ color: "#7A8C6E" }}
            >
              materials
            </p>
            <ul className="flex flex-col gap-6">
              {materials.map(({ name, desc }) => (
                <li key={name} className="flex gap-6 items-start">
                  <span
                    className="text-sm tracking-[0.2em] lowercase w-16 shrink-0 mt-1"
                    style={{ color: "#7A8C6E" }}
                  >
                    {name}
                  </span>
                  <span
                    className="text-base leading-relaxed"
                    style={{ color: "#2A2A20", opacity: 0.75 }}
                  >
                    {desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
