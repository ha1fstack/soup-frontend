import { css } from "@emotion/react";
import { breakpoints } from "lib/utils";

export const defaultGridTemplate = css`
  //prettier-ignore
  grid-template-columns: minmax(24px, 1fr) min(calc(100% - 48px), calc(var(--container-width) - 48px)) minmax(calc(1188px - var(--container-width)), 0px) minmax(24px, 1fr);
  ${breakpoints.at("sm")} {
    //prettier-ignore
    grid-template-columns: minmax(16px, 1fr) min(calc(100% - 32px), calc(var(--container-width) - 32px)) minmax(calc(1188px - var(--container-width)), 0px) minmax(16px, 1fr);
  }
`;
