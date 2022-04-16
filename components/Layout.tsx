import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMatch } from "hooks/useMatch";
import Link, { LinkProps } from "next/link";
import { Dimmer, Header } from "components";
import { useToggle } from "hooks/useToggle";
import React, { useEffect, useRef } from "react";
import { Media } from "./Media";
import Portal from "./Portal";
import { useRouter } from "next/router";

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
  z-index: 9999;
  background-color: #fff;
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
  ${({ theme }) => theme.breakpoints.at("sm")} {
    top: 0;
  }
`;

interface ISideBarProps {
  exact?: boolean;
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
          :hover {
            background-color: #fff8f1;
          }
        `};
`;

const SideBarElement = ({
  children,
  selected,
  exact,
  ...props
}: ISideBarProps & React.PropsWithChildren<LinkProps>) => {
  const match = useMatch(props.href, exact);
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
  ${({ theme }) => theme.breakpoints.at("sm")} {
    margin-left: 0px;
  }
`;

const HeaderIconStyle = css({
  color: "#3e5060",
  margin: "-9px",
});

const SideBar = ({
  ...props
}: React.ComponentProps<typeof SideBarContainer>) => {
  return (
    <>
      <SideBarContainer {...props}>
        <SideBarElement href="/" selected>
          홈
        </SideBarElement>
        <SideBarElement href="/write">새 모집 만들기</SideBarElement>
        <SideBarElement href="/project" exact={false}>
          프로젝트/스터디 찾기
        </SideBarElement>
        <SideBarElement href="">라운지</SideBarElement>
        <br />
        <SideBarElement href="/profile">내 프로필</SideBarElement>
        <SideBarElement href="">새소식</SideBarElement>
        <SideBarElement href="">쪽지</SideBarElement>
      </SideBarContainer>
    </>
  );
};

const MobileSideBar = ({
  show,
  toggle,
  ...props
}: { show: boolean; toggle: (set?: boolean) => void } & React.ComponentProps<
  typeof SideBarContainer
>) => {
  const router = useRouter();

  const initial = useRef(true);
  useEffect(() => {
    if (initial.current) initial.current = false;
    else if (router.pathname) toggle(false);
  }, [router.pathname, toggle]);

  if (!show) return null;
  return (
    <Portal at="#portal">
      <SideBarContainer css={{ position: "fixed" }} {...props}>
        <SideBarElement href="/" selected>
          홈
        </SideBarElement>
        <SideBarElement href="/write">새 모집 만들기</SideBarElement>
        <SideBarElement href="/project">프로젝트/스터디 찾기</SideBarElement>
        <SideBarElement href="">라운지</SideBarElement>
        <br />
        <SideBarElement href="/profile">내 프로필</SideBarElement>
        <SideBarElement href="">새소식</SideBarElement>
        <SideBarElement href="">쪽지</SideBarElement>
      </SideBarContainer>
      <Dimmer onClick={() => toggle()} css={{ zIndex: 9998 }} />
    </Portal>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, toggleShowSideBar] = useToggle();
  return (
    <>
      <PageContainer>
        <Header toggleSideBar={toggleShowSideBar} />
        <Media at="sm">
          <MobileSideBar show={showSidebar} toggle={toggleShowSideBar} />
        </Media>
        <Media greaterThan="sm">
          <SideBar />
        </Media>
        <BodyContainer>
          <ChildrenContainer>
            <div>{children}</div>
          </ChildrenContainer>
        </BodyContainer>
      </PageContainer>
    </>
  );
};
