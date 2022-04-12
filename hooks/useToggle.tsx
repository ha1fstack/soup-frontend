import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useToggle(initial = false): [boolean, () => void] {
  const [state, setState] = useState(initial);

  const toggle = () => setState((state) => !state);
  return [state, toggle];
}
