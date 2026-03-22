export type Lang = "en" | "ko";

export const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/yongjip/",
  github: "https://github.com/yongjip",
};

export const HOME_COPY = {
  en: {
    eyebrow: "Director, Data Platform at Techtaka",
    title: "I use AI to turn data problems into simple, scalable systems.",
    description:
      "I build data platforms, analytics workflows, and internal systems for real business operations.",
    note: "I prefer simple systems that are easy to explain, maintain, and improve.",
    featuredHeading: "Selected case studies",
    experienceHeading: "Recent roles",
    methodsHeading: "Methods preview",
    methodsIntro:
      "Short applied notes that support the project work.",
    footer:
      "A bilingual portfolio of case studies and methods for data systems and operations work.",
  },
  ko: {
    eyebrow: "테크타카 Director, Data Platform",
    title: "AI를 활용해 데이터 문제를 단순하고 확장 가능한 시스템으로 만듭니다.",
    description:
      "실제 비즈니스 운영을 위한 데이터 플랫폼, 분석 워크플로우, 내부 시스템을 구축합니다.",
    note: "설명하기 쉽고, 유지하기 쉽고, 개선하기 쉬운 단순한 시스템을 선호합니다.",
    featuredHeading: "대표 케이스 스터디",
    experienceHeading: "최근 역할",
    methodsHeading: "Methods 미리보기",
    methodsIntro: "프로젝트를 보완하는 짧은 실무 노트입니다.",
    footer:
      "데이터 시스템과 운영 문제를 다루는 케이스 스터디와 방법론을 한글과 영어로 정리한 포트폴리오입니다.",
  },
} as const;

export const EXPERIENCE_ITEMS = {
  en: [
    {
      title: "Techtaka",
      role: "Director, Data Platform",
      paragraphs: [
        "Built and operated a data platform on top of a data lake in a 2-person team, while supporting analytics and internal systems.",
        "Used AI-assisted development to extend the platform into practical internal systems, including Text-to-SQL and other operational workflows.",
      ],
    },
    {
      title: "Coupang",
      role: "Business Intelligence, PB Fresh",
      paragraphs: [
        "Led business intelligence work around inventory, operations, and planning for PB Fresh.",
        "Built data pipelines, reporting workflows, and planning logic that reduced stranded inventory and improved instock performance.",
      ],
    },
    {
      title: "Earlier foundation",
      role: "Comscore, Wharton",
      paragraphs: [
        "Started in analytics and data tooling roles focused on large-scale data processing, data quality, automation, and applied analytical research.",
      ],
    },
  ],
  ko: [
    {
      title: "테크타카",
      role: "Director, Data Platform",
      paragraphs: [
        "데이터 레이크 위에서 데이터 플랫폼을 구축하고 운영했으며, 2인 팀 안에서 분석과 내부 시스템 개발을 함께 맡았습니다.",
        "또한 AI-assisted development를 활용해 플랫폼을 Text-to-SQL과 다른 실용적인 내부 시스템으로 확장했습니다.",
      ],
    },
    {
      title: "쿠팡",
      role: "Business Intelligence, PB Fresh",
      paragraphs: [
        "PB Fresh의 business intelligence를 리드하며 재고, 운영, 의사결정 지원 업무를 맡았습니다.",
        "데이터 파이프라인, 리포팅 워크플로우, 계획 로직을 구축해 stranded inventory를 줄이고 instock을 개선했습니다.",
      ],
    },
    {
      title: "초기 기반",
      role: "Comscore, Wharton",
      paragraphs: [
        "대용량 데이터 처리, 데이터 품질, 자동화, 응용 분석 연구를 다루며 analytics 및 data engineering 기반을 쌓았습니다.",
      ],
    },
  ],
} as const;
