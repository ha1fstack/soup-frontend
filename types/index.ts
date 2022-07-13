import { JSONContent } from "@tiptap/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ITag } from "lib/utils";

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

export interface IPostContentData<T> {
  id: number;
  postName: string;
  content: T;
  userName: string;
  date: string;
  link: string;
  stacks: ITag[];
  views: number;
  talk: string;
  source: string;
  fav: number;
  isfav: boolean;
  userId: null | number;
}

// individual project page
export type IPostData =
  | ({ type: "string" } & IPostContentData<string>)
  | ({
      type: "prosemirror";
    } & IPostContentData<JSONContent>);

export interface IPostPreviewContent {
  id: number;
  postName: string;
  content: string;
  userName: string;
  date: string;
  link: string;
  stacks: ITag[];
  views: number;
  talk: string;
  source: "SOUP" | "INFLEARN" | "OKKY" | "CAMPICK" | "HOLA";
  fav: number;
  isfav: boolean;
}

export type CustomNextPage = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  authorized?: boolean;
};

export type CustomAppProps = AppProps & {
  Component: CustomNextPage;
};

export type IAuthData =
  | {
      success: true;
      user_id: number;
      profileImage: string;
      userName: string;
    }
  | {
      success: false;
    };

export interface ISideBarProps {
  exact?: boolean;
  selected?: boolean;
  authorized?: boolean;
}

export interface ILoungePost {
  date: string;
  user_id: number;
  fav: number;
  lounge_id: number;
  isfav: boolean;
  picture: string;
  content: string;
  userName: string;
}

export interface IArticleData {
  title: string;
  content: JSONContent;
}

export interface IFeaturedItem {
  content: string;
  userName: string;
  id: number;
}
