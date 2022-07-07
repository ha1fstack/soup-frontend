import { http } from "lib/services";
import { ITag } from "lib/utils";
import {
  IAuthData,
  ILoungePost,
  IPageable,
  IPostPreviewContent,
  IPostData,
} from "types";

export const fetchFrontProjects = async () => {
  const res = await http.get<{
    SOUP: IPostPreviewContent[];
    OKKY: IPostPreviewContent[];
    INFLEARN: IPostPreviewContent[];
    CAMPICK: IPostPreviewContent[];
    HOLA: IPostPreviewContent[];
  }>("/front/projects");
  return res.data;
};

export const fetchFrontFeatured = async () => {
  const res = await http.get<{
    NEW: IPostPreviewContent[];
    HOT: IPostPreviewContent[];
  }>("/front/featured");
  return res.data;
};

export const fetchLounge = async () => {
  const res = await http.get<ILoungePost[]>("/lounge");
  return res.data;
};

export const fetchProject = async (id: string) => {
  const res = await http.get<IPostData>(`/projects/${id}`);
  return res.data;
};

export const fetchProjects = async (page = 1, stacks?: ITag[]) => {
  const res = await http.get<IPageable<IPostPreviewContent[]>>(`/projects`, {
    params: {
      page,
      stacks: stacks?.join(","),
    },
  });
  return res.data;
};
