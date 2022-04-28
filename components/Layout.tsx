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
  background-color: ${({ theme }) => theme.color.background};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SideBarContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  background-color: ${({ theme }) => theme.color.positive};
  position: fixed;
  top: 69px;
  min-width: 279px;
  height: calc(100vh - 69px);
  justify-content: space-between;
  border-right: solid 1px #dadce0;
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
      <div css={{ fontSize: "14px", color: "#3e506099" }}>
        개인정보처리방침 <br /> © 2022 SouP
      </div>
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
    padding: 24px 18px;
  }
`;

const SideBarNavigation = () => {
  return (
    <>
      <SideBarElement href="/" selected>
        홈
      </SideBarElement>
      <SideBarElement href="/write">새 모집 만들기</SideBarElement>
      <SideBarElement href="/project" exact={false}>
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
        <BodyContainer>
          <ChildrenContainer>
            {JSON.stringify(auth)}
            <div>{children}</div>
          </ChildrenContainer>
        </BodyContainer>
      </PageContainer>
    </>
  );
};

const fetchAuth = async () => {
  const res = await http.get<{
    success: boolean;
    profileImage?: string;
    nickname?: string;
  }>("/auth");
  return res.data;
};
