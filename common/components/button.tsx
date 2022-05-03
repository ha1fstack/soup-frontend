import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { LabelVariant } from "./Label";

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

export const Button = styled.button<{
  variant?: keyof ReturnType<typeof LabelVariant>;
  size?: keyof ReturnType<typeof SizeVariant>;
  icon?: boolean;
}>`
  line-height: normal;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  ${({ icon }) =>
    icon ||
    css`
      padding: 0;
      svg {
        margin-left: -0.1em;
        margin-right: 0.3em;
      }
    `}
  ${({ size }) =>
    size
      ? SizeVariant()[size]
      : css`
          height: 36px;
          padding: 0px 12px;
          font-size: 14px;
          border-radius: 8px;
        `}
  ${({ variant, theme }) =>
    variant
      ? LabelVariant(theme)[variant]
      : css`
          border: 1px solid var(--outline);
          background-color: var(--background);
        `}
  &:hover {
    filter: brightness(0.98);
  }
  &:disabled {
    filter: opacity(0.5);
  }
`;
