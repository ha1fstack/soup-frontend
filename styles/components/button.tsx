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

export const Button = styled.button<{
  variant?: keyof typeof ButtonVariant;
}>`
  cursor: pointer;
  height: 36px;
  padding: 0px 16px;
  border-radius: 8px;
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
