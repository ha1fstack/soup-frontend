import { createHttpQuerySlice } from "lib/utils";
import { IPostPreviewContent } from "types";

type IQueryReturnType = {
  SOUP: IPostPreviewContent[];
  OKKY: IPostPreviewContent[];
  INFLEARN: IPostPreviewContent[];
  CAMPICK: IPostPreviewContent[];
  HOLA: IPostPreviewContent[];
};

type IQueryParams = void;

export const [
  frontProjectsQueryKey,
  fetchFrontProjects,
  frontProjectsQueryContext,
] = createHttpQuerySlice<IQueryParams, IQueryReturnType>(() => [
  "/front/projects",
]);
