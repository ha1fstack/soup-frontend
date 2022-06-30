import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { defaultGridTemplate } from "common/styles";
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
      padding-top: 32px;
      padding-bottom: 32px;
    `}
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: inherit;
  // sc trick to override default inherit behavior
  && {
    grid-column: 1 / 5;
  }
  & > * {
    grid-column: 2;
    width: 100%;
  }
`;
