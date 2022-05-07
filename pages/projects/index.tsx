import {
  Box,
  Label,
  Button,
  Flex,
  ProfilePlaceholder,
  SectionHeader,
  SectionBody,
  SectionBodyAlt,
} from "common/components";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { http } from "common/services";
import { Pagination } from "common/components/Pagination";
import { SOURCE, timeDiffString } from "utils";
import { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { ChildrenContainer } from "components";

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
  const handleArticleClick = (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    router.push(`/projects/${id}`);
  };

  const timeString = useMemo(() => timeDiffString(post.date), [post]);

  const theme = useTheme();

  return (
    <Box responsive column>
      <div
        css={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            width: "100%",
            flexWrap: "nowrap",
            boxSizing: "border-box",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            lineHeight: "1.2em",
          }}
        >
          <div
            css={{
              cursor: "pointer",
            }}
            onClick={(e) => handleArticleClick(e, post.id)}
          >
            <Flex
              css={{
                alignItems: "center",
                fontSize: "14px",
                marginBottom: "16px",
                gap: "8px",
              }}
            >
              <ProfilePlaceholder value={post.userName} size={24} />
              <span>
                {post.userName} · {timeString} · 댓글 3개 · 좋아요 6개
              </span>
            </Flex>
            <div
              css={{
                fontWeight: "700",
                fontSize: "18px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                marginBottom: "12px",
              }}
            >
              {post.postName}
            </div>
            <div
              css={{
                overflow: "hidden",
                fontSize: "16px",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                marginBottom: "16px",
              }}
            >
              {post.content}
            </div>
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
              background: "var(--outline)",
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
          <Label
            css={{
              backgroundColor: "var(--positive1)",
            }}
            variant="background"
            size="small"
          >
            {SOURCE[post.source]}
          </Label>
          <Label
            css={{ backgroundColor: "var(--positive1)" }}
            variant="background"
            size="small"
          >
            <div
              css={{
                width: "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: "#007acc",
                marginRight: "6px",
              }}
            />
            Typescript
          </Label>
          <Label
            css={{ backgroundColor: "var(--positive1)" }}
            variant="background"
            size="small"
          >
            <div
              css={{
                width: "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: "#539e43",
                marginRight: "6px",
              }}
            />
            node.js
          </Label>
          <Label
            css={{ backgroundColor: "var(--positive1)" }}
            variant="background"
            size="small"
          >
            <div
              css={{
                width: "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: "#61dafb",
                marginRight: "6px",
              }}
            />
            React
          </Label>
        </div>
      </div>
    </Box>
  );
};

