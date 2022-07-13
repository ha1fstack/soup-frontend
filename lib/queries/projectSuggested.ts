import { createHttpQuerySlice } from "lib/utils";
import { IPostPreviewContent } from "types";

type IResponseData = IPostPreviewContent[]

type IQueryReturnType = IResponseData[];

export type IProjectSuggestedQueryParams = { id: string };

export const [
  projectSuggestedQueryKey,
  fetchProjectSuggested,
  projectSuggestedQueryContext,
] = createHttpQuerySlice<IProjectSuggestedQueryParams, IQueryReturnType>(({ id }) => [
  `/projects/${id}/suggest`,
]);
