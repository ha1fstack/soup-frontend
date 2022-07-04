import { atom, useAtom } from "jotai";
import { ITag, TagList } from "lib/utils";
import { useRouter } from "next/router";
import { useCallback, useLayoutEffect } from "react";

const filterState = atom<ITag[]>([]);

function isValidTag(arg: any): arg is ITag {
  return TagList.includes(arg);
}

const useFilter = () => {
  const [filter, setFilter] = useAtom(filterState);
  const resetFilter = useCallback(() => setFilter([]), [setFilter]);
  const router = useRouter();

  const addFilter = useCallback(
    (x: string, shallow?: boolean) => {
      if (!isValidTag(x)) return;
      const result = [...filter, x];
      if (filter.length >= 3 || filter.includes(x)) return;
      setFilter(result);
      router.push(
        {
          query: {
            ...router.query,
            page: 1,
            stacks: result.join(","),
          },
        },
        undefined,
        {
          shallow,
        }
      );
    },
    [filter, router, setFilter]
  );

  useLayoutEffect(() => {
    let stacks = router.query["stacks"];
    if (!stacks) return;
    if (Array.isArray(stacks)) stacks = stacks.join(",");
    setFilter(stacks.split(",").filter((stack) => isValidTag(stack)) as ITag[]);
  }, [router.query, setFilter]);

  const removeFilter = useCallback(
    (i, shallow?: boolean) => {
      const result = [...filter.slice(0, i), ...filter.slice(i + 1)];
      setFilter(result);
      router.push(
        {
          query: {
            ...router.query,
            page: 1,
            stacks: result,
          },
        },
        undefined,
        {
          shallow,
        }
      );
    },
    [filter, router, setFilter]
  );

  return { filter, resetFilter, addFilter, removeFilter };
};

export default useFilter;
