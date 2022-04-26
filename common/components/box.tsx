import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";

const BoxVariant = (theme: Theme) => ({
  primary: css`
    border: 1px solid ${theme.color.primary};
    background: #ffeeda;
  `,
  background: css`
    border: 1px solid #dadce0;
    background: ${theme.color.background};
  `,
  transparent: css``,
});

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
  box-sizing: content-box;
  padding-left: 10vw;
  margin-left: -10vw;
  padding-right: 10vw;
  margin-right: -10vw;
  border-left: 0px;
  border-right: 0px;
`;

export const Box = styled.div<{
  variant?: keyof ReturnType<typeof BoxVariant>;
  column?: boolean;
  responsive?: boolean;
  fullspan?: boolean;
}>`
  border-radius: 8px;
  display: flex;
  padding: 12px;
  ${({ fullspan }) => fullspan && fullspanStyle}
  ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `}
  ${({ responsive, theme }) =>
    responsive &&
    css({
      [theme.breakpoints.at("sm")]: fullspanStyle,
    })}
  ${({ variant, theme }) =>
    variant
      ? BoxVariant(theme)[variant]
      : css`
          border: 1px solid #dadce0;
          background-color: ${theme.color.positive};
        `}
`;
