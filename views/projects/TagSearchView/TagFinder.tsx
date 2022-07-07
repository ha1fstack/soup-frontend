import { Flex, Button } from "common/atoms";
import { useHorizontalScroll } from "lib/hooks/useHorizontalScroll";
import { hideScrollbar } from "common/styles";
import { TagGroup, getDisplayTag, ITagCategory } from "lib/utils";
import { useState, useMemo } from "react";
import { MdOutlineCheck } from "react-icons/md";
import useFilter from "../useFilter";

const TagFinder = ({ toggle }: { toggle: (set?: boolean) => void }) => {
  const [currentMenu, setCurrentMenu] = useSearchMenu("popular");
  const { addFilter } = useFilter();
  const scrollRef = useHorizontalScroll();

  return (
    <Flex column css={{ flex: "1", gap: "16px", overflow: "hidden" }}>
      <Flex css={{ gap: "16px" }}>
        <Button
          variant="primary-outlined"
          css={{
            height: "36px",
            width: "36px",
            flex: "0 0 auto",
            padding: 0,
            backgroundColor: "var(--primarylight2)",
          }}
          onClick={() => toggle()}
        >
          <MdOutlineCheck css={{ fontSize: "1.8rem" }} />
        </Button>
        <Flex
          ref={scrollRef}
          css={{
            "*": {
              padding: "16px",
              height: "36px",
              alignItems: "center",
              flex: 1,
              wordBreak: "keep-all",
              whiteSpace: "nowrap",
            },
            gap: "4px",
            ...hideScrollbar,
          }}
        >
          {TagGroup.map((menu) => (
            <Button
              key={menu.key}
              onClick={() => setCurrentMenu(menu.key)}
              css={{
                backgroundColor:
                  menu.key === currentMenu.key
                    ? "var(--primarylight)"
                    : "var(--positive)",
                border: 0,
              }}
            >
              {menu.displayName}
            </Button>
          ))}
        </Flex>
      </Flex>
      <Flex css={{ flexWrap: "wrap", gap: "12px" }}>
        {currentMenu.items.map((stack, i) => (
          <Button
            onClick={() => addFilter(stack)}
            key={i}
            css={{ border: 0, backgroundColor: "var(--positive1)" }}
          >
            {getDisplayTag(stack)}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default TagFinder;

const useSearchMenu = (initial: ITagCategory) => {
  const [state, setState] = useState<ITagCategory>(initial);
  const currentMenu = useMemo(
    () => TagGroup.find((menu) => menu.key === state)!,
    [state]
  );

  return [currentMenu, setState] as const;
};
