import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Button } from "common/components";
import { http } from "common/services";
import { Dimmer } from "components";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

const Logo = styled.span`
  cursor: pointer;
  font-weight: bold;
  font-size: 28px;
  color: ${({ theme }) => theme.color.primary};
`;

const fetchAuth = async () => {
  const res = await http.get<{
    success: boolean;
    profileImage?: string;
    nickname?: string;
  }>("/auth");
  if (res.data) window.sessionStorage.setItem("auth", JSON.stringify(res.data));
  return res.data;
};

export const Login = ({ toggle }: { toggle: () => void }) => {
  const theme = useTheme();

  const queryClient = useQueryClient();

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (!event) return;
      if (event.origin !== location.origin) return;
      if (event.data !== true) return;
      toggle();
      (async () => {
        queryClient.setQueryData(["auth"], await fetchAuth());
      })();
    };
    window.addEventListener("message", listener, false);
    return () => window.removeEventListener("message", listener);
  }, []);

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
            backgroundColor: theme.color.positive,
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
            <Button
              onClick={() => window.open("/api/login-redirect")}
              css={{ width: "72px", height: "72px" }}
            >
              Google
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "/api/oauth2/authorization/google",
                  undefined,
                  "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
                )
              }
              css={{ width: "72px", height: "72px" }}
            >
              Google
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "/api/oauth2/authorization/github",
                  undefined,
                  "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
                )
              }
              css={{ width: "72px", height: "72px" }}
            >
              Github
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "/api/oauth2/authorization/kakao",
                  undefined,
                  "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
                )
              }
              css={{ width: "72px", height: "72px" }}
            >
              Kakao
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "/api/oauth2/authorization/naver",
                  undefined,
                  "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
                )
              }
              css={{ width: "72px", height: "72px" }}
            >
              NAVER
            </Button>
          </Flex>
          로 로그인 / 회원가입
        </div>
      </div>
    </Dimmer>
  );
};
