import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "common/atoms";
import { useSetAtom, useAtom } from "jotai";
import { useMatch, useAuth } from "lib/hooks";
import { loginPopupState, sideBarOpenState } from "lib/states";
import { breakpoints, WithThemeToggle, Media } from "lib/utils";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { ISideBarProps } from "types";
import { Dimmer } from "./Dimmer";
import Portal from "./Portal";

const HeaderIconStyle = css({
  color: "var(--negative2)",
  margin: "-9px",
});

const SlideAnimation = keyframes`
  0% {
    margin-left: -300px
  }
  100% {
    margin-left: 0px
  }
`;

const SideBarContainerWrapper = styled.div<{
  animated?: boolean;
}>`
  position: sticky;
  top: 6rem;
  height: calc(100vh - 6rem);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: var(--positive);
  border-right: solid 1px var(--outline);
  padding: 16px;
  width: 200px;

  ${breakpoints.at("sm")} {
    position: fixed;
    top: 0;
    height: 100vh;
    z-index: 99999;

    ${(animated) =>
      animated &&
      css`
        animation: ${SlideAnimation} 0.1s ease-out;
      `}
  }
`;

const SideBarContentWrapper = styled.ul`
  margin: 0;
  line-height: normal;
  list-style-type: none;
  ${breakpoints.at("sm")} {
    top: 0;
  }
`;

const SideBarContainer = ({
  children,
  animated,
}: {
  children?: React.ReactNode;
  animated?: boolean;
}) => {
  return (
    <SideBarContainerWrapper animated={animated}>
      <nav>
        <SideBarContentWrapper>{children}</SideBarContentWrapper>
      </nav>
      <footer>
        <div
          css={{
            fontSize: "1.4rem",
            color: "var(--negative2)",
          }}
        >
          <a
            href={process.env.NEXT_PUBLIC_FOOTER_ABOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            SouP 소개
          </a>
          <br />
          <Link href="/support/service-terms">
            <a>이용약관</a>
          </Link>
          {" · "}
          <Link href="/support/privacy-policy">
            <a>개인정보처리방침</a>
          </Link>
          <br />
          <br />© 2022 SouP
        </div>
      </footer>
    </SideBarContainerWrapper>
  );
};

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
  authorized,
  ...props
}: ISideBarProps & React.PropsWithChildren<LinkProps>) => {
  const match = useMatch(props.href, exact);
  const setLoginPopup = useSetAtom(loginPopupState);
  const auth = useAuth();

  const LinkWrapper =
    authorized && !auth.success
      ? ({ children }: { children: React.ReactNode }) => (
          <SideBarLink onClick={() => setLoginPopup(true)} selected={match}>
            {children}
          </SideBarLink>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <Link {...props}>
            <SideBarLink href={props.href.toString()} selected={match}>
              {children}
            </SideBarLink>
          </Link>
        );

  return (
    <li>
      <LinkWrapper>{children}</LinkWrapper>
    </li>
  );
};

const SideBarNavigation = () => {
  return (
    <>
      <Media at="sm">
        <WithThemeToggle>
          {({ theme, toggleTheme }) => (
            <Button
              icon
              onClick={toggleTheme}
              css={{ width: "36px", marginBottom: "16px" }}
            >
              {theme === "light" ? (
                <MdOutlineLightMode css={HeaderIconStyle} />
              ) : (
                <MdOutlineDarkMode css={HeaderIconStyle} />
              )}
            </Button>
          )}
        </WithThemeToggle>
      </Media>
      <SideBarElement href="/" selected>
        홈
      </SideBarElement>
      <SideBarElement authorized href="/projects/write">
        모집 만들기
      </SideBarElement>
      <SideBarElement href="/projects" exact={false}>
        프로젝트/스터디 찾기
      </SideBarElement>
      <SideBarElement href="/lounge">라운지</SideBarElement>
      <br />
      <SideBarElement authorized href="/profile" exact={false}>
        마이페이지
      </SideBarElement>
    </>
  );
};

export const MobileSideBar = React.memo(
  ({ ...props }: {} & React.ComponentProps<typeof SideBarContainer>) => {
    const router = useRouter();
    const [sideBarOpen, setSideBarOpen] = useAtom(sideBarOpenState);

    const initial = useRef(true);
    useEffect(() => {
      if (initial.current) initial.current = false;
      else if (router.pathname) setSideBarOpen(false);
    }, [router.pathname, setSideBarOpen]);

    if (!sideBarOpen) return null;
    return (
      <>
        <Dimmer onClick={() => setSideBarOpen(false)} css={{ zIndex: 9998 }} />
        <Portal at="#portal">
          <SideBarContainer animated {...props}>
            <SideBarNavigation />
          </SideBarContainer>
        </Portal>
      </>
    );
  }
);
MobileSideBar.displayName = "MobileSideBar";

export const SideBar = React.memo(
  ({ ...props }: React.ComponentProps<typeof SideBarContainer>) => {
    return (
      <>
        <SideBarContainer {...props}>
          <SideBarNavigation />
        </SideBarContainer>
      </>
    );
  }
);
SideBar.displayName = "SideBar";
