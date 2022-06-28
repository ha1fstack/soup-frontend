import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { breakpoints } from "lib/utils";

export const SectionHeader = Object.assign(
  styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 36px;
    ${breakpoints.at("sm")} {
      margin-top: 24px;
    }
    margin-bottom: 24px;
    width: 100%;
  `,
  {
    Title: styled.div`
      display: flex;
      font-weight: bold;
      font-size: 2rem;
    `,
    Description: styled.div`
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;
    `,
  }
);

export const Section = styled.section<{
  bleed?: boolean;
}>`
  width: 100%;

  ${({ bleed }) =>
    bleed &&
    css`
      background-color: var(--positive);
      border-top: 1px solid var(--outline);
      border-bottom: 1px solid var(--outline);
    `}
  padding-top: 32px;
  padding-bottom: 32px;
  grid-column: 1 / 5;
  display: grid;
  grid-template-columns: inherit;
  & > * {
    grid-column: 2;
    width: 100%;

    // horizontal padding when section width is 100%
    ${breakpoints.at("sm")} {
      padding-left: 16px;
      padding-right: 16px;
    }
    padding-left: 36px;
    padding-right: 36px;
  }
`;
