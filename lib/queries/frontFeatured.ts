import { createHttpQuerySlice } from "lib/utils";
import { IPostPreviewContent } from "types";

type IQueryReturnType = {
  NEW: IPostPreviewContent[];
  HOT: IPostPreviewContent[];
};

type IQueryParams = void;

export const [
  frontFeaturedQueryKey,
  fetchFrontFeatured,
  frontFeaturedQueryContext,
] = createHttpQuerySlice<IQueryParams, IQueryReturnType>(() => [
  "/front/featured",
]);
