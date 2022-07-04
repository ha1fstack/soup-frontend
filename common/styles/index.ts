import { css } from "@emotion/react";
import { breakpoints } from "lib/utils";

export const defaultGridTemplate = css`
  display: grid;
  //prettier-ignore
  grid-template-columns: minmax(36px, 1fr) min(calc(100% - 72px), var(--container-width)) minmax(0px, calc(1140px - var(--container-width) )) minmax(36px, 1fr);
  ${breakpoints.at("sm")} {
    //prettier-ignore
    grid-template-columns: minmax(16px, 1fr) min(calc(100% - 32px), var(--container-width)) minmax(0px, calc(1140px - var(--container-width) )) minmax(16px, 1fr);
  }
`;
