import { createHttpQuerySlice } from "lib/utils";
import { IFeaturedItem } from "types";

type IQueryReturnType = {
  RECOMMEND: IFeaturedItem[];
  HOT: IFeaturedItem[];
};

type IQueryParams = void;

export const [
  projectsFeaturedQueryKey,
  fetchProjectsFeatured,
  projectsFeaturedQueryContext,
] = createHttpQuerySlice<IQueryParams, IQueryReturnType>(() => [
  "/projects/featured",
]);
