export default function Contact() {
  return (
    <section
      className="min-h-screen pt-28 pb-20 px-8 md:px-16 flex flex-col justify-between"
      style={{ backgroundColor: "#EAE8E0" }}
    >
      <div className="max-w-2xl">
        {/* 헤딩 */}
        <div className="mb-16">
          <p
            className="text-sm tracking-[0.4em] lowercase mb-3"
            style={{ color: "#7A8C6E" }}
          >
            order & inquiry
          </p>
          <h2
            className="text-4xl md:text-5xl tracking-[0.1em] lowercase"
            style={{ color: "#2A2A20", fontWeight: 300 }}
          >
            contact
          </h2>
        </div>

        {/* 안내 문구 */}
        <p
          className="text-lg md:text-xl leading-relaxed mb-14"
          style={{ color: "#2A2A20", opacity: 0.75, lineHeight: "1.9", fontStyle: "italic" }}
        >
          구매 문의, 커스텀 주문, 콜라보레이션 제안 —<br />
          편하게 연락해 주세요.
        </p>

        {/* 연락처 링크 */}
        <div className="flex flex-col gap-8">
          {/* 인스타그램 */}
          <a
            href="https://instagram.com/eel_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 group"
            style={{ color: "#2A2A20" }}
          >
            <span
              className="text-sm tracking-[0.3em] lowercase w-28 shrink-0"
              style={{ color: "#7A8C6E" }}
            >
              instagram
            </span>
            <span
              className="text-lg md:text-xl transition-opacity duration-200 group-hover:opacity-50"
              style={{ fontWeight: 300 }}
            >
              @eel_studio
            </span>
          </a>

          {/* 이메일 */}
          <a
            href="mailto:hello@eel-studio.kr"
            className="flex items-center gap-5 group"
            style={{ color: "#2A2A20" }}
          >
            <span
              className="text-sm tracking-[0.3em] lowercase w-28 shrink-0"
              style={{ color: "#7A8C6E" }}
            >
              email
            </span>
            <span
              className="text-lg md:text-xl transition-opacity duration-200 group-hover:opacity-50"
              style={{ fontWeight: 300 }}
            >
              hello@eel-studio.kr
            </span>
          </a>
        </div>

        <div
          className="mt-14 h-[1px] w-12"
          style={{ backgroundColor: "#7A8C6E" }}
        />
      </div>

      {/* 푸터 */}
      <p
        className="text-xs tracking-[0.3em] lowercase mt-16"
        style={{ color: "#2A2A20", opacity: 0.35 }}
      >
        eel studio © 2024
      </p>
    </section>
  );
}
