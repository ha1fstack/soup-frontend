import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Box, Flex, ProfilePlaceholder } from "common/atoms";
import Link, { LinkProps } from "next/link";
import React from "react";
import {
  MdOutlineMenu,
  MdOutlineSearch,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlinePerson,
  MdOutlineLogout,
} from "react-icons/md";
import { useQueryClient } from "react-query";
import { Login } from "./Login";
import Image from "next/image";
import { http } from "lib/services";
import { useAtom, useSetAtom } from "jotai";
import { useAuth, useToggle, useOuterClick } from "lib/hooks";
import { sideBarOpenState, loginPopupState } from "lib/states";
import { breakpoints, Media, WithThemeToggle } from "lib/utils";

const HeaderContainer = styled.div`
  grid-area: header;
  box-sizing: border-box;
  padding: 0px 12px;
  ${breakpoints.at("sm")} {
    padding: 0px 12px;
  }
  position: sticky;
  top: 0;
  height: calc(6rem - 1px);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
  backdrop-filter: blur(6px);
`;

const HeaderMenuContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.4rem;
  color: var(--negative2);
  & > :not(:last-child) {
    margin-right: 12px;
  }
  svg {
    font-size: 1.8rem;
  }
`;

const LogoLink = styled.a`
  height: 32px;
  cursor: pointer;
  ${breakpoints.greaterThan("sm")} {
    margin-left: 6px;
  }
`;

const Logo = ({ children, ...props }: React.PropsWithChildren<LinkProps>) => (
  <Link {...props}>
    <LogoLink href={props.href.toString()}>{children}</LogoLink>
  </Link>
);

const HeaderIconStyle = css({
  color: "var(--negative2)",
  margin: "-9px",
});

const SearchButton = styled(Button)({
  justifyContent: "space-between",
  width: "200px",
});

const PopupContainer = styled(Box)({
  position: "absolute",
  top: "44px",
  width: "150px",
  right: 0,
  fontSize: "1.4rem",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  padding: "6px",
  hr: {
    margin: "8px 0px",
  },
  svg: {
    display: "inline-block",
    marginRight: "8px",
    fontSize: "2.2rem",
  },
  "& > *": {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 8px",
    borderRadius: "8px",
    ":hover": {
      backgroundColor: "var(--positive1)",
    },
  },
  "& > *+*": {
    marginTop: "4px",
  },
});

const Popup = React.forwardRef<
  HTMLDivElement,
  {
    toggle: (set?: boolean) => void;
  }
>(({ toggle }, ref) => {
  const queryClient = useQueryClient();

  const final = (_?: any) => toggle();

  const logout = async () => {
    try {
      await http.get("/logout");
    } catch (e) {}
    queryClient.invalidateQueries();
  };

  return (
    <PopupContainer column ref={ref}>
      <Link href="/profile">
        <a onClick={final}>
          <MdOutlinePerson />
          <span>마이페이지</span>
        </a>
      </Link>
      <div onClick={() => final(logout())}>
        <MdOutlineLogout />
        <span>로그아웃</span>
      </div>
    </PopupContainer>
  );
});
Popup.displayName = "Popup";

const HeaderBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 6rem;
  background-color: var(--positive);
  z-index: -1;
`;

const HeaderOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 6rem;
  background-color: var(--positive);
  opacity: 0.75;
  z-index: 2;
`;

const HeaderOutline = styled.div`
  position: fixed;
  width: 100%;
  top: calc(6rem - 1px);
  border-bottom: solid 1px var(--outline);
  z-index: 3;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 36px;
  background-color: var(--outline);
`;

export const Header = React.memo(() => {
  const auth = useAuth();

  const setSidebarOpen = useSetAtom(sideBarOpenState);
  const [loginPopup, setLoginPopup] = useAtom(loginPopupState);
  const [messagePopup, toggleMessagePopup] = useToggle();

  const messageRef = useOuterClick<HTMLDivElement>(() => toggleMessagePopup());

  return (
    <>
      <HeaderBackground />
      <HeaderOverlay />
      <HeaderOutline />
      <HeaderContainer>
        <Flex
          css={{
            alignItems: "center",
            gap: "12px",
            color: "var(--primary)",
          }}
        >
          <Media css={{ display: "flex", gap: "12px" }} at="sm">
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="transparent"
              icon
              css={{
                marginLeft: "4px",
                fontSize: "2.4rem",
                padding: 0,
              }}
            >
              <MdOutlineMenu />
            </Button>
            <VerticalDivider />
          </Media>
          <Logo href="/">
            <Image
              height="32"
              width="76"
              src={"/logo-with-text.svg"}
              alt="logo"
            />
          </Logo>
        </Flex>
        <HeaderMenuContainer>
          <Media css={{ display: "flex", gap: "12px" }} greaterThan="sm">
            <Link passHref href="/projects">
              <SearchButton as="a">
                <MdOutlineSearch />
                프로젝트 찾아보기
              </SearchButton>
            </Link>
            <div css={{ position: "relative" }}>
              <WithThemeToggle>
                {({ theme, toggleTheme }) => (
                  <Button icon onClick={toggleTheme} css={{ width: "36px" }}>
                    {theme === "light" ? (
                      <MdOutlineLightMode css={HeaderIconStyle} />
                    ) : (
                      <MdOutlineDarkMode css={HeaderIconStyle} />
                    )}
                  </Button>
                )}
              </WithThemeToggle>
            </div>
          </Media>
          {auth.success ? (
            <>
              <VerticalDivider
                css={{
                  marginLeft: "4px",
                }}
              />
              <Flex
                inline
                onClick={messagePopup ? undefined : () => toggleMessagePopup()}
                css={{
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  height: "36px",
                  position: "relative",
                }}
              >
                <span>{auth.username}</span>
                <span
                  css={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <ProfilePlaceholder size={32} value={auth.username} />
                </span>
                {messagePopup && (
                  <Popup ref={messageRef} toggle={toggleMessagePopup} />
                )}
              </Flex>
            </>
          ) : (
            <Button
              onClick={() => setLoginPopup(true)}
              variant="primary"
              css={{ fontWeight: "bold" }}
            >
              로그인
            </Button>
          )}
        </HeaderMenuContainer>
      </HeaderContainer>

      {loginPopup && <Login />}
    </>
  );
});
Header.displayName = "Header";
