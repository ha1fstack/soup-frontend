import { createHttpQuerySlice } from "lib/utils";
import { IFeaturedItem } from "types";

type IResponseData = {
  title: string;
  userName: string;
  id: number;
}

type IQueryReturnType = {
  RECOMMEND: IResponseData[];
  HOT: IResponseData[];
};

type IQueryParams = void;

export const [
  projectsFeaturedQueryKey,
  fetchProjectsFeatured,
  projectsFeaturedQueryContext,
] = createHttpQuerySlice<IQueryParams, IQueryReturnType>(() => [
  "/projects/featured",
]);
