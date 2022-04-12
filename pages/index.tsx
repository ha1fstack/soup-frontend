import styled from "@emotion/styled";
import type { NextPage } from "next";
import Image from "next/image";
import { MdOutlineArrowForward, MdOutlineOpenInNew } from "react-icons/md";
import { Box, Flex } from "styles/components/box";
import { Button } from "styles/components/button";
import { DividingSection, SectionHeader } from "styles/layout";

const ArticleContainer = styled.div({
  flex: "20%",
  minWidth: "240px",
  border: "1px solid #ECEFF1",
  background: "#fafbfb",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  height: "180px",
  overflow: "hidden",
});

const Article = () => (
  <ArticleContainer>
    <div
      css={{
        flexWrap: "nowrap",
        boxSizing: "border-box",
        height: "100%",
        flex: "0 1 auto",
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        justifyContent: "space-between",
        overflow: "hidden",
        lineHeight: "1.2em",
      }}
    >
      <div
        css={{
          fontWeight: "500",
          fontSize: "16px",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        사이드 프로젝트 같이 하실 UI/UX 디자이너 분을 구합니다!
      </div>
      <div
        css={{
          overflow: "hidden",
          fontSize: "13px",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        타입스크립트, 까다롭기만한데 굳이 왜 써야할까?에 대한 가벼운 이야기를
        다룹니다. 본 게시물은 프론트엔드와 백엔드 개발자 모두가 이해할 수 있는
        수준으로 작성되었습니다 :)
      </div>
    </div>
    <div
      css={{
        display: "flex",
        flexDirection: "row-reverse",
        margin: "0px 12px",
        padding: "12px 0px",
        justifyContent: "space-between",
        borderTop: "1px solid #E0E3E7",
        alignItems: "center",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          "& > *+*": {
            marginLeft: "12px",
          },
        }}
      >
        <div
          css={{
            height: "20px",
            width: "20px",
          }}
        >
          <Image src="/stacks/ts.png" alt="me" width="20px" height="20px" />
        </div>
        <div
          css={{
            height: "20px",
            width: "20px",
          }}
        >
          <Image src="/stacks/node.png" alt="me" width="20px" height="20px" />
        </div>
        <div
          css={{
            height: "20px",
            width: "20px",
          }}
        >
          <Image src="/stacks/react.png" alt="me" width="20px" height="20px" />
        </div>
      </div>
      <div css={{ fontWeight: "500", fontSize: "14px" }}>웹 개발</div>
    </div>
  </ArticleContainer>
);

const ArticleList = ({ source, data }: { source: string; data?: any }) => {
  return (
    <div
      css={{
        marginTop: "36px",
        marginBottom: "48px",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <div
          css={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {source}
        </div>
      </div>
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          margin: "-12px",
          "& > *": {
            margin: "12px",
          },
        }}
      >
        <Article /> <Article /> <Article /> <Article />
      </div>
    </div>
  );
};

const Lander = () => {
  return (
    <Box
      variant="primary"
      css={{
        backgroundImage: "url('/banner_background.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundBlendMode: "multiply",
        justifyContent: "space-between",
        alignItems: "end",
        color: "#ff8a05",
        height: "180px",
      }}
    >
      <Flex
        column
        css={{
          alignSelf: "stretch",
          justifyContent: "space-between",
          lineHeight: "normal",
        }}
      >
        <p css={{ fontSize: "28px", fontWeight: 700 }}>SouP</p>
        <div>
          <p css={{ fontSize: "20px", fontWeight: 500 }}>안녕하세요</p>
        </div>
      </Flex>
      <Button
        freeform
        variant="primary"
        css={{ fontSize: "24px", height: "48px" }}
      >
        <span css={{ fontSize: "16px", padding: "4px" }}>시작하기 &nbsp;</span>
        <MdOutlineArrowForward />
      </Button>
    </Box>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Lander />
      <ArticleList source="SouP" />
      <ArticleList source="Okky" />
      <ArticleList source="인프런" />
      <ArticleList source="캠퍼스픽" />
      <ArticleList source="HOLA" />
    </div>
  );
};

export default Home;
