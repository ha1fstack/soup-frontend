import { useRouter } from "next/router";

export const NotFound = () => {
  const router = useRouter();
  router.push("/404", router.asPath, { shallow: true });
  return null;
};
