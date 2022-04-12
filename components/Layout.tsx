import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMatch } from "hooks/useMatch";
import Link, { LinkProps } from "next/link";
import Header from "./Header";

const PageContainer = styled.div`
  min-height: 100vh;
`;
const BodyContainer = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SideBarContainer = styled.ul`
  margin: 0;
  line-height: normal;
  list-style-type: none;
  position: fixed;
  top: 69px;
  min-width: 279px;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  border-right: solid 1px #eceff1;
  padding: 16px;
`;

interface ISideBarProps {
  selected?: boolean;
}
const SideBarLink = styled.a<ISideBarProps>`
  display: block;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  font-weight: 500;
  ${(props) =>
    props.selected
      ? css`
          font-weight: 700;
          background-color: #ffeeda;
        `
      : css`
          color: #3e5060;
        `};
`;

const SideBarElement = ({
  children,
  selected,
  ...props
}: ISideBarProps & React.PropsWithChildren<LinkProps>) => {
  const match = useMatch(props.href);
  return (
    <li>
      <Link {...props}>
        <SideBarLink selected={match}>{children}</SideBarLink>
      </Link>
    </li>
  );
};
const ChildrenContainer = styled.div`
  overflow: auto;
  margin-top: 69px;
  margin-bottom: 120px;
  margin-left: 280px;
  padding: 36px 24px;
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
      <Header />
      <BodyContainer>
        <SideBarContainer>
          <SideBarElement href="/" selected>
            홈
          </SideBarElement>
          <SideBarElement href="/project">프로젝트/스터디 찾기</SideBarElement>
          <SideBarElement href="">라운지</SideBarElement>
          <br />
          <SideBarElement href="/profile">내 프로필</SideBarElement>
          <SideBarElement href="">새소식</SideBarElement>
          <SideBarElement href="">쪽지</SideBarElement>
        </SideBarContainer>
        <ChildrenContainer>
          <div>{children}</div>
        </ChildrenContainer>
      </BodyContainer>
    </PageContainer>
  );
};

export default Layout;
