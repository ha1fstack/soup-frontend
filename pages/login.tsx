import { useLayoutEffect } from "react";

import { loginPopupState } from "lib/states";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { useAuth, useClientRender } from "lib/hooks";

import { NextPage } from "next";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  useHydrateAtoms([[loginPopupState, true] as any]);
  const [loginPopup, setLoginPopup] = useAtom(loginPopupState);
  const isClientRender = useClientRender();

  const router = useRouter();
  const auth = useAuth();

  const { redirect } = router.query as {
    redirect?: string;
  };

  useLayoutEffect(() => {
    setLoginPopup(true);
    return () => setLoginPopup(false);
  }, [setLoginPopup]);

  useLayoutEffect(() => {
    if (isClientRender) {
      if (auth.success) router.push(redirect || "/");
      else if (!loginPopup) router.push("/");
    }
  }, [auth.success, isClientRender, loginPopup, redirect, router]);

  return <></>;
};

export default Login;
