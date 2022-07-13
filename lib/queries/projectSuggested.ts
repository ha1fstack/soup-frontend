import { createHttpQuerySlice } from "lib/utils";
import { IPostPreviewContent } from "types";

type IResponseData = {
  id: number;
  title: string;
  userName: string;
};

type IQueryReturnType = IResponseData[];

export type IProjectSuggestedQueryParams = { id: string };

export const [
  projectSuggestedQueryKey,
  fetchProjectSuggested,
  projectSuggestedQueryContext,
] = createHttpQuerySlice<IProjectSuggestedQueryParams, IQueryReturnType>(
  ({ id }) => [`/projects/${id}/suggest`]
);
