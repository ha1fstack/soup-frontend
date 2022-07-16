import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const LabelVariant = (theme: Theme) => ({
  default: css`
    border: 0px;
    background-color: var(--positive1);
  `,
  primary: css`
    color: var(--positive);
    border: 0px;
    background-color: var(--primary);
  `,
  "primary-outlined": css`
    color: var(--primary);
    border: 1px solid var(--primary);
    background-color: var(--positive);
  `,
  white: css`
    border: 1px solid var(--outline);
    background-color: var(--positive);
  `,
  background: css`
    background-color: var(--background);
  `,
  transparent: css`
    border: 0px;
    background-color: transparent;
  `,
});

export const LabelSize = () => ({
  default: css`
    height: 36px;
    border-radius: 8px;
  `,
  smaller: css`
    height: 24px;
    font-size: 1.3rem;
    border-radius: 4px;
  `,
  small: css`
    height: 30px;
    font-size: 1.4rem;
    border-radius: 6px;
  `,
  freeform: css`
    border-radius: 8px;
  `,
});

export const LabelStyle = css`
  padding: 0px 0.7em;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  svg {
    font-size: 1.1em;
  }
  svg:first-of-type:not(*:only-child) {
    margin-right: 0.25em;
  }
  svg:last-of-type:not(*:only-child) {
    margin-left: 0.25em;
  }
`;

export const Label = styled.div<{
  variant?: keyof ReturnType<typeof LabelVariant>;
  size?: keyof ReturnType<typeof LabelSize>;
}>`
  ${LabelStyle}
  ${({ size }) => (size ? LabelSize()[size] : LabelSize()["default"])}
  ${({ variant, theme }) =>
    variant ? LabelVariant(theme)[variant] : LabelVariant(theme)["default"]}
`;
