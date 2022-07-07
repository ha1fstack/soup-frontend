import { css } from "@emotion/react";
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
  alignCenter?: boolean;
  gap?: string;
}>`
  ${({ alignCenter }) =>
    alignCenter &&
    css`
      align-items: center;
    `}
  ${({ gap }) =>
    gap &&
    css`
      gap: ${gap};
    `}
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
    `};
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

export const Box = Object.assign(
  styled.div<{
    variant?: keyof typeof BoxVariant;
    column?: boolean;
    responsive?: boolean;
    fullspan?: boolean;
  }>`
    width: auto;
    border-radius: 8px;
    display: flex;
    padding: 12px 12px;
    // x padding 16px to match layout side margin
    ${breakpoints.at("sm")} {
      padding-left: 16px !important;
      padding-right: 16px !important;
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
  `,
  {
    Header: styled.p`
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 8px;
      margin-left: 4px;
    `,
  }
);
