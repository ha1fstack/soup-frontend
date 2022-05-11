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
import {
  ComponentProps,
  ComponentPropsWithRef,
  PropsWithoutRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { keyframes, useTheme } from "@emotion/react";
import { ChildrenContainer } from "components";
import styled from "@emotion/styled";
import React from "react";
import {
  MdOutlineCheck,
  MdOutlineClose,
  MdOutlineLabel,
  MdOutlineSearch,
} from "react-icons/md";
import { useToggle } from "hooks/useToggle";
import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

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
  stacks: string[];
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
          {post.stacks.map((stack) => (
            <Label
              key={stack}
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
              {stack}
            </Label>
          ))}
          {/* <Label
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
          </Label> */}
        </div>
      </div>
    </Box>
  );
};

const MarqueeAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

const ts = {
  height: "36px",
  overflow: "hidden",
  flex: "0 0 auto",
  backgroundColor: "var(--positive1)",
  border: 0,
};

const Test = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { addFilter } = useFilter();
  const shuffle = useMemo(
    () => STACKS.slice().sort(() => Math.random() - 0.5),
    []
  );

  return (
    <span
      css={{
        display: "inline-flex",
        animation: `${MarqueeAnimation} ${STACKS.length * 15}s linear infinite`,
        "& > *": { marginRight: "12px" },
      }}
      ref={ref}
    >
      {shuffle.map((stack, i) => (
        <Button onClick={() => addFilter(stack)} key={i} css={ts}>
          {stack}
        </Button>
      ))}
    </span>
  );
});
Test.displayName = "test";

const Slider = ({ toggle }: { toggle: (set?: boolean) => void }) => {
  const surroundingBackup = 1;
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = React.useState<number>(0);

  const backupHeight = height * surroundingBackup;

  React.useLayoutEffect(() => {
    if (contentRef.current && scrollRef.current) {
      setHeight(contentRef.current.offsetWidth);
      scrollRef.current.scrollLeft = backupHeight;
    }
  }, [backupHeight]);

  const onWheel = React.useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerScrollPosition = scrollRef.current.scrollLeft;
    container.style.scrollBehavior = "auto";
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY * 0.25,
    });
  }, []);

  const onScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const scroll = scrollRef.current.scrollLeft;
      if (scroll < backupHeight || scroll >= backupHeight + height) {
        scrollRef.current.scrollTo({
          top: 0,
          left: backupHeight + (scroll % height),
          behavior: "auto",
        });
      }
    }
  }, [backupHeight, height]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.addEventListener("wheel", onWheel);
    const ref = scrollRef.current;
    return () => {
      ref.removeEventListener("wheel", onWheel);
    };
  }, [onWheel]);

  return (
    <>
      <Flex
        ref={scrollRef}
        onScroll={onScroll}
        css={{
          marginLeft: "12px",
          marginRight: "-12px",
          overflow: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          position: "relative",
          "& > *": {
            whiteSpace: "nowrap",
          },
          display: "inline-flex",
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "::-webkit-scrollbar": {
            display: "none",
          },
          ":hover": {
            "*": {
              animationPlayState: "paused",
            },
          },
        }}
      >
        {Array(surroundingBackup)
          .fill(undefined)
          .map((i) => (
            <Test key={i} />
          ))}
        <Test ref={contentRef} />
        {Array(surroundingBackup + 1)
          .fill(undefined)
          .map((i) => (
            <Test key={i} />
          ))}
      </Flex>
      <div css={{ position: "absolute" }}>
        <Button
          variant="primary-outlined"
          css={{
            height: "36px",
            width: "36px",
            padding: 0,
            backgroundColor: "var(--primarylight2)",
          }}
          onClick={() => toggle()}
        >
          <MdOutlineSearch css={{ fontSize: "18px" }} />
        </Button>
      </div>
    </>
  );
};

type IMenuCategory =
  | "popular"
  | "field"
  | "language"
  | "frontend"
  | "backend"
  | "app"
  | "etc"
  | "all";
