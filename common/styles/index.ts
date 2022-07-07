import { css } from "@emotion/react";
import { breakpoints } from "lib/utils";
import { Styles } from "polished/lib/types/style";

export const defaultGridTemplate = css`
  display: grid;
  //prettier-ignore
  grid-template-columns: minmax(36px, 1fr) min(calc(100% - 72px), var(--container-width)) minmax(0px, calc(1140px - var(--container-width) )) minmax(36px, 1fr);
  ${breakpoints.at("sm")} {
    //prettier-ignore
    grid-template-columns: minmax(16px, 1fr) min(calc(100% - 32px), var(--container-width)) minmax(0px, calc(1140px - var(--container-width) )) minmax(16px, 1fr);
  }
`;

export const hideScrollbar: Styles = {
  overflow: "auto",
  msOverflowStyle: "none" /* IE and Edge */,
  scrollbarWidth: "none" /* Firefox */,
  "::-webkit-scrollbar": {
    display: "none",
  },
};

export const horizontalScrollShadow = (color: string): Styles => ({
  overflow: "auto",
  backgroundImage: `linear-gradient(to right, ${color}, ${color}), linear-gradient(to right, ${color}, ${color}), linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)), linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0))`,
  backgroundPosition: "left center, right center, left center, right center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "40px 100%, 40px 100%, 20px 100%, 20px 100%",
  /* Opera doesn't support this in the shorthand */
  backgroundAttachment: "local, local, scroll, scroll",
});
