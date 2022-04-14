import styled from "@emotion/styled";
import { Dimmer } from "components";
import { Flex } from "styles/components/Box";
import { Button } from "styles/components/Button";

const Logo = styled.span`
  cursor: pointer;
  font-weight: bold;
  font-size: 28px;
  color: #ff8a05;
`;

export const Login = ({ toggle }: { toggle: () => void }) => {
  return (
    <Dimmer onClick={() => toggle()}>
      <div
        css={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          css={{
            height: "240px",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px 36px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo>SouP</Logo>
          <Flex
            css={{
              justifyContent: "space-between",
              "& > *+*": {
                marginLeft: "24px",
              },
            }}
          >
            <Button css={{ width: "72px", height: "72px" }}>Google</Button>
            <Button css={{ width: "72px", height: "72px" }}>Github</Button>
            <Button css={{ width: "72px", height: "72px" }}>Kakao</Button>
            <Button css={{ width: "72px", height: "72px" }}>NAVER</Button>
          </Flex>
          로 로그인 / 회원가입
        </div>
      </div>
    </Dimmer>
  );
};
