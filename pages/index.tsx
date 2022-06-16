import {
  Box,
  Flex,
  Button,
  SectionBody,
  SectionBodyAlt,
  ProfilePlaceholder,
  Hr,
  Label,
  CarouselPagination,
} from "common/components";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdOutlineArrowForward } from "react-icons/md";
import { useTheme } from "@emotion/react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styled from "@emotion/styled";
import { http } from "common/services";
import { ellipsis } from "polished";
import { ChildrenContainer } from "components";
import {
  ISource,
  SourceDictionary,
  SourceList,
  timeDiffString,
  toMatrix,
} from "utils";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { getDisplayTag, ITag } from "utils/tagDictionary";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperType, { Pagination, Navigation, Autoplay } from "swiper";

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
            flex: "99999 2 auto",
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

const HotItem = ({ post }: { post: IPostPreviewContent }) => {
  const router = useRouter();

  return (
    <Flex
      column
      onClick={() => router.push(`/projects/${post.id}`)}
      css={{
        gap: "16px",
        flex: "0 1 320px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Image
        alt="hot1"
        src="https://i.imgur.com/hVe2ScX.png"
        width={320}
        height={180}
      />
      <Flex column css={{ gap: "8px" }}>
        <p
          css={{
            fontSize: "16px",
            fontWeight: "600",
            ...ellipsis(undefined, 2),
          }}
        >
          {post.postName}
        </p>
        <p css={{ fontSize: "13px", ...ellipsis(undefined, 2) }}>
          {post.content}
        </p>
      </Flex>
    </Flex>
  );
};

const NewItem = ({ post }: { post: IPostPreviewContent }) => {
  const router = useRouter();

  return (
    <Flex
      onClick={() => router.push(`/projects/${post.id}`)}
      css={{ gap: "16px", cursor: "pointer" }}
    >
      <span css={{ flex: "0 0 auto", height: "75px" }}>
        <Image
          alt="hot1"
          src="https://i.imgur.com/oEdONmz.jpeg"
          width={100}
          height={75}
        />
      </span>
      <Flex
        column
        css={{ flex: "1", width: 0, gap: "4px", overflow: "hidden" }}
      >
        <p
          css={{
            fontSize: "16px",
            fontWeight: "600",
            ...ellipsis(),
          }}
        >
          {post.postName}
        </p>
        <p
          css={{
            fontSize: "13px",
            ...ellipsis(undefined, 2),
          }}
        >
          {post.content}
        </p>
      </Flex>
    </Flex>
  );
};

interface IPostPreviewContent {
  id: number;
  postName: string;
  content: string;
  userName: string;
  date: string;
  link: "https://okky.kr/article/1221052";
  stacks: ITag[];
  views: number;
  talk: string;
  source: string;
  fav: number;
  isfav: boolean;
}

const PostItem = ({ post }: { post: IPostPreviewContent }) => {
  const router = useRouter();

  return (
    <Flex
      onClick={() => router.push(`/projects/${post.id}`)}
      css={{ gap: "16px", alignItems: "stretch", cursor: "pointer" }}
    >
      <Flex
        column
        css={{
          gap: "16px",
          alignItems: "center",
          flex: "0 0 auto",
        }}
      >
        <ProfilePlaceholder size={32} value={post.userName} />
      </Flex>
      <Flex
        column
        css={{ gap: "4px", flex: "1 1 auto", overflow: "hidden", width: 0 }}
      >
        <p
          css={{
            fontSize: "16px",
            fontWeight: "600",
            ...ellipsis(),
          }}
        >
          {post.postName}
        </p>
        <p
          css={{
            fontSize: "14px",
            whiteSpace: "pre-line",
            ...ellipsis(undefined, 3),
          }}
        >
          {post.content}
        </p>
        <Flex css={{ gap: "12px", marginTop: "4px" }}>
          {post.stacks.map((stack) => (
            <Label size="smaller" key={stack}>
              {getDisplayTag(stack)}
            </Label>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

const LoungeItem = ({ post }: { post: ILoungePost }) => {
  return (
    <Flex css={{ gap: "12px", alignItems: "stretch" }}>
      <Flex
        column
        css={{
          gap: "16px",
          alignItems: "center",
          flex: "0 0 auto",
        }}
      >
        <Image
          css={{
            width: "32px",
            height: "32px",
            borderRadius: "99999px",
            overflow: "hidden",
          }}
          width="32px"
          height="32px"
          alt="profile"
          src={post.picture}
        />
      </Flex>
      <Flex column css={{ gap: "4px", flex: "1 1 auto" }}>
        <Flex css={{ justifyContent: "space-between", alignItems: "center" }}>
          <p css={{ fontSize: "14px" }}>
            <b>{post.username}</b> · {timeDiffString(post.date)}
          </p>
        </Flex>
        <div
          css={{
            fontSize: "14px",
            whiteSpace: "pre-line",
            ...ellipsis(undefined, 3),
          }}
        >
          {post.content}
        </div>
      </Flex>
    </Flex>
  );
};

const useSource = (initialSource: ISource) => {
  const [source, setSource] = useState<ISource>(initialSource);
  const sourceDisplayName = SourceDictionary[source];
  return [source, sourceDisplayName, setSource] as [
    ISource,
    string,
    Dispatch<SetStateAction<ISource>>
  ];
};

const Projects = () => {
  const { data, isLoading, isError } = useQuery(
    "front/projects",
    fetchFrontProjects
  );
  const [source, sourceDisplayName, setSource] = useSource(
    SourceList[(Math.random() * SourceList.length) | 0]
  );

  if (!data || isLoading || isError)
    return <Flex column css={{ flex: "3 1 480px" }} />;
  console.log(data);

  return (
    <Flex column css={{ flex: "99999 1 480px", gap: "12px" }}>
      <p
        css={{
          fontSize: "20px",
          fontWeight: "700",
          "& > *+*": { marginLeft: "12px" },
        }}
      >
        {SourceList.map((currentSource, i) => (
          <span
            onClick={() => setSource(currentSource)}
            key={i}
            css={{
              color: source === currentSource ? undefined : "var(--disabled)",
              fontWeight: source === currentSource ? undefined : 500,
              cursor: "pointer",
            }}
          >
            {SourceDictionary[currentSource]}
          </span>
        ))}
      </p>
      <Box responsive column css={{ gap: "16px", padding: "16px 12px" }}>
        {data[source].map((post, i) => (
          <Fragment key={post.id}>
            {i !== 0 && <Hr />}
            <PostItem post={post} />
          </Fragment>
        ))}
      </Box>
    </Flex>
  );
};

interface ILoungePost {
  date: string;
  user_id: number;
  fav: number;
  lounge_id: number;
  isfav: boolean;
  picture: string;
  content: string;
  username: string;
}

const Lounge = () => {
  const { data, isLoading, isError } = useQuery("lounge", async () => {
    return (await http.get<ILoungePost[]>("/lounge")).data;
  });

  const router = useRouter();

  if (!data || isLoading || isError)
    return <Flex column css={{ flex: "1 1 440px" }} />;
  return (
    <Flex column css={{ flex: "1 1 440px", gap: "12px" }}>
      <p
        css={{
          fontSize: "20px",
          fontWeight: "700",
          "& > *+*": { marginLeft: "12px" },
        }}
      >
        <span>라운지</span>
      </p>
      <Box
        onClick={() => router.push("/lounge")}
        responsive
        column
        css={{ gap: "16px", padding: "16px 12px", cursor: "pointer" }}
      >
        {data.map((post, i) => (
          <Fragment key={post.lounge_id}>
            {i !== 0 && <Hr />}
            <LoungeItem post={post} />
          </Fragment>
        ))}
      </Box>
    </Flex>
  );
};

const HotFeatured = () => {
  const { data, isLoading, isError } = useQuery(
    "front/featured",
    fetchFrontFeatured
  );

  const content = useMemo(() => toMatrix(data?.HOT || [], 2), [data]);
  const [pagination, setPagination] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  if (!data || isLoading || isError) return null;

  return (
    <Flex
      column
      css={{
        flex: "99999 1 0",
        gap: "24px",
        minWidth: "480px",
        marginBottom: "-36px",
        img: {
          borderRadius: "8px",
        },
      }}
    >
      <Flex css={{ alignItems: "center", justifyContent: "space-between" }}>
        <span css={{ fontSize: "20px", fontWeight: "bold" }}>
          Hot 스터디/프로젝트 🔥
        </span>
        <CarouselPagination
          swiperRef={swiperRef}
          current={pagination}
          end={content.length}
        />
      </Flex>
      <Swiper
        onSwiper={(ref) => (swiperRef.current = ref)}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        spaceBetween={72}
        onSlideChange={(swiper) => setPagination(swiper.realIndex)}
      >
        {content.map((content, i) => (
          <SwiperSlide key={i}>
            <Flex css={{ gap: "36px" }}>
              {content.map((post) => (
                <HotItem key={post.id} post={post} />
              ))}
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

const NewFeatured = () => {
  const { data, isLoading, isError } = useQuery(
    "front/featured",
    fetchFrontFeatured
  );

  if (!data || isLoading || isError) return null;

  return (
    <Flex
      column
      css={{
        flex: "1 1 440px",
        gap: "24px",
        img: {
          borderRadius: "6px",
        },
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
      <Flex column css={{ gap: "24px" }}>
        {data.NEW.slice(0, 3).map((post) => (
          <NewItem key={post.id} post={post} />
        ))}
      </Flex>
    </Flex>
  );
};

const Featured = () => {
  return (
    <Flex
      css={{
        flexWrap: "wrap",
        gap: "96px",
        overflow: "hidden",
      }}
    >
      <HotFeatured />
      <NewFeatured />
    </Flex>
  );
};

const Home: NextPage = () => {
  const theme = useTheme();

  return (
    <ChildrenContainer>
      <SectionBodyAlt
        css={{
          [theme.breakpoints.at("sm")]: {
            paddingTop: "24px",
          },
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: "#111",
          color: "#ffffff",
          borderBottom: "1px solid var(--outline)",
          marginBottom: "0",
          height: "300px",
          zIndex: -2,
        }}
      >
        <Flex
          css={{
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Flex
            column
            css={{
              gap: "72px",
              alignItems: "flex-start",
            }}
          >
            <Label variant="primary" css={{ color: "#111", fontWeight: "700" }}>
              프로모션
            </Label>
            <Flex column css={{ gap: "12px" }}>
              <p css={{ fontWeight: "700", fontSize: "24px" }}>
                프론트엔드 BEST 강의
                <br />
                SouP에서만 30% 할인중👌
              </p>
              <p>입문부터 실전까지, 믿고 보는 실무자 Pick</p>
            </Flex>
          </Flex>
          <Image
            alt="front-banner"
            src="https://i.imgur.com/7FfQL9b.png"
            width="240"
            height="240"
          />
        </Flex>
      </SectionBodyAlt>
      <SectionBodyAlt
        css={{
          paddingTop: "32px",
          [theme.breakpoints.at("sm")]: {
            paddingTop: "24px",
          },
          paddingBottom: "44px",
          border: "0px",
          borderBottom: "1px solid var(--outline)",
          marginBottom: "36px",
        }}
      >
        <Featured />
      </SectionBodyAlt>
      <SectionBody>
        <Flex css={{ gap: "36px", flexWrap: "wrap" }}>
          <Projects />
          <Lounge />
        </Flex>
        {/* <Lander /> */}
      </SectionBody>
    </ChildrenContainer>
  );
};

const fetchFrontProjects = async () => {
  const res = await http.get<{
    SOUP: IPostPreviewContent[];
    OKKY: IPostPreviewContent[];
    INFLEARN: IPostPreviewContent[];
    CAMPICK: IPostPreviewContent[];
    HOLA: IPostPreviewContent[];
  }>("/front/projects");
  return res.data;
};

const fetchFrontFeatured = async () => {
  const res = await http.get<{
    NEW: IPostPreviewContent[];
    HOT: IPostPreviewContent[];
  }>("/front/featured");
  return res.data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  let res = await Promise.all([
    queryClient.prefetchQuery("front/featured", fetchFrontFeatured),
    // queryClient.prefetchQuery("front/projects", fetchFrontProjects),
  ]);

  console.log(res);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
