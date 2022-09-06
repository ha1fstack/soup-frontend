export const SourceDictionary = {
  SOUP: "스프",
  INFLEARN: "인프런",
  OKKY: "OKKY",
  CAMPICK: "캠퍼스픽",
  HOLA: "Hola",
};
export const SourceList = Object.keys(SourceDictionary) as ISource[];
export type ISource = keyof typeof SourceDictionary;
