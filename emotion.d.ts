import "@emotion/react";
import { Breakpoints } from "utils/createBreakpoints";

declare module "@emotion/react" {
  export interface Theme {
    breakpoints: Breakpoints;
    color: {
      primary: string;
      positive: string;
      background: string;
      negative: string;
    };
  }
}
