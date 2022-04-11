import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "../styles/components/button";

const PageContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(4px);
  box-sizing: border-box;
  padding: 0px 24px;
  position: fixed;
  height: 69px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #eceff1;
`;
const HeaderMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  & > :not(:last-child) {
    margin-right: 12px;
  }
`;

const BodyContainer = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SideBarContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 69px;
  min-width: 279px;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  border-right: solid 1px #eceff1;
  padding: 16px;
`;

const SideBarElement = styled.ul<{
  selected?: boolean;
}>`
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  font-weight: 500;
  ${(props) =>
    props.selected
      ? css`
          background-color: #ffeeda;
        `
      : css`
          color: #3e5060;
        `};
`;

const Logo = styled.a`
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: #ff8a05;
`;

const ChildrenContainer = styled.div`
  overflow: auto;
  margin-top: 69px;
  margin-bottom: 120px;
  margin-left: 280px;
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  & > * {
    max-width: 1280px;
    width: 100%;
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer>
      <header>
        <HeaderContainer>
          <Logo>SouP</Logo>
          <HeaderMenuContainer>
            <Button>검색</Button>
            <Button>쪽지</Button>
            <Button>알림</Button>
            <Button variant="primary" css={{ fontWeight: "bold" }}>
              로그인
            </Button>
          </HeaderMenuContainer>
        </HeaderContainer>
      </header>
      <BodyContainer>
        <SideBarContainer>
          <SideBarElement selected>프로젝트/스터디</SideBarElement>
          <SideBarElement>라운지</SideBarElement>
          <SideBarElement>프로필</SideBarElement>
        </SideBarContainer>
        <ChildrenContainer>
          <div>{children}</div>
        </ChildrenContainer>
      </BodyContainer>
    </PageContainer>
  );
};

export default Layout;
