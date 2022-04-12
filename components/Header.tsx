import {
  MdOutlineSearch,
  MdOutlineNotifications,
  MdOutlineMail,
} from "react-icons/md";
import styled from "@emotion/styled";
import Link, { LinkProps } from "next/link";
import { useToggle } from "hooks/useToggle";
import Login from "./Login";
import { css } from "@emotion/react";
import { useOuterClick } from "hooks/useOuterClick";
import React, { useRef } from "react";
import { Box } from "styles/components/Box";
import { Button } from "styles/components/Button";

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
  z-index: 9999;
`;

const HeaderMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #3e5060;
  & > :not(:last-child) {
    margin-right: 12px;
  }
  svg {
    font-size: 18px;
  }
`;

const LogoLink = styled.a`
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: #ff8a05;
`;
const Logo = ({ children, ...props }: React.PropsWithChildren<LinkProps>) => (
  <Link {...props}>
    <LogoLink>{children}</LogoLink>
  </Link>
);

const HeaderIconStyle = css({
  color: "#3e5060",
  margin: "-9px",
});

const SearchButton = styled(Button)({
  justifyContent: "space-between",
  width: "200px",
});

const Popup = React.forwardRef<HTMLDivElement>((_, ref) => (
  <Box
    column
    ref={ref}
    css={{
      position: "absolute",
      top: "44px",
      width: "300px",
      right: 0,
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      hr: {
        margin: "8px 0px",
      },
    }}
  >
    알림
    <hr css={{ color: "#dfe2e6" }} />
    어쩌구
    <hr css={{ color: "#dfe2e6" }} />
    어쩌구
    <hr css={{ color: "#dfe2e6" }} />
    어쩌구
  </Box>
));
Popup.displayName = "Popup";

const Header = () => {
  const [login, toggleLogin] = useToggle();
  const [notificationPopup, toggleNotificationPopup] = useToggle();
  const [messgePopup, toggleMessagePopup] = useToggle();

  const notificationRef = useOuterClick<HTMLDivElement>(
    toggleNotificationPopup
  );
  const messageRef = useOuterClick<HTMLDivElement>(toggleMessagePopup);

  return (
    <>
      <header>
        <HeaderContainer>
          <Logo href="/">SouP</Logo>
          <HeaderMenuContainer>
            <SearchButton>
              <MdOutlineSearch />
              프로젝트 찾아보기
            </SearchButton>
            <div css={{ position: "relative" }}>
              <Button
                icon
                onClick={() => toggleNotificationPopup()}
                css={{ width: "36px" }}
              >
                <MdOutlineNotifications css={HeaderIconStyle} />
              </Button>
              {notificationPopup && <Popup ref={notificationRef} />}
            </div>
            <div css={{ position: "relative" }}>
              <Button
                icon
                onClick={() => toggleMessagePopup()}
                css={{ width: "36px" }}
              >
                <MdOutlineMail css={HeaderIconStyle} />
              </Button>
              {messgePopup && <Popup ref={messageRef} />}
            </div>
            <Button
              onClick={() => toggleLogin()}
              variant="primary"
              css={{ fontWeight: "bold" }}
            >
              로그인
            </Button>
          </HeaderMenuContainer>
        </HeaderContainer>
      </header>
      {login && <Login toggle={toggleLogin} />}
    </>
  );
};

export default Header;
