import { createHttpQuerySlice } from "lib/utils";
import { ILoungePost } from "types";

type IQueryReturnType = ILoungePost[];

type IQueryParams = void;

export const [loungeQueryKey, fetchLounge, loungeQueryContext] =
  createHttpQuerySlice<IQueryParams, IQueryReturnType>(() => ["/lounge"]);
