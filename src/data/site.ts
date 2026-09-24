export type Lang = "en" | "ko";

export const SITE_OWNER = {
  en: "Yongjip Kim",
  ko: "김용집",
} as const;

export const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/yongjip/",
  github: "https://github.com/yongjip",
};

export const SHARED_UI_COPY = {
  en: {
    nav: { label: "Primary navigation", home: "Home", work: "Work", methods: "Methods" },
    profilesLabel: "Profiles",
    language: { label: "Language", en: "EN", ko: "KO" },
    archiveEyebrows: { work: "Work", methods: "Methods" },
    archiveCtas: { work: "Browse the full work archive", methods: "Browse all methods" },
  },
  ko: {
    nav: { label: "주요 메뉴", home: "홈", work: "작업", methods: "방법론" },
    profilesLabel: "프로필",
    language: { label: "언어 선택", en: "EN", ko: "KO" },
    archiveEyebrows: { work: "작업", methods: "방법론" },
    archiveCtas: { work: "전체 작업 보기", methods: "전체 방법론 보기" },
  },
} as const;

export const SITE_FOOTER = {
  en: "A bilingual portfolio of data systems, independent games and software, and practical methods.",
  ko: "데이터 시스템, 독립 게임·소프트웨어, 실무 방법론을 한국어와 영어로 정리한 포트폴리오입니다.",
} as const;

export const DETAIL_BACK_LINKS = {
  en: {
    work: "Back to all work",
    method: "Back to all methods",
  },
  ko: {
    work: "전체 작업으로 돌아가기",
    method: "전체 방법론으로 돌아가기",
  },
} as const;

export const METHOD_LIST_COPY = {
  en: {
    kicker: "Method note",
    planningUsePrefix: "Planning use",
  },
  ko: {
    kicker: "방법론 노트",
    planningUsePrefix: "활용",
  },
} as const;

export const ARTICLE_DATE_COPY = {
  en: {
    published: "Published",
    updated: "Updated",
  },
  ko: {
    published: "게시일",
    updated: "수정일",
  },
} as const;

export const HOME_COPY = {
  en: {
    eyebrow: "Director, Data Platform at Techtaka",
    title: "I build simple data systems for real operations work.",
    description:
      "Data platforms, analytics workflows, and AI-assisted internal tools for teams that need usable systems, not abstract demos.",
    note: "I prefer simple systems that are easy to explain, maintain, and improve.",
    featuredHeading: "Featured work",
    experienceHeading: "Experience",
    methodsHeading: "Methods",
    methodsIntro:
      "Short notes on planning and operational methods behind the case studies.",
    independentLabel: "Independent work",
    independentHeading: "Games and software at Oddfini",
    independentIntro:
      "I run Oddfini, an independent game and software business, alongside my data platform work. Its public projects include TERATORN, Whir, Codex Control, and mergetrain. The Oddfini site has current availability and support details.",
    independentCta: "Explore Oddfini products",
    independentHref: "https://oddfini.com/products/",
    contactLabel: "Contact via LinkedIn",
    footer: SITE_FOOTER.en,
  },
  ko: {
    eyebrow: "테크타카 Director, Data Platform",
    title: "실제 운영 문제를 위한 단순한 데이터 시스템을 만듭니다.",
    description:
      "데이터 플랫폼, 분석 워크플로우, AI 기반 내부 도구를 실제 운영에 맞는 형태로 구축합니다.",
    note: "설명하기 쉽고, 유지하기 쉽고, 개선하기 쉬운 단순한 시스템을 선호합니다.",
    featuredHeading: "대표 작업",
    experienceHeading: "경력",
    methodsHeading: "방법론",
    methodsIntro: "케이스 스터디를 뒷받침하는 짧은 계획·운영 노트입니다.",
    independentLabel: "독립 작업",
    independentHeading: "Oddfini에서 만드는 게임과 소프트웨어",
    independentIntro:
      "데이터 플랫폼 업무와 함께 독립 게임·소프트웨어 사업 Oddfini를 운영합니다. 공개된 작업에는 TERATORN, Whir, Codex Control, mergetrain이 있습니다. 최신 배포 상태와 지원 정보는 Oddfini 사이트에서 확인할 수 있습니다.",
    independentCta: "Oddfini 제품 보기",
    independentHref: "https://oddfini.com/ko/products/",
    contactLabel: "LinkedIn으로 연락하기",
    footer: SITE_FOOTER.ko,
  },
} as const;

export const EXPERIENCE_ITEMS = {
  en: [
    {
      title: "Techtaka",
      role: "Director, Data Platform",
      paragraphs: [
        "Built and operated a lake-based data platform in a 2-person team while supporting analytics and internal systems, then extended it into practical AI-assisted workflows including Text-to-SQL.",
      ],
    },
    {
      title: "Coupang",
      role: "Business Intelligence, PB Fresh",
      paragraphs: [
        "Led business intelligence for inventory, operations, and planning in PB Fresh, building pipelines and planning logic that reduced stranded inventory and improved instock.",
      ],
    },
    {
      title: "Earlier foundation",
      role: "Comscore, Wharton",
      paragraphs: [
        "Started in analytics and data tooling roles focused on large-scale processing, data quality, automation, and applied analytical research.",
      ],
    },
  ],
  ko: [
    {
      title: "테크타카",
      role: "Director, Data Platform",
      paragraphs: [
        "2인 팀에서 데이터 레이크 기반 플랫폼을 구축·운영하며 분석과 내부 시스템 개발을 함께 맡았고, 이후 Text-to-SQL을 포함한 실용적인 AI 기반 워크플로우로 확장했습니다.",
      ],
    },
    {
      title: "쿠팡",
      role: "Business Intelligence, PB Fresh",
      paragraphs: [
        "PB Fresh의 business intelligence를 맡아 재고·운영·계획 업무를 지원했고, 데이터 파이프라인과 계획 로직을 구축해 stranded inventory를 줄이고 instock을 개선했습니다.",
      ],
    },
    {
      title: "초기 기반",
      role: "Comscore, Wharton",
      paragraphs: [
        "대용량 데이터 처리, 데이터 품질, 자동화, 응용 분석 연구를 다루며 analytics와 data engineering의 기반을 쌓았습니다.",
      ],
    },
  ],
} as const;