const MENU: {
  displayName: string;
  key: IMenuCategory;
  items: string[];
}[] = [
  {
    displayName: "인기",
    key: "popular",
    items: [
      "React",
      "Angular",
      "Vue",
      "Spring",
      "Python",
      "Node.js",
      "Java",
      "Typescript",
      "Javascript",
    ],
  },
  {
    displayName: "분야",
    key: "field",
    items: [
      "스터디",
      "프로젝트",
      "기획",
      "서비스",
      "코테",
      "프론트엔드",
      "백엔드",
      "모바일",
      "UI/UX",
      "AI/머신러닝",
      "게임",
      "블록체인",
    ],
  },
  {
    displayName: "언어",
    key: "language",
    items: [
      "Javascript",
      "Typescript",
      "Python",
      "Java",
      "Kotlin",
      "C/C++",
      "C#",
      "Swift",
      "Dart(Flutter)",
    ],
  },
  {
    displayName: "프론트엔드",
    key: "frontend",
    items: [
      "프론트엔드",
      "Javascript",
      "Typescript",
      "React",
      "Vue",
      "Angular",
      "Svelte",
    ],
  },
  {
    displayName: "백엔드",
    key: "backend",
    items: [
      "백엔드",
      "Java",
      "Node.js",
      "Go",
      "Python",
      "Spring",
      "Django",
      "Nestjs",
      "Express",
      "GraphQL",
      "SQL",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    displayName: "모바일",
    key: "app",
    items: [
      "모바일",
      "Java",
      "Kotlin",
      "Swift",
      "Dart(Flutter)",
      "React Native",
    ],
  },
  {
    displayName: "기타",
    key: "etc",
    items: ["AWS", "Kubernetes", "Docker", "Git"],
  },
];
const STACKS = Array.from(
  new Set(MENU.reduce((acc, cur) => acc.concat(cur.items), [] as string[]))
);

const useSearchMenu = (initial: IMenuCategory) => {
  const [state, setState] = useState<IMenuCategory>(initial);
  const currentMenu = useMemo(
    () => MENU.find((menu) => menu.key === state)!,
    [state]
  );

  return [currentMenu, setState] as [typeof currentMenu, typeof setState];
};

const filterState = atom<string[]>({
  key: "filterState",
  default: [],
});

const useFilter = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const resetFilter = useCallback(() => setFilter([]), []);
  const addFilter = useCallback(
    (x: string) => {
      if (filter.length < 3 && !filter.includes(x)) setFilter([...filter, x]);
    },
    [filter, setFilter]
  );
  const removeFilter = useCallback(
    (i) => setFilter([...filter.slice(0, i), ...filter.slice(i + 1)]),
    [filter, setFilter]
  );
  return { filter, resetFilter, addFilter, removeFilter };
};

