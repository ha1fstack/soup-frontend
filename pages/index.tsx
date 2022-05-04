import { Box, Flex, Button } from "common/components";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdOutlineArrowForward } from "react-icons/md";
import { useTheme } from "@emotion/react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styled from "@emotion/styled";
import { http } from "common/services";
import { ellipsis } from "polished";

const Article = ({ title, content }: { title: string; content: string }) => {
  const router = useRouter();
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/projects/1");
  };

  return (
    <Box
      column
      css={{
        padding: 0,
        flex: "1 0 300px",
        minWidth: "300px",
        height: "180px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
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
          {title}
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
          {content}
        </div>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row-reverse",
          margin: "0px 12px",
          padding: "12px 0px",
          justifyContent: "space-between",
          borderTop: "1px solid var(--outline)",
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
            <Image
              src="/stacks/react.png"
              alt="me"
              width="20px"
              height="20px"
            />
          </div>
        </div>
        <div css={{ fontWeight: "500", fontSize: "14px" }}>웹 개발</div>
      </div>
    </Box>
  );
};

const Spacer = styled.div`
  content: "";
  flex: 1 0 300px;
  visibility: hidden;
  margin: 0;
`;

const ArticleList = ({
  source,
  data,
}: {
  source: string;
  data?: Record<string, any>[];
}) => {
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
          gap: "12px",
        }}
      >
        {data?.map((item, i) => (
          <Article key={i} title={item.postName} content={item.content} />
        ))}
        <Spacer />
        <Spacer />
        <Spacer />
      </div>
    </div>
  );
};

