import { http } from "lib/services";
import { useQuery } from "react-query";
import { IAuthData } from "types";

export const fetchAuth = async (cookie?: any) => {
  const res = await http.get<IAuthData>("/auth", {
    ...(cookie && { headers: { cookie } }),
  });
  return {
    ...res.data,
  };
};

export function useAuth(data?: {
  initialData?: IAuthData;
  cookie?: any;
}): IAuthData {
  const { data: auth } = useQuery(["auth"], () => fetchAuth(data?.cookie), {
    staleTime: Infinity,
    ...(data?.initialData && { initialData: data.initialData }),
  });
  return auth || { success: false };
}
