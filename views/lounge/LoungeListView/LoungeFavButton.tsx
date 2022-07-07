import { Button } from "common/atoms";
import React from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const LoungeFavButton = ({
  count,
  checked,
  ...rest
}: React.ComponentProps<typeof Button> & {
  count: number;
  checked: boolean;
}) => (
  <Button
    variant="white"
    css={{
      padding: "0px 6px 0px 8px",
      height: "24px",
      gap: "4px",
      alignItems: "center",
      color: "var(--negative2)",
    }}
    {...rest}
  >
    <span css={{ fontSize: "1.2rem" }}>{count}</span>
    {React.createElement(
      checked ? MdOutlineFavorite : MdOutlineFavoriteBorder,
      {
        style: { fontSize: "1.4rem", margin: 0 },
      }
    )}
  </Button>
);

export default LoungeFavButton;
