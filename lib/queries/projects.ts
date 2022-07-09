import { createHttpQuerySlice, ITag } from "lib/utils";
import { IPageable, IPostPreviewContent } from "types";

type IQueryReturnType = IPageable<IPostPreviewContent[]>;

type IQueryParams = { page: number; stacks?: ITag[] };

export const [projectsQueryKey, fetchProjects, projectsQueryContext] =
  createHttpQuerySlice<IQueryParams, IQueryReturnType>(
    ({ page = 1, stacks }) => [
      "/projects",
      {
        params: {
          page,
          stacks: stacks?.join(","),
        },
      },
    ]
  );
