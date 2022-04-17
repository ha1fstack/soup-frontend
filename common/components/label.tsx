import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const LabelVariant = (theme: Theme) => ({
  primary: css`
    color: ${theme.color.positive};
    border: 0px;
    background-color: ${theme.color.primary};
  `,
  "primary-outlined": css`
    color: ${theme.color.primary};
    border: 1px solid ${theme.color.primary};
    background-color: ${theme.color.positive};
  `,
  white: css`
    border: 1px solid #e0e3e7;
    background-color: ${theme.color.positive};
  `,
  transparent: css`
    border: 0px;
    background-color: transparent;
  `,
});

const SizeVariant = () => ({
  smaller: css`
    min-height: 22px;
    padding: 0px 6px;
    font-size: 11px;
    border-radius: 4px;
  `,
  small: css`
    min-height: 28px;
    padding: 0px 8px;
    font-size: 12px;
    border-radius: 6px;
  `,
});

export const Label = styled.div<{
  variant?: keyof ReturnType<typeof LabelVariant>;
  size?: keyof ReturnType<typeof SizeVariant>;
}>`
  line-height: normal;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ size }) =>
    size
      ? SizeVariant()[size]
      : css`
          height: 36px;
          padding: 0px 16px;
          border-radius: 8px;
        `}

  ${({ variant, theme }) =>
    variant
      ? LabelVariant(theme)[variant]
      : css`
          border: 1px solid #e0e3e7;
          background-color: #fafbfb;
        `}
`;
