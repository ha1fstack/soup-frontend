import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export const NotFound = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/404", router.asPath, { shallow: true });
  }, [router]);
  return <></>;
};
