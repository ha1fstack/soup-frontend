import { css } from "@emotion/react";
import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

const LabelVariant = {
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

export const Input = styled.input<{
  variant?: keyof typeof LabelVariant;
  size?: keyof typeof SizeVariant;
}>`
  line-height: normal;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  :focus {
    outline: 2px solid #ffeeda;
  }
  ${({ size }) =>
    size
      ? SizeVariant[size]
      : css`
          height: 36px;
          padding: 0px 16px;
          border-radius: 8px;
        `}

  ${({ variant }) =>
    variant
      ? LabelVariant[variant]
      : css`
          border: 1px solid #e0e3e7;
          background-color: #ffffff;
        `}
`;

export const TextArea = styled(TextareaAutosize)<{
  variant?: keyof typeof LabelVariant;
  size?: keyof typeof SizeVariant;
}>`
  resize: none;
  display: flex;
  align-items: center;
  justify-content: center;
  :focus {
    outline: 2px solid #ffeeda;
  }
  ${({ size }) =>
    size
      ? SizeVariant[size]
      : css`
          height: 36px;
          padding: 8px 16px;
          border-radius: 8px;
        `}

  ${({ variant }) =>
    variant
      ? LabelVariant[variant]
      : css`
          border: 1px solid #e0e3e7;
          background-color: #ffffff;
        `}
`;
