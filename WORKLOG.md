# EEL 포트폴리오 작업 기록

## 프로젝트 정보
- **위치**: `/Users/mi/portfolio/`
- **스택**: Next.js 16.2.2 (App Router) + Tailwind CSS + TypeScript
- **배경색**: `#D0DBCC`
- **폰트**: Archivo Black (Google Fonts)

---

## 화면 구성

### 네비게이션 (Navbar.tsx)
- 좌측 상단: 햄버거 메뉴 (클릭 시 X로 변환) + **EEL** 텍스트
- 우측 상단: 장바구니 아이콘
- EEL 클릭 → 첫 화면(home)으로 이동
- 메뉴 오버레이 (배경색 동일): furniture / objet / drawing / say hello
- 각 메뉴 클릭 시 해당 섹션만 표시 (SPA 방식)

### 첫 화면 (Hero.tsx)
- 좌측 1/5: 텍스트 영역
  - Material-driven studio based in Seoul
  - Built from fragments of stillness, Objects that carry a sense of survival and rest.
  - Not fixed, but enduring — A structure that remains, even quietly.
  - Info: plumcatmango@gmail.com
  - Instagram @eel.eel.eel.eel
- 중앙 2/5: mimi1.jpg (scale 1.26, transformOrigin: bottom center — 테이블 높이 맞춤용)
- 우측 2/5: objet22.jpg (object-cover object-bottom)

### Drawing 섹션 (Drawing.tsx)
- 좌측 1/5: 여백
- 우측 4/5: 드로잉 사진 8장 세로 배열 (h-64)
  - draw.jpg, draw1.jpg ~ draw7.jpg
  - `/public/drawing/` 폴더에 저장

### Say Hello 섹션 (Contact.tsx)
- 중앙 정렬, 상단 배치 (pt-32)
- **MINSOO CHAE** (text-6xl, 굵게)
- 010 5229 7728
- plumcatmango@gmail.com
- 인스타그램 로고 + eel.eel.eel.eel (링크)

---

## 개인 정보
- 이름: 채민수 (MINSOO CHAE)
- 이메일: plumcatmango@gmail.com
- GitHub: github.com/eeleeleeleel
- Instagram: eel.eel.eel.eel

---

## 주요 파일
```
portfolio/
├── app/
│   ├── layout.tsx       — Archivo Black 폰트, 배경 설정
│   ├── page.tsx         — SPA 상태 관리 (home/drawing/contact 등)
│   └── globals.css      — 전역 스타일
├── components/
│   ├── Navbar.tsx       — 햄버거 메뉴 + EEL + 장바구니
│   ├── Hero.tsx         — 첫 화면 (텍스트 + 사진 2장)
│   ├── Drawing.tsx      — 드로잉 사진 세로 나열
│   └── Contact.tsx      — Say Hello 연락처 섹션
└── public/
    ├── mimi1.jpg        — 첫 화면 좌측 사진
    ├── objet22.jpg      — 첫 화면 우측 사진
    └── drawing/         — 드로잉 사진 8장
```

---

## 미완성 섹션
- **furniture**: 메뉴에 있으나 페이지 미구현
- **objet**: 메뉴에 있으나 페이지 미구현

---

## 배포 예정
- Vercel 사용 예정 (`npx vercel`)
