import { JSONContent } from "@tiptap/react";
import { ITag } from "utils/tagDictionary";

export interface IPageable<T> {
  content: T;
  pageable: {
    sort: { empty: true; sorted: false; unsorted: true };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface IPost {
  content: string;
  date: string;
  end: boolean;
  id: number;
  link: string;
  postId: number;
  postName: string;
  stacks: ITag[];
  talk: string;
  userName: string;
  views: number;
  source: "SOUP" | "INFLEARN" | "OKKY" | "CAMPICK" | "HOLA";
  fav: number;
}

export interface IProjectContentData<T> {
  id: number;
  postName: string;
  content: T;
  userName: string;
  date: string;
  link: "https://okky.kr/article/1221052";
  stacks: ITag[];
  views: number;
  talk: string;
  source: string;
  fav: number;
  isfav: boolean;
  userId: null | number;
}

export type IProjectData =
  | ({ type: "string" } & IProjectContentData<string>)
  | ({
      type: "prosemirror";
    } & IProjectContentData<JSONContent>);