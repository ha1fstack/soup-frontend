import { createHttpQuerySlice } from "lib/utils";
import { IPostPreviewContent } from "types";

type IQueryReturnType = {
  NEW: IPostPreviewContent[];
  HOT: IPostPreviewContent[];
};

type IQueryParams = undefined;

export const [
  frontFeaturedQueryKey,
  fetchFrontFeatured,
  frontFeaturedQueryContext,
] = createHttpQuerySlice<IQueryParams, IQueryReturnType>(() => [
  "/front/featured",
]);
