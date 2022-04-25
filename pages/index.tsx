import { Box, Flex, Button } from "common/components";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdOutlineArrowForward } from "react-icons/md";
import { useTheme } from "@emotion/react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styled from "@emotion/styled";
import { http } from "common/services";

const Article = ({ title, content }: { title: string; content: string }) => {
  const router = useRouter();
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/project/1");
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
        color: theme.color.primary,
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

const Home: NextPage = () => {
  const { data } = useQuery("front-projects", getFrontProjects);

  return (
    <div>
      <Lander />
      {/*<ArticleList data={data?.slice(20, 24)} source="SouP" />*/}
      <ArticleList data={data?.OKKY.slice(0, 8)} source="Okky" />
      <ArticleList data={data?.INFLEARN.slice(0, 8)} source="인프런" />
      <ArticleList data={data?.CAMPICK.slice(0, 8)} source="캠퍼스픽" />
      <ArticleList data={data?.HOLA.slice(0, 8)} source="HOLA" />
    </div>
  );
};

const getFrontProjects = async () => {
  const res = await http.get<{
    OKKY: any[];
    INFLEARN: any[];
    CAMPICK: any[];
    HOLA: any[];
  }>("/front-projects");
  return res.data;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("front-projects", getFrontProjects);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
