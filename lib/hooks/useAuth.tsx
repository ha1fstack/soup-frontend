import { fetchAuth } from "lib/queries";
import { useQuery } from "react-query";
import { IAuthData } from "types";

export default function useAuth(data?: {
  initialData?: IAuthData;
  cookie?: any;
}): IAuthData {
  const { data: auth } = useQuery(
    "auth",
    () => fetchAuth(undefined, data?.cookie),
    {
      ...(data?.initialData && { initialData: data.initialData }),
    }
  );
  return auth || { success: false };
}
