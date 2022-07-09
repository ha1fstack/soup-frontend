import { createHttpQuerySlice } from "lib/utils";
import { IPostData } from "types";

type IQueryReturnType = IPostData;

type IQueryParams = { id: string };

export const [projectQueryKey, fetchProject, projectQueryContext] =
  createHttpQuerySlice<IQueryParams, IQueryReturnType>(({ id }) => [
    `/projects/${id}`,
  ]);
