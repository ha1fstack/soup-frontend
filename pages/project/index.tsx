import { Box, Label, Button, Flex } from "common/components";
import { SectionHeader, DividingSection } from "common/components/Section";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { http } from "common/services";
import { Pagination } from "common/components/Pagination";
import { AppContext } from "next/app";
import { timeDiffString } from "utils";
import { useMemo } from "react";

interface Pageable<T> {
  content: T;
  pageable: {
    sort: { empty: true; sorted: false; unsorted: true };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
interface Post {
  content: string;
  date: string;
  end: boolean;
  id: number;
  link: string;
  postId: number;
  postName: string;
  stack: string;
  talk: string;
  userName: string;
  views: number;
  source: "SOUP" | "INFLEARN" | "OKKY" | "CAMPICK" | "HOLA";
}

const Post = ({ image, post }: { image?: boolean; post: Post }) => {
  const router = useRouter();
  const handleArticleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/project/1");
  };

  const timeString = useMemo(() => timeDiffString(post.date), [post]);

  return (
    <Box
      responsive
      column
      css={{
        minWidth: "480px",
        flex: "40%",
        padding: 0,
        height: "170px",
      }}
    >
      <div
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          padding: "10px 12px 8px 12px",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            width: "100%",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            height: "100%",
            flex: "0 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            lineHeight: "1.2em",
            paddingBottom: "6px",
            borderBottom: "1px solid #E0E3E7",
          }}
        >
          <div
            css={{
              cursor: "pointer",
            }}
            onClick={handleArticleClick}
          >
            <div
              css={{
                fontWeight: "500",
                fontSize: "16px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                marginBottom: "8px",
              }}
            >
              {post.postName}
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
              {post.content}
            </div>
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
            by <b>{post.userName}</b> · {timeString} · 댓글 3개
          </div>
        </div>
        {image ? (
          <div
            css={{
              boxSizing: "border-box",
              marginLeft: "16px",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
              flex: "0 0 auto",
              background: "#ECEFF1",
              width: "120px",
            }}
          >
            <Image
              css={{ objectFit: "cover" }}
              src="https://i.imgur.com/tvzwhsF.png"
              alt="thumb"
              layout="fill"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          margin: "8px",
          marginTop: 0,
          justifyContent: "space-between",
          alignItems: "center",
          lineHeight: "normal",
        }}
      >
        <div
          css={{
            fontWeight: 500,
            display: "flex",
            "& > *+*": { marginLeft: "8px" },
          }}
        >
          <Label variant="white" size="small">
            {post.source}
          </Label>
          <Label variant="white" size="small">
            웹 개발
          </Label>
          <Label variant="white" size="small">
            <div
              css={{
                height: "20px",
                width: "20px",
                marginLeft: "-2px",
                marginRight: "4px",
              }}
            >
              <Image src="/stacks/ts.png" alt="me" width="24px" height="24px" />
            </div>
            Typescript
          </Label>
          <Label variant="white" size="small">
            <div
              css={{
                height: "20px",
                width: "20px",
                marginLeft: "-2px",
                marginRight: "4px",
              }}
            >
              <Image
                src="/stacks/node.png"
                alt="me"
                width="24px"
                height="24px"
              />
            </div>
            node.js
          </Label>
          <Label variant="white" size="small">
            <div
              css={{
                height: "20px",
                width: "20px",
                marginLeft: "-2px",
                marginRight: "4px",
              }}
            >
              <Image
                src="/stacks/react.png"
                alt="me"
                width="24px"
                height="24px"
              />
            </div>
            React
          </Label>
        </div>
        <div
          css={{
            cursor: "pointer",
            display: "flex",
            color: "#616b77",
            alignItems: "center",
          }}
        >
          <span css={{ fontSize: "13px" }}>6</span>
          <div
            css={{
              fontSize: "17px",
              marginLeft: "4px",
              marginRight: "4px",
            }}
          >
            <MdOutlineFavoriteBorder />
          </div>
        </div>
      </div>
    </Box>
  );
};

const Project: NextPage = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const { data } = useQuery("projects", () => fetchProjects(currentPage));

  console.log(data);

  const ProjectPagination = () => (
    <Pagination
      css={{ justifyContent: "center", margin: "12px 0px" }}
      onClick={(i) => {
        router.push({
          query: {
            page: String(i),
          },
        });
      }}
      current={currentPage}
      end={data?.totalPages || 0}
    />
  );

  return (
    <div>
      <SectionHeader>
        <SectionHeader.Title>프로젝트/스터디 찾기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <DividingSection>
        <div css={{ display: "flex", "& > *+*": { marginLeft: "8px" } }}>
          <Button variant="primary-outlined">+ 태그 추가</Button>
          <Button variant="white">Typescript</Button>
          <Button variant="white">Vue</Button>
          <Button variant="white">Python</Button>
        </div>
      </DividingSection>
      <ProjectPagination />
      <Flex
        css={{
          flexWrap: "wrap",
          margin: "12px 0px",
          gap: "12px",
        }}
      >
        {data?.content.map((post, i) => (
          <Post post={post} key={i} />
        ))}
      </Flex>
      <ProjectPagination />
    </div>
  );
};

const fetchProjects = async (page = 1) => {
  console.log(`/projects?page=${page}`);
  const res = await http.get<Pageable<Post[]>>(`/projects?page=${page}`);
  return res.data;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  console.log(context.query.page);

  await queryClient.prefetchQuery("projects", () =>
    fetchProjects(parseInt(context.query.page as string) || 1)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Project;
