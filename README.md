# 블루하베스트 디지털 명함 (4인용)

QR을 찍으면 열리는 모바일 명함 페이지입니다.
**디자인은 공유, 각자 자기 링크만 수정**하는 구조예요.

```
card/
├── index.html       ← 팀 전체 목록 페이지 (선택)
├── card.css         ← 공유 디자인 (담당자만 수정)
├── card.js          ← 공유 로직 (수정 불필요)
├── assets/          ← 제품소개서/브로슈어 PDF, 사진 보관
├── chiwook/
│   ├── index.html   ← 모두 동일 (건드리지 않음)
│   └── profile.js   ← ⭐ 전치욱 님이 수정하는 파일
├── member2/ (profile.js만 수정)
├── member3/
└── member4/
```

## 1) 각자 수정하는 법 (코딩 X)
자기 폴더의 `profile.js`만 엽니다. 따옴표 `" "` 안의 글자만 본인 것으로 바꾸면 끝.
안 쓰는 메뉴는 그 줄 앞에 `//` 를 붙이거나 줄을 지우면 버튼이 사라집니다.

- 전화: `type:"phone"`  → 번호만
- 이메일: `type:"email"` → 주소만
- 카톡/홈페이지/인스타/스레드/유튜브: `type` 그대로, `value`에 링크 주소
- 제품소개서/브로슈어: PDF를 `assets/`에 올리고 `value: "../assets/파일이름.pdf"`
- 사진: `assets/`에 올리고 `photo:` 줄의 `//` 를 지움

## 2) 무료 배포 (둘 중 택1)

### A. Cloudflare Pages (추천 · 커스텀 도메인 쉬움)
1. github.com 에 이 `card` 폴더를 새 저장소로 업로드
2. dash.cloudflare.com → Workers & Pages → Pages → 깃허브 연결 → 저장소 선택 → 배포
3. 빌드 설정: 프레임워크 없음(None), 출력 디렉토리 비움 → 정적 그대로 게시
4. Custom domains 에서 `card.회사도메인.com` 연결 (회사 도메인 DNS에 CNAME 추가)

### B. GitHub Pages
1. 저장소 업로드 → Settings → Pages → Branch: main / 루트 선택 → Save
2. `이름.github.io/저장소명/chiwook/` 로 접속됨
3. 커스텀 도메인은 Settings → Pages → Custom domain 에 입력 + DNS CNAME

## 3) QR 코드
각자의 최종 주소(예: `https://card.회사도메인.com/chiwook/`)를
무료 QR 생성기(qr-code-generator.com 등)에 넣고 만들면 됩니다.
**주소가 고정이라 링크 내용을 바꿔도 명함을 다시 안 찍어도 됩니다.**

## 4) 브랜드 색/폰트 변경
`card.css` 맨 위 `:root` 의 `--accent`(포인트색), `--paper`(배경),
`--font-display`(이름 폰트)만 바꾸면 4명 카드에 동시 적용됩니다.
