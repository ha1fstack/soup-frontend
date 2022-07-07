import { AxiosRequestConfig, AxiosResponse } from "axios";
import { http } from "lib/services";

const cleanse = (obj: any) => {
  Object.keys(obj).forEach(function (key) {
    const value = obj[key];
    const type = typeof value;
    if (type === "object") {
      cleanse(value);
      if (!Object.keys(value).length) delete obj[key];
    } else if (type === "undefined") delete obj[key];
  });
  return obj;
};

export type IHttpQueryParams = [
  string,
  AxiosRequestConfig?,
  AxiosRequestConfig?
];

export const httpQueryKey = (...[scope, dependency]: IHttpQueryParams) => {
  if (!dependency) return [scope] as const;
  const cleanDependency = cleanse(dependency);
  return [scope, cleanDependency] as const;
};

export const httpQueryFunction = <T = any>(
  ...[scope, dependency, config]: IHttpQueryParams
) => {
  const httpConfig = Object.assign(dependency || {}, config);
  return async () =>
    (
      (await http({
        url: scope,
        ...httpConfig,
      })) as AxiosResponse<T>
    ).data;
};

export const createHttpQuerySlice = <T extends Array<any>, U>(
  queryContextParams: (...params: T) => IHttpQueryParams
) => {
  const queryKey = (...params: T) =>
    httpQueryKey(...queryContextParams(...params));
  const queryFunction = (...params: T) =>
    httpQueryFunction<U>(...queryContextParams(...params));
  const queryContext = (...params: T) =>
    [queryKey(...params), queryFunction(...params)] as const;
  return [queryKey, queryFunction, queryContext] as const;
};
