import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useMatch(href: LinkProps["href"], exact = true) {
  const router = useRouter();

  return exact
    ? router.pathname === href
    : router.pathname.startsWith(String(href));
}
