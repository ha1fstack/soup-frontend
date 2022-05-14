import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useMatch } from "hooks/useMatch";
import { useToggle } from "hooks/useToggle";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { Dimmer, Header, Media, Portal } from "components";
import { Flex } from "common/components";
import { NextComponentType } from "next";
import { http } from "common/services";
import { useQuery, QueryClient, dehydrate } from "react-query";
import useAuth from "hooks/useAuth";

const PageContainer = styled.div`
  min-height: 100vh;
`;

const BodyContainer = styled.div`
  min-height: 100vh;
  ${({ theme }) => theme.breakpoints.greaterThan("md")} {
    margin-left: 240px;
  }
  display: flex;
  flex-direction: row;
  padding-right: 36px;
  padding-left: 36px;
  ${({ theme }) => theme.breakpoints.at("sm")} {
    padding-right: 12px;
    padding-left: 12px;
  }
`;

const SideBarContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  background-color: var(--positive);
  position: fixed;
  top: 59px;
  min-width: 240px;
  height: calc(100vh - 59px);
  justify-content: space-between;
  border-right: solid 1px var(--outline);
  padding: 16px;
  ${({ theme }) => theme.breakpoints.at("sm")} {
    top: 0;
    height: 100vh;
  }
`;

const SideBarContentWrapper = styled.ul`
  margin: 0;
  line-height: normal;
  list-style-type: none;
  ${({ theme }) => theme.breakpoints.at("sm")} {
    top: 0;
  }
`;

const SideBarContainer: NextComponentType = ({ children }) => {
  return (
    <SideBarContainerWrapper>
      <SideBarContentWrapper>{children}</SideBarContentWrapper>
      <footer>
        <div css={{ fontSize: "14px", color: "var(--negative2)" }}>
          개인정보처리방침 <br /> © 2022 SouP
        </div>
      </footer>
    </SideBarContainerWrapper>
  );
};

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
          background-color: var(--primarylight);
        `
      : css`
          color: var(--negative2);
          :hover {
            background-color: var(--primarylight2);
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
        <SideBarLink href={props.href.toString()} selected={match}>
          {children}
        </SideBarLink>
      </Link>
    </li>
  );
};

export const ChildrenContainer = styled.div<{
  width?: number;
}>`
  margin-top: 59px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  --width: ${({ width }) => width || 1140}px;
  & > .dividing {
    margin-right: -36px;
    margin-left: -36px;
    padding-right: 36px;
    padding-left: 36px;
    width: calc(100% + 72px);
    ${({ theme }) => theme.breakpoints.at("sm")} {
      margin-right: -12px;
      margin-left: -12px;
      padding-right: 12px;
      padding-left: 12px;
      width: calc(100% + 24px);
    }
  }
`;

const SideBarNavigation = () => {
  return (
    <>
      <SideBarElement href="/" selected>
        홈
      </SideBarElement>
      <SideBarElement href="/write">새 모집 만들기</SideBarElement>
      <SideBarElement href="/projects" exact={false}>
        프로젝트/스터디 찾기
      </SideBarElement>
      <SideBarElement href="/lounge">라운지</SideBarElement>
      <br />
      <SideBarElement href="/profile">내 프로필</SideBarElement>
      <SideBarElement href="">새소식</SideBarElement>
      <SideBarElement href="">쪽지</SideBarElement>
    </>
  );
};

const SideBar = ({
  ...props
}: React.ComponentProps<typeof SideBarContainer>) => {
  return (
    <>
      <SideBarContainer {...props}>
        <SideBarNavigation />
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
      <SideBarContainer {...props}>
        <SideBarNavigation />
      </SideBarContainer>
      <Dimmer onClick={() => toggle()} css={{ zIndex: 9998 }} />
    </Portal>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, toggleShowSideBar] = useToggle();

  const auth = useAuth();

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
        <BodyContainer>{children}</BodyContainer>
      </PageContainer>
    </>
  );
};
