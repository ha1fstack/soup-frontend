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

export type IQueryParams = [string, AxiosRequestConfig?, AxiosRequestConfig?];

export const httpQueryKey = (...[scope, dependency]: IQueryParams) => {
  if (!dependency) return [scope] as const;
  const cleanDependency = cleanse(dependency);
  return [scope, cleanDependency] as const;
};

export const httpQueryFunction = <T = any>(
  ...[scope, dependency, config]: IQueryParams
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

export const createHttpQuerySlice = <T extends Record<string, any> | void, U>(
  queryContextParams: (params: T) => IQueryParams
) => {
  const queryKey = (params: T) => httpQueryKey(...queryContextParams(params));

  const queryFunction = (params: T, injectedConfig?: any) => {
    const [scope, dependency, config] = queryContextParams(params);
    return httpQueryFunction<U>(
      scope,
      dependency,
      Object.assign(config || {}, injectedConfig)
    );
  };

  const queryContext = (params: T, injectedConfig?: IQueryParams[2]) =>
    [queryKey(params), queryFunction(params, injectedConfig)] as const;
  return [queryKey, queryFunction, queryContext] as const;
};
