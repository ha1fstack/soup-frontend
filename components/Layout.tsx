import { css } from "@emotion/react";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  box-sizing: border-box;
  padding: 0px 24px;
  position: fixed;
  height: 68px;
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
  padding: 12px 12px;
  border-radius: 8px;
  ${(props) =>
    props.selected &&
    css`
      background-color: #ffeeda;
    `};
`;

const Logo = styled.span`
  font-weight: bold;
  font-size: 20px;
  color: #ff8a05;
`;

const Button = styled.button`
  height: 36px;
  padding: 0px 16px;
  border: 1px solid #e0e3e7;
  border-radius: 8px;
  background-color: #fafbfb;
`;

const ChildrenContainer = styled.div`
  margin-left: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    max-width: 1024px;
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageContainer>
      <header>
        <HeaderContainer>
          <Logo>Soup</Logo>
          <HeaderMenuContainer>
            <Button>검색</Button>
            <Button>쪽지</Button>
            <Button>알림</Button>
            <Button>로그인</Button>
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
