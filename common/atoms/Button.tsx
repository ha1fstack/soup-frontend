import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { LabelVariant, LabelSize, LabelStyle } from "./Label";

const keyframesBubble = keyframes`
  0% {
    transform: translateY(calc(-100% + -4px));
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(calc(-100% + -32px));
    opacity: 0;
  }
`;

const ButtonStyle = css`
  ${LabelStyle}
  color: inherit;
  cursor: pointer;
  &:hover {
    filter: brightness(0.98);
  }
  &:disabled {
    filter: opacity(0.5);
  }
`;

export const Button = styled.button<{
  variant?: keyof ReturnType<typeof LabelVariant>;
  size?: keyof ReturnType<typeof LabelSize>;
  icon?: boolean;
  message?: string;
}>`
  ${ButtonStyle}
  ${({ size }) => (size ? LabelSize()[size] : LabelSize()["default"])}
  ${({ variant, theme }) =>
    variant ? LabelVariant(theme)[variant] : LabelVariant(theme)["default"]}
  ${({ message }) =>
    message &&
    css({
      ":focus:after": {
        animation: `${keyframesBubble} 1s ease-in-out`,
        padding: "6px 8px",
        borderRadius: "8px",
        backgroundColor: "var(--background)",
        position: `absolute`,
        content: `"${message}"`,
        display: `block`,
        opacity: 0,
        zIndex: 9999,
        fontSize: "1.2rem",
      },
      ":active": {
        ":after": {
          animation: "none",
        },
      },
    })}
`;

export const ButtonLink = Button.withComponent("a");
