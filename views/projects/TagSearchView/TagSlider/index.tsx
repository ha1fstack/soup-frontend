import { Flex, Button } from "common/components";
import { useHorizontalScroll } from "lib/hooks/useHorizontalScroll";
import { hideScrollbar } from "lib/styles";
import { useCallback, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Slider from "./Slider";

const TagSlider = ({ toggle }: { toggle: (set?: boolean) => void }) => {
  const scrollRef = useHorizontalScroll();
  const [position, setPosition] = useState<number>(0);

  const backupHeight = position;

  // when dom loaded, measure target width and scroll
  const contentRef = useCallback(
    (node) => {
      if (node !== null) {
        setPosition(node.offsetWidth);
        if (scrollRef.current) scrollRef.current.scrollLeft = backupHeight;
      }
    },
    [backupHeight, scrollRef]
  );

  // event listener: on any virtual scroll
  const onScroll = useCallback(() => {
    if (scrollRef.current) {
      const scroll = scrollRef.current.scrollLeft;
      if (scroll < backupHeight || scroll >= backupHeight + position) {
        scrollRef.current.scrollTo({
          top: 0,
          left: backupHeight + (scroll % position),
          behavior: "auto",
        });
      }
    }
  }, [backupHeight, position, scrollRef]);

  return (
    <>
      <Flex
        ref={scrollRef}
        onScroll={onScroll}
        css={{
          marginLeft: "12px",
          marginRight: "-12px",
          overflow: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          position: "relative",
          "& > *": {
            whiteSpace: "nowrap",
          },
          display: "inline-flex",
          ":hover": {
            "*": {
              animationPlayState: "paused",
            },
          },
          ...hideScrollbar,
        }}
      >
        <Slider />
        <Slider ref={contentRef} />
        <Slider />
        <Slider />
      </Flex>
      <div css={{ position: "absolute" }}>
        <Button
          variant="primary-outlined"
          css={{
            height: "36px",
            width: "36px",
            padding: 0,
            backgroundColor: "var(--primarylight2)",
          }}
          onClick={() => toggle()}
        >
          <MdOutlineSearch css={{ fontSize: "1.8rem" }} />
        </Button>
      </div>
    </>
  );
};

export default TagSlider;
