import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ButtonVariant = {
  primary: css`
    color: white;
    border: 0px;
    background-color: #ff8a05;
  `,
  "primary-outlined": css`
    color: #ff8a05;
    border: 1px solid #ff8a05;
    background-color: white;
  `,
  white: css`
    border: 1px solid #e0e3e7;
    background-color: white;
  `,
};

const SizeVariant = {
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
};

export const Button = styled.button<{
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof SizeVariant;
}>`
  line-height: normal;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  ${({ size }) =>
    size
      ? SizeVariant[size]
      : css`
          height: 36px;
          padding: 0px 12px;
          font-size: 14px;
          border-radius: 8px;
        `}

  ${({ variant }) =>
    variant
      ? ButtonVariant[variant]
      : css`
          border: 1px solid #e0e3e7;
          background-color: #fafbfb;
        `}
  &:hover {
    filter: brightness(0.98);
  }
`;
