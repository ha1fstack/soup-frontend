import { http } from "common/services";
import { ITag } from "lib/utils";
import {
  IAuthData,
  ILoungePost,
  IPageable,
  IPostPreviewContent,
  IPostData,
} from "types";

export const fetchAuth = async (_http = http, cookie?: any) => {
  const res = await _http.get<IAuthData>("/auth", {
    ...(cookie && { headers: { cookie } }),
  });
  return res.data;
};

export const fetchFrontProjects = async (_http = http) => {
  const res = await _http.get<{
    SOUP: IPostPreviewContent[];
    OKKY: IPostPreviewContent[];
    INFLEARN: IPostPreviewContent[];
    CAMPICK: IPostPreviewContent[];
    HOLA: IPostPreviewContent[];
  }>("/front/projects");
  return res.data;
};

export const fetchFrontFeatured = async (_http = http) => {
  const res = await _http.get<{
    NEW: IPostPreviewContent[];
    HOT: IPostPreviewContent[];
  }>("/front/featured");
  return res.data;
};

export const fetchLounge = async (_http = http) => {
  const res = await _http.get<ILoungePost[]>("/lounge");
  return res.data;
};

export const fetchProject = async (_http = http, id: string) => {
  const res = await _http.get<IPostData>(`/projects/${id}`);
  return res.data;
};

export const fetchProjects = async (
  _http = http,
  page = 1,
  stacks?: ITag[]
) => {
  const res = await _http.get<IPageable<IPostPreviewContent[]>>(`/projects`, {
    params: {
      page,
      stacks: stacks?.join(","),
    },
  });
  return res.data;
};
