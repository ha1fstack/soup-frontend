import { css } from "@emotion/react";

export const tiptapStyleConfig = css({
  ":focus": {
    outline: "none",
  },
  "& > *": {
    whiteSpace: "break-spaces",
  },
  lineHeight: 1.5,
  p: {
    marginBlockEnd: "6px",
  },
  h1: {
    fontSize: "2.4rem",
    fontWeight: "600",
    lineHeight: 2,
  },
  h2: {
    fontSize: "1.8rem",
    fontWeight: "600",
    lineHeight: 2,
  },
  pre: {
    padding: "8px",
    backgroundColor: "var(--background)",
    border: "1px solid var(--outline)",
    marginBlockStart: "12px",
    marginBlockEnd: "12px",
    borderRadius: "4px",
  },
  iframe: {
    marginBlockStart: "18px",
    marginBlockEnd: "18px",
    borderRadius: "8px",
    backgroundColor: "var(--outline)",
    width: "100%",
    maxWidth: "560px",
    height: "50vw",
    maxHeight: "315px",
  },
  img: {
    marginBlockStart: "18px",
    marginBlockEnd: "18px",
    borderRadius: "8px",
    maxHeight: "540px",
  },
  a: {
    textDecoration: "underline",
    color: "var(--primary)",
  },
});