const Lander = () => {
  const theme = useTheme();
  return (
    <Box
      column
      variant="primary"
      css={{
        backgroundImage: "url('/banner_background.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundBlendMode: "multiply",
        color: "var(--primary)",
        minHeight: "180px",
        overflow: "hidden",
        maxWidth: "720px",
        padding: "14px",
        justifyContent: "space-between",
      }}
    >
      <p css={{ fontSize: "28px", fontWeight: 700 }}>SouP</p>
      <Flex
        css={{
          lineHeight: "normal",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <p
          css={{
            textShadow:
              "2px 2px 2px  rgba(255, 238, 218, 0.5), -2px -2px 2px  rgba(255, 238, 218, 0.5), 2px -2px 2px  rgba(255, 238, 218, 0.5), -2px 2px 2px  rgba(255, 238, 218, 0.5);",
            fontSize: "20px",
            fontWeight: 500,
            flex: "9999 2 auto",
            zIndex: "1",
          }}
        >
          Lorem ipsum dolor <br /> sit amet, consectetur adipiscing elit.
        </p>
        <Button
          variant="primary"
          css={{
            fontSize: "24px",
            height: "48px",
            boxShadow: "0px 0px 40px 20px rgba(255, 238, 218, 0.5)",
            marginTop: "12px",
            flex: "1 0 auto",
          }}
        >
          <span
            css={{
              fontSize: "16px",
              padding: "4px",
            }}
          >
            시작하기 &nbsp;
          </span>
          <MdOutlineArrowForward />
        </Button>
      </Flex>
    </Box>
  );
};

const HotItem = ({ title, content }: any) => {
  return (
    <Flex
      column
      css={{
        gap: "16px",
        flex: "0 1 320px",
        overflow: "hidden",
      }}
    >
      <Image
        alt="hot1"
        src="https://i.imgur.com/tvzwhsF.png"
        width={320}
        height={180}
      />
      <Flex column css={{ gap: "8px" }}>
        <p
          css={{
            fontSize: "16px",
            fontWeight: "bold",
            ...ellipsis(undefined, 2),
          }}
        >
          {title}
        </p>
        <p css={{ fontSize: "14px", ...ellipsis(undefined, 3) }}>{content}</p>
      </Flex>
    </Flex>
  );
};

const NewItem = ({ title, content }: any) => {
  return (
    <Flex css={{ gap: "12px" }}>
      <span css={{ flex: "0 0 auto" }}>
        <Image
          alt="hot1"
          src="https://i.imgur.com/tvzwhsF.png"
          width={100}
          height={75}
        />
      </span>
      <Flex column css={{ gap: "4px" }}>
        <p css={{ fontSize: "16px", fontWeight: "bold" }}>{title}</p>
        <p
          css={{
            fontSize: "14px",
            ...ellipsis(undefined, 2),
          }}
        >
          {content}
        </p>
      </Flex>
    </Flex>
  );
};

const Home: NextPage = () => {
  const { data } = useQuery("front-projects", fetchFrontProjects);

  return (
    <div>
      <div
        css={{
          margin: "-36px -50vw 0 -50vw",
          padding: "36px 50vw 36px 50vw",
          backgroundColor: "var(--positive)",
          borderBottom: "1px solid var(--outline)",
        }}
      >
        <Flex
          css={{
            flexWrap: "wrap",
            gap: "72px",
          }}
        >
          <Flex
            column
            css={{
              flex: "3 1 0",
              gap: "24px",
              minWidth: "480px",
              marginBottom: "-36px",
              img: {
                borderRadius: "8px",
              },
            }}
          >
            <p css={{ fontSize: "20px", fontWeight: "bold" }}>
              Hot 스터디/프로젝트 🔥
            </p>
            <Flex css={{ gap: "36px" }}>
              <HotItem
                title="자바 ORM 표준 JPA 프로그래밍 - 기본편 스터디 모집합니다"
                content="스터디 주제 : 김영한님 자바 ORM 표준 JPA 프로그래밍 - 기본편 스터디 목표 : 완강 예상 스터디 일정(횟수) : 일주일에 한  번 디스코드 모임 (일요일 오전 10시~) 예상 커리..."
              />
              <HotItem
                title="프론트엔드 인터뷰 스터디 2명 모집"
                content="거리두기 해제로 인한 오프라인 스터디원을 충원합니다 현재 5명에 스터디원으로 이루어져 있고 현재 리액트는 스테이트 활용 컴포넌트활용까지 구현했으며 스터디 진행 방..."
              />
            </Flex>
          </Flex>
          <Flex
            column
            css={{
              flex: "2 1 0",
              gap: "24px",
              img: {
                borderRadius: "6px",
              },
              minWidth: "480px",
              maxWidth: "676px",
            }}
          >
            <p
              css={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              New 스터디/프로젝트 ✨
            </p>
            <Flex column css={{ gap: "16px" }}>
              <NewItem
                title="WebGl 스터디 인원을 모집합니다"
                content="Webgl 스터디 인원을 모집하고 잇습니다 ^^ 매주 토요일마다 정기모임 스터디가 잇으며 , 서로 열정을 가지고 공부하고 있습니다 [개발 스터..."
              />
              <NewItem
                title="Swift iOS app 개발 / 사이드 프로젝트 / 팀 구축"
                content="안녕하세요. 저는 프로그래밍쪽 전공을 졸업하고 , si 회사에서 근무 중인 개발자입니다. 최근 ios 개발에 대한 도전 / 이직을 위하여, 맹목적..."
              />
              <NewItem
                title="토이프로젝트 Application 기획자 모집 합니다 ^^"
                content="UI/UX 앱 디자이너 분 구합니다!! - 앱 주제: 토이프로젝트 or Side Project 공고 Application 토이 프로젝트와 Side Project 공고를 올..."
              />
            </Flex>
          </Flex>
        </Flex>
      </div>
      {/* <Lander /> */}
      {/*<ArticleList data={data?.slice(20, 24)} source="SouP" />*/}
      <ArticleList data={data?.OKKY.slice(0, 8)} source="Okky" />
      <ArticleList data={data?.INFLEARN.slice(0, 8)} source="인프런" />
      <ArticleList data={data?.CAMPICK.slice(0, 8)} source="캠퍼스픽" />
      <ArticleList data={data?.HOLA.slice(0, 8)} source="HOLA" />
    </div>
  );
};

const fetchFrontProjects = async () => {
  const res = await http.get<{
    OKKY: any[];
    INFLEARN: any[];
    CAMPICK: any[];
    HOLA: any[];
  }>("/front-projects");
  return res.data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("front-projects", fetchFrontProjects);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
