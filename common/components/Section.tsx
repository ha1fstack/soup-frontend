import styled from "@emotion/styled";
import { Flex } from "common/components";

export const SectionHeader = Object.assign(
  styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
  `,
  {
    Title: styled.div`
      display: flex;
      font-weight: bold;
      font-size: 20px;
    `,
    Description: styled.div`
      display: flex;
      flex-direction: column;
      font-size: 12px;
    `,
  }
);

export const DividingSection = styled(Flex)`
  padding-left: 100vw;
  margin-left: -100vw;
  padding-right: 100vw;
  margin-right: -100vw;
  background-color: var(--positive);
  border-top: 1px solid var(--outline);
  border-bottom: 1px solid var(--outline);
  padding-top: 12px;
  padding-bottom: 12px;
`;
