import { css } from "@emotion/react";
import styled from "@emotion/styled";

const BoxVariant = {
  primary: css`
    border: 1px solid #ff8a05;
    background: #ffeeda;
  `,
  transparent: css``,
};

export const Flex = styled.div<{
  column?: boolean;
}>`
  display: flex;
  ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `}
`;

export const Box = styled.div<{
  variant?: keyof typeof BoxVariant;
  column?: boolean;
}>`
  border-radius: 8px;
  display: flex;
  padding: 12px;
  ${({ column }) =>
    column &&
    css`
      flex-direction: column;
    `}
  ${({ variant }) =>
    variant
      ? BoxVariant[variant]
      : css`
          border: 1px solid #eceff1;
          background: #fafbfb;
        `}
`;