const Search = ({ toggle }: { toggle: (set?: boolean) => void }) => {
  const [currentMenu, setCurrentMenu] = useSearchMenu("popular");
  const { addFilter } = useFilter();

  return (
    <Flex column css={{ flex: "1", gap: "16px" }}>
      <Flex css={{ gap: "16px" }}>
        <Button
          variant="primary-outlined"
          css={{
            height: "36px",
            width: "36px",
            padding: 0,
            backgroundColor: "var(--primarylight2)",
          }}
          onClick={() => toggle()}
        >
          <MdOutlineCheck css={{ fontSize: "18px" }} />
        </Button>
        <Flex
          css={{
            gap: "12px",
            "*": {
              padding: "16px",
              height: "36px",
              alignItems: "center",
              flex: 1,
              wordBreak: "keep-all",
              whiteSpace: "nowrap",
            },
          }}
        >
          {MENU.map((menu) => (
            <Button
              key={menu.key}
              onClick={() => setCurrentMenu(menu.key)}
              css={{
                backgroundColor:
                  menu.key === currentMenu.key
                    ? "var(--primarylight)"
                    : "var(--positive)",
                border: 0,
              }}
            >
              {menu.displayName}
            </Button>
          ))}
        </Flex>
      </Flex>
      <Flex css={{ flexWrap: "wrap", gap: "12px" }}>
        {currentMenu.items.map((stack, i) => (
          <Button
            onClick={() => addFilter(stack)}
            key={i}
            css={{ border: 0, backgroundColor: "var(--positive1)" }}
          >
            {stack}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

const TagSearch = () => {
  const [isSearchMode, toggleIsSearchMode] = useToggle(false);

  return (
    <Flex css={{ flexWrap: "wrap", marginTop: "-56px" }}>
      <Box
        css={{
          flex: "99999 1 480px",
          overflow: "hidden",
        }}
      >
        {isSearchMode ? (
          <Search toggle={toggleIsSearchMode} />
        ) : (
          <Slider toggle={toggleIsSearchMode} />
        )}
      </Box>
      <div css={{ flex: "1 0 300px", height: 0, marginLeft: "24px" }}></div>
    </Flex>
  );
};

const FilterList = () => {
  const { filter, removeFilter } = useFilter();

  return (
    <Flex column css={{ gap: "12px", marginBottom: "31px" }}>
      <div
        css={{
          display: "flex",
          gap: "12px",
          "& > *": { fontSize: "14px" },
        }}
      >
        <Label css={{ padding: "0px 8px" }}>
          <MdOutlineLabel css={{ fontSize: "18px" }} />
          {!filter.length && (
            <span css={{ marginLeft: "4px" }}>
              태그를 3개까지 추가해 검색해보세요...
            </span>
          )}
        </Label>
        {filter.map((item, i) => (
          <Label css={{ border: 0, fontSize: "16px" }} key={item}>
            {item}
            <Button
              css={{
                width: "16px",
                height: "16px",
                borderRadius: "18px",
                padding: 0,
                margin: "0px -4px 0px 6px",
                fontSize: "11px",
                color: "var(--negative2)",
              }}
              onClick={() => removeFilter(i)}
            >
              <MdOutlineClose />
            </Button>
          </Label>
        ))}
      </div>
    </Flex>
  );
};

const FeaturedHeader = ({ content }: { content: string }) => (
  <Flex
    css={{
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "initial",
      marginBottom: "24px",
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
    {content}
  </Flex>
);

const FeaturedItem = ({ userName, title, id }: IFeaturedItem) => {
  const router = useRouter();
  return (
    <Flex
      onClick={() => router.push(`/projects/${id}`)}
      column
      css={{ gap: "8px", cursor: "pointer" }}
    >
      <Flex
        css={{
          alignItems: "center",
          fontSize: "13px",
          gap: "8px",
          fontWeight: "500",
        }}
      >
        <ProfilePlaceholder size={20} value={userName} />
        <span css={{ lineHeight: "initial" }}>{userName}</span>
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
        {title}
      </p>
    </Flex>
  );
};

interface IFeaturedItem {
  title: string;
  userName: string;
  id: number;
}

const Featured = () => {
  const { data, isLoading, isError } = useQuery(
    "projects/featured",
    async () => {
      return (
        await http.get<{
          RECOMMEND: IFeaturedItem[];
          HOT: IFeaturedItem[];
        }>("/projects/featured")
      ).data;
    }
  );
  if (!data || isLoading || isError)
    return (
      <Flex
        css={{
          flex: "1 0 300px",
        }}
      />
    );
  return (
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
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader content="이런 프로젝트는 어떠신가요?" />
        <Flex column css={{ gap: "20px" }}>
          {data.RECOMMEND.map(({ title, userName, id }) => (
            <FeaturedItem key={id} title={title} userName={userName} id={id} />
          ))}
        </Flex>
      </Box>
      <Box css={{ padding: "14px 12px" }} column>
        <FeaturedHeader content="지금 HOT한 프로젝트 🔥" />
        <Flex column css={{ gap: "20px" }}>
          {data.HOT.map(({ title, userName, id }) => (
            <FeaturedItem key={id} title={title} userName={userName} id={id} />
          ))}
        </Flex>
      </Box>
    </Flex>
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

  const ProjectPagination = ({
    className,
  }: {
    className?: string | undefined;
  }) => (
    <Pagination
      css={{ justifyContent: "center", margin: "12px 0px" }}
      className={className}
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
        <FilterList />
      </SectionBodyAlt>

      <SectionBody>
        <TagSearch />
        <Flex css={{ gap: "24px", flexWrap: "wrap", marginBottom: "56px" }}>
          <Flex column css={{ flex: "99999 1 480px", marginBottom: "-56px" }}>
            <ProjectPagination />
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
            <ProjectPagination />
          </Flex>
          <Featured />
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
