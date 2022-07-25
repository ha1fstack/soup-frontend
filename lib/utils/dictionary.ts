export const SourceDictionary = {
  INFLEARN: "인프런",
  SOUP: "스 프",
  OKKY: "OKKY",
  CAMPICK: "캠퍼스픽",
  HOLA: "Hola",
};
export const SourceList = Object.keys(SourceDictionary) as ISource[];
export type ISource = keyof typeof SourceDictionary;
