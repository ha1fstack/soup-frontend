import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Box, Flex, Hr } from "common/components";
import useAuth from "hooks/useAuth";
import { useOuterClick } from "hooks/useOuterClick";
import { useToggle } from "hooks/useToggle";
import Link, { LinkProps } from "next/link";
import React from "react";
import {
  MdOutlineMenu,
  MdOutlineSearch,
  MdOutlineNotifications,
  MdOutlineMail,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlinePerson,
  MdOutlineLogout,
} from "react-icons/md";
import { useQueryClient } from "react-query";
import { Login } from "./Login";
import { Media } from "./Media";
import Image from "next/image";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loginPopupState } from "state";

const HeaderContainer = styled.div`
  box-sizing: border-box;
  padding: 0px 12px;
  ${({ theme }) => theme.breakpoints.at("sm")} {
    padding: 0px 12px;
  }
  position: fixed;
  height: 59px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--outline);
  z-index: 1;
  backdrop-filter: blur(6px);
`;

const HeaderMenuContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: var(--negative2);
  & > :not(:last-child) {
    margin-right: 12px;
  }
  svg {
    font-size: 18px;
  }
`;

const LogoLink = styled.a`
  height: 32px;
  cursor: pointer;
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

const Popup = React.forwardRef<
  HTMLDivElement,
  {
    toggle: (set?: boolean) => void;
  }
>(({ toggle }, ref) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const final = (_?: any) => {
    toggle();
  };

  const logout = () => {
    (async () => {
      document.cookie = "SESSION" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      queryClient.setQueryData(["auth"], () => undefined);
    })();
  };

  return (
    <Box
      column
      ref={ref}
      css={{
        position: "absolute",
        top: "44px",
        width: "150px",
        right: 0,
        fontSize: "14px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        padding: "6px",
        hr: {
          margin: "8px 0px",
        },
        svg: {
          display: "inline-block",
          marginRight: "8px",
          fontSize: "22px",
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
      }}
    >
      <div onClick={() => final(router.push("profile"))}>
        <MdOutlinePerson />
        <span>내 프로필</span>
      </div>
      <div onClick={() => final(logout())}>
        <MdOutlineLogout />
        <span>로그아웃</span>
      </div>
    </Box>
  );
});
Popup.displayName = "Popup";

const customAnimation = (ms: number) => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* { transition-duration: 250ms; transition-property: background-color, outline-color, border-color; -webkit-transition-duration: 250ms; -webkit-transition-property: background-color, outline-color, border-color; }`
    )
  );
  document.head.appendChild(css);
  return () => {
    (() => window.getComputedStyle(document.body))();
    setTimeout(() => {
      document.head.removeChild(css);
    }, ms);
  };
};

export const Header = ({ toggleSideBar }: { toggleSideBar?: () => void }) => {
  const [loginPopup, setLoginPopup] = useRecoilState(loginPopupState);
  const [messagePopup, toggleMessagePopup] = useToggle();

  const messageRef = useOuterClick<HTMLDivElement>(() => toggleMessagePopup());

  const auth = useAuth();

  const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme();

  const setCustomNextTheme = () => {
    const removeAnimation = customAnimation(250);
    setNextTheme(nextTheme === "light" ? "dark" : "light");
    removeAnimation();
  };

  const router = useRouter();

  return (
    <>
      <div // 배경
        css={{
          position: "fixed",
          width: "100%",
          height: "59px",
          backgroundColor: "var(--positive)",
          zIndex: -1,
        }}
      />
      <div // 오버레이
        css={{
          position: "fixed",
          width: "100%",
          height: "59px",
          backgroundColor: "var(--positive)",
          opacity: 0.75,
          zIndex: 1,
        }}
      />
      <HeaderContainer css={{ zIndex: 2 }}>
        <Flex
          css={{
            alignItems: "center",
            gap: "12px",
            color: "var(--primary)",
          }}
        >
          <Media css={{ display: "flex", gap: "12px" }} at="sm">
            <Button
              onClick={toggleSideBar}
              variant="transparent"
              icon
              css={{
                marginLeft: "4px",
                fontSize: "24px",
                padding: 0,
              }}
            >
              <MdOutlineMenu />
            </Button>
            <div
              css={{
                width: "1px",
                height: "36px",
                backgroundColor: "var(--outline)",
              }}
            />
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
            <SearchButton onClick={() => router.push("/projects")}>
              <MdOutlineSearch />
              프로젝트 찾아보기
            </SearchButton>
            {/* 
            <div css={{ position: "relative" }}>
              <Button
                icon
                onClick={
                  notificationPopup
                    ? undefined
                    : () => toggleNotificationPopup()
                }
                css={{ width: "36px" }}
              >
                <MdOutlineNotifications css={HeaderIconStyle} />
              </Button>
              {notificationPopup && <Popup ref={notificationRef} />}
            </div>
            <div css={{ position: "relative" }}>
              <Button
                icon
                onClick={messagePopup ? undefined : () => toggleMessagePopup()}
                css={{ width: "36px" }}
              >
                <MdOutlineMail css={HeaderIconStyle} />
              </Button>
              {messagePopup && <Popup ref={messageRef} />}
            </div> */}
            <div css={{ position: "relative" }}>
              <Button icon onClick={setCustomNextTheme} css={{ width: "36px" }}>
                {nextTheme === "light" ? (
                  <MdOutlineLightMode css={HeaderIconStyle} />
                ) : (
                  <MdOutlineDarkMode css={HeaderIconStyle} />
                )}
              </Button>
            </div>
          </Media>

          {auth.success ? (
            <>
              <div
                css={{
                  height: "32px",
                  width: "1px",
                  backgroundColor: "var(--outline)",
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
                <span>{auth?.username}</span>
                <span
                  css={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "99999px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={auth?.profileImage!}
                    height="32px"
                    width="32px"
                    alt="profile-image"
                  />
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
};
