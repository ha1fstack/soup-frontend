import { keyframes } from "@emotion/react";
import { Button } from "common/atoms";
import { useClientRender } from "lib/hooks";
import { TagList, getDisplayTag } from "lib/utils";
import React, { useMemo } from "react";
import useFilter from "../../useFilter";

const MarqueeAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

const Slider = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { addFilter } = useFilter();
  const shuffle = useMemo(
    () => TagList.slice().sort(() => Math.random() - 0.5),
    []
  );

  if (!useClientRender()) return null;
  return (
    <span
      css={{
        display: "inline-flex",
        animation: `${MarqueeAnimation} ${
          TagList.length * 15
        }s linear infinite`,
        "& > *": { marginRight: "12px" },
        height: "36px",
      }}
      ref={ref}
    >
      {shuffle.map((stack) => (
        <Button
          onClick={() => addFilter(stack)}
          key={stack}
          css={{
            height: "36px",
            overflow: "hidden",
            flex: "0 0 auto",
            backgroundColor: "var(--positive1)",
            border: 0,
          }}
        >
          {getDisplayTag(stack)}
        </Button>
      ))}
    </span>
  );
});
Slider.displayName = "Slider";

export default Slider;
