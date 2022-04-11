import styled from "@emotion/styled";

export const SectionHeader = Object.assign(
  styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 36px;
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
      margin-top: 8px;
      font-size: 12px;
    `,
  }
);

export const DividingSection = styled.div`
  padding-left: 100vw;
  margin-left: -100vw;
  padding-right: 100vw;
  margin-right: -100vw;
  background-color: #fafbfb;
  border-top: 1px solid #eceff1;
  border-bottom: 1px solid #eceff1;
  padding-top: 12px;
  padding-bottom: 12px;
`;
