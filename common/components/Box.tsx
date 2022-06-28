import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { breakpoints } from "lib/utils";

const BoxVariant = {
  primary: css`
    border: 1px solid var(--primary);
    background: var(--positive);
    color: var(--primary);
  `,
  background: css`
    border: 1px solid var(--outline);
    background: var(--background);
  `,
  transparent: css``,
};

export const Flex = styled.div<{
  column?: boolean;
  inline?: boolean;
}>`
  ${({ inline }) =>
    inline
      ? css`
          display: inline-flex;
        `
      : css`
          display: flex;
        `}
  ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `}
`;

const fullspanStyle = css`
  border-radius: 0;
  border-left: 0px;
  border-right: 0px;

  // compensate double padding
  margin-right: -36px;
  margin-left: -36px;
  ${breakpoints.at("sm")} {
    margin-right: -16px;
    margin-left: -16px;
  }
`;

export const Box = styled.div<{
  variant?: keyof typeof BoxVariant;
  column?: boolean;
  responsive?: boolean;
  fullspan?: boolean;
}>`
  border-radius: 8px;
  display: flex;
  padding: 12px 12px;
  // ???
  ${breakpoints.at("sm")} {
    padding: 12px 16px;
  }
  ${({ fullspan }) => fullspan && fullspanStyle}
  ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `}
  ${({ responsive }) =>
    responsive &&
    css({
      [breakpoints.at("sm")]: fullspanStyle,
    })}
  ${({ variant }) =>
    variant
      ? BoxVariant[variant]
      : css`
          border: 1px solid var(--outline);
          background-color: var(--positive);
        `}
`;