const Project: NextPage = () => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const { data, isLoading, isError } = useQuery("projects", () =>
    fetchProjects(currentPage)
  );

  console.log("project");
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

  const theme = useTheme();

  if (!data || isLoading || isError) return null;

  return (
    <ChildrenContainer>
      <SectionHeader>
        <SectionHeader.Title>프로젝트/스터디 찾기</SectionHeader.Title>
        <SectionHeader.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </SectionHeader.Description>
      </SectionHeader>
      <SectionBodyAlt>
        <div css={{ display: "flex", "& > *+*": { marginLeft: "8px" } }}>
          <Button variant="primary-outlined">+ 태그 추가</Button>
          <Button variant="white">Typescript</Button>
          <Button variant="white">Vue</Button>
          <Button variant="white">Python</Button>
        </div>
      </SectionBodyAlt>
      <SectionBody>
        <Flex css={{ gap: "24px", flexWrap: "wrap", marginBottom: "56px" }}>
          <Flex column css={{ flex: "99999 1 480px", marginBottom: "-56px" }}>
            <ProjectPagination />
            {/* <DividingSection> */}
            <Flex
              column
              css={{
                gap: "12px",
              }}
            >
              {data?.content.map((post, i) => (
                <>
                  <Post post={post} key={i} />
                  {/* <hr
                css={{ borderTop: "1px solid var(--outline)", width: "100%" }}
              /> */}
                </>
              ))}
            </Flex>
            {/* </DividingSection> */}
            <ProjectPagination />
          </Flex>
          <Flex
            css={{
              marginTop: "56px",
              flex: "1 0 300px",
              gap: "12px",
              alignSelf: "flex-start",
              position: "sticky",
              top: "71px",
            }}
            column
          >
            <Box column>
              <Flex
                css={{
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "initial",
                  marginBottom: "20px",
                }}
              >
                <span
                  css={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "6px",
                    backgroundColor: "var(--primary)",
                    marginRight: "6px",
                  }}
                />
                이런 프로젝트는 어떠세요?
              </Flex>
              <Flex column css={{ gap: "20px" }}>
                <Flex column css={{ gap: "8px" }}>
                  <Flex
                    css={{
                      alignItems: "center",
                      fontSize: "13px",
                      gap: "8px",
                    }}
                  >
                    <span
                      css={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "12px",
                        backgroundColor: "lightgray",
                      }}
                    />
                    <span>Gildong Hong</span>
                  </Flex>
                  <p
                    css={{
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    황금 4일(목,금,토,일)동안 죙일 모각코 스터디원 모집(선착순
                    10명)
                  </p>
                </Flex>
                <Flex column css={{ gap: "8px" }}>
                  <Flex
                    css={{
                      alignItems: "center",
                      fontSize: "13px",
                      gap: "8px",
                    }}
                  >
                    <span
                      css={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "12px",
                        backgroundColor: "lightgray",
                      }}
                    />
                    <span>Gildong Hong</span>
                  </Flex>
                  <p
                    css={{
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    황금 4일(목,금,토,일)동안 죙일 모각코 스터디원 모집(선착순
                    10명)
                  </p>
                </Flex>
                <Flex column css={{ gap: "8px" }}>
                  <Flex
                    css={{
                      alignItems: "center",
                      fontSize: "13px",
                      gap: "8px",
                    }}
                  >
                    <span
                      css={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "12px",
                        backgroundColor: "lightgray",
                      }}
                    />
                    <span>Gildong Hong</span>
                  </Flex>
                  <p
                    css={{
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    황금 4일(목,금,토,일)동안 죙일 모각코 스터디원 모집(선착순
                    10명)
                  </p>
                </Flex>
              </Flex>
            </Box>
            <Box column>
              <Flex
                css={{
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "initial",
                  marginBottom: "20px",
                }}
              >
                <span
                  css={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "6px",
                    backgroundColor: "var(--primary)",
                    marginRight: "6px",
                  }}
                />
                지금 HOT한 프로젝트 🔥
              </Flex>
              <Flex column css={{ gap: "20px" }}>
                <Flex column css={{ gap: "8px" }}>
                  <Flex
                    css={{
                      alignItems: "center",
                      fontSize: "13px",
                      gap: "8px",
                    }}
                  >
                    <span
                      css={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "12px",
                        backgroundColor: "lightgray",
                      }}
                    />
                    <span>Gildong Hong</span>
                  </Flex>
                  <p
                    css={{
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    황금 4일(목,금,토,일)동안 죙일 모각코 스터디원 모집(선착순
                    10명)
                  </p>
                </Flex>
                <Flex column css={{ gap: "8px" }}>
                  <Flex
                    css={{
                      alignItems: "center",
                      fontSize: "13px",
                      gap: "8px",
                    }}
                  >
                    <span
                      css={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "12px",
                        backgroundColor: "lightgray",
                      }}
                    />
                    <span>Gildong Hong</span>
                  </Flex>
                  <p
                    css={{
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    황금 4일(목,금,토,일)동안 죙일 모각코 스터디원 모집(선착순
                    10명)
                  </p>
                </Flex>
                <Flex column css={{ gap: "8px" }}>
                  <Flex
                    css={{
                      alignItems: "center",
                      fontSize: "13px",
                      gap: "8px",
                    }}
                  >
                    <span
                      css={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "12px",
                        backgroundColor: "lightgray",
                      }}
                    />
                    <span>Gildong Hong</span>
                  </Flex>
                  <p
                    css={{
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    황금 4일(목,금,토,일)동안 죙일 모각코 스터디원 모집(선착순
                    10명)
                  </p>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </SectionBody>
    </ChildrenContainer>
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
