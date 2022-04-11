import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useMatch(href: LinkProps["href"]) {
  const router = useRouter();

  return router.pathname === href;
}
