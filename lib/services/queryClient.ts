import { isDevEnv } from "lib/utils";
import { QueryClient } from "react-query";

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: 5000,
        ...(isDevEnv && { retry: 0 }),
      },
    },
  });
};
