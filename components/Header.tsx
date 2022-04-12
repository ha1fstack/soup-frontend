import {
  MdOutlineSearch,
  MdOutlineNotifications,
  MdOutlineMail,
} from "react-icons/md";
import { Label } from "styles/components/label";
import { Button } from "styles/components/button";
import styled from "@emotion/styled";
import Link, { LinkProps } from "next/link";
import { useToggle } from "hooks/useToggle";
import Login from "./Login";

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

const Header = () => {
  const [login, toggleLogin] = useToggle();
  return (
    <>
      {" "}
      <header>
        <HeaderContainer>
          <Logo href="/">SouP</Logo>
          <HeaderMenuContainer>
            <Button
              css={{
                justifyContent: "space-between",
                width: "200px",
                padding: "0px 10px",
              }}
            >
              <MdOutlineSearch
                css={{
                  fontSize: "18px",
                }}
              />
              프로젝트 찾아보기
            </Button>
            <Button css={{ width: "36px" }}>
              <MdOutlineNotifications
                css={{
                  color: "#3e5060",
                  fontSize: "18px",
                  margin: "-9px",
                }}
              />
            </Button>
            <Button css={{ width: "36px" }}>
              <MdOutlineMail
                css={{
                  color: "#3e5060",
                  fontSize: "18px",
                  margin: "-9px",
                }}
              />
            </Button>
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
