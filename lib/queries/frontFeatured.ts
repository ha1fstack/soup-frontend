import { createHttpQuerySlice } from "lib/utils";
import { IPostPreviewContent } from "types";

type IQueryReturnType = {
  NEW: IPostPreviewContent[];
  HOT: IPostPreviewContent[];
};

type IQueryParams = [];

export const [
  frontFeaturedQueryKey,
  fetchFrontFeatured,
  frontFeaturedQueryContext,
] = createHttpQuerySlice<IQueryParams, IQueryReturnType>((...params) => [
  "/front/featured",
]);
