export type ITagCategory =
  | "popular"
  | "field"
  | "language"
  | "frontend"
  | "backend"
  | "mobile"
  | "etc"
  | "all";

const _tagDictionary = {
  react: { displayName: "React", color: "gray" },
  angular: { displayName: "Angular", color: "gray" },
  vue: { displayName: "Vue", color: "gray" },
  svelte: { displayName: "Svelte", color: "gray" },
  spring: { displayName: "Spring", color: "gray" },
  nodejs: { displayName: "Node.js", color: "gray" },
  go: { displayName: "Go", color: "gray" },
  django: { displayName: "Django", color: "gray" },
  nestjs: { displayName: "NestJS", color: "gray" },
  express: { displayName: "Express", color: "gray" },
  graphql: { displayName: "GraphQL", color: "gray" },
  sql: { displayName: "SQL", color: "gray" },
  mongodb: { displayName: "MongoDB", color: "gray" },
  firebase: { displayName: "FireBase", color: "gray" },
  react_native: { displayName: "React Native", color: "gray" },

  aws: { displayName: "AWS", color: "gray" },
  docker: { displayName: "Docker", color: "gray" },
  kubernetes: { displayName: "Kubernetes", color: "gray" },
  git: { displayName: "Git", color: "gray" },

  typescript: { displayName: "Typescript", color: "gray" },
  javascript: { displayName: "Javascript", color: "gray" },
  python: { displayName: "Python", color: "gray" },
  java: { displayName: "Java", color: "gray" },
  kotlin: { displayName: "Kotlin", color: "gray" },
  c_cpp: { displayName: "C/C++", color: "gray" },
  csharp: { displayName: "C#", color: "gray" },
  swift: { displayName: "Swift", color: "gray" },
  dart: { displayName: "Dart", color: "gray" },

  study: { displayName: "스터디", color: "gray" },
  project: { displayName: "프로젝트", color: "gray" },
  planning: { displayName: "기획", color: "gray" },
  service: { displayName: "서비스", color: "gray" },
  code_interview: { displayName: "코테", color: "gray" },
  frontend: { displayName: "프론트엔드", color: "gray" },
  backend: { displayName: "백엔드", color: "gray" },
  mobile: { displayName: "모바일", color: "gray" },
  ios: { displayName: "iOS", color: "gray" },
  android: { displayName: "Android", color: "gray" },
  ui_ux: { displayName: "UI/UX", color: "gray" },
  ai_ml: { displayName: "AI/머신러닝", color: "gray" },
  game: { displayName: "게임", color: "gray" },
  blockchain: { displayName: "블록체인", color: "gray" },
};

export const TagDictionary: Readonly<
  Record<
    keyof typeof _tagDictionary,
    {
      displayName: string;
      color: string;
    }
  >
> = _tagDictionary;

export type ITag = Readonly<keyof typeof TagDictionary>;

export const TagList: ITag[] = Object.keys(TagDictionary) as ITag[];

export const getDisplayTag = (stack: ITag) => {
  return TagDictionary[stack]?.displayName || stack;
};

export const TagGroup: Readonly<
  {
    displayName: string;
    key: ITagCategory;
    items: ITag[];
  }[]
> = [
  {
    displayName: "인기",
    key: "popular",
    items: [
      "react",
      "angular",
      "vue",
      "spring",
      "python",
      "nodejs",
      "java",
      "typescript",
      "javascript",
    ],
  },
  {
    displayName: "분야",
    key: "field",
    items: [
      "study",
      "project",
      "planning",
      "service",
      "code_interview",
      "frontend",
      "backend",
      "mobile",
      "ui_ux",
      "ai_ml",
      "game",
      "blockchain",
    ],
  },
  {
    displayName: "언어",
    key: "language",
    items: [
      "javascript",
      "typescript",
      "python",
      "java",
      "kotlin",
      "c_cpp",
      "csharp",
      "swift",
      "dart",
    ],
  },
  {
    displayName: "프론트엔드",
    key: "frontend",
    items: [
      "frontend",
      "javascript",
      "typescript",
      "react",
      "vue",
      "angular",
      "svelte",
    ],
  },
  {
    displayName: "백엔드",
    key: "backend",
    items: [
      "backend",
      "java",
      "nodejs",
      "go",
      "python",
      "spring",
      "django",
      "nestjs",
      "express",
      "graphql",
      "sql",
      "mongodb",
      "firebase",
    ],
  },
  {
    displayName: "모바일",
    key: "mobile",
    items: [
      "mobile",
      "ios",
      "android",
      "java",
      "kotlin",
      "swift",
      "dart",
      "react_native",
    ],
  },
  {
    displayName: "기타",
    key: "etc",
    items: ["aws", "kubernetes", "docker", "git"],
  },
  {
    displayName: "전체",
    key: "all",
    items: TagList,
  },
];
