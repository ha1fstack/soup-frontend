import {
  Box,
  Flex,
  Section,
  ProfilePlaceholder,
  Hr,
  Label,
  CarouselPagination,
} from "common/components";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { css } from "@emotion/react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { ellipsis } from "polished";
import { createPageLayout } from "components";
import {
  breakpoints,
  ISource,
  SourceDictionary,
  SourceList,
  timeDiffString,
  toMatrix,
  getDisplayTag,
  injectSession,
} from "lib/utils";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperType, { Autoplay, EffectFade } from "swiper";
import React from "react";
import Link from "next/link";
import { IPostPreviewContent, ILoungePost, CustomNextPage } from "types";
import {
  fetchFrontFeatured,
  fetchFrontProjects,
  fetchLounge,
} from "lib/queries";
import { Banner } from "components/Banner";

const Home: CustomNextPage = () => {
  return (
    <>
      <BannerCarousel />
      <Section bleed css={FeaturedSectionStyle}>
        <Featured />
      </Section>
      <Section>
        <Flex css={{ gap: "36px", flexWrap: "wrap" }}>
          <Projects />
          <Lounge />
        </Flex>
      </Section>
    </>
  );
};

Home.getLayout = createPageLayout({});

export default Home;

const SwiperSection = Section.withComponent(Swiper);

const BannerCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [pagination, setPagination] = useState(0);

  return (
    <Swiper
      css={css`
        grid-column: 1 / 5;
      `}
      onSwiper={(ref) => (swiperRef.current = ref)}
      loop={true}
      autoplay={{
        delay: 300000,
        disableOnInteraction: false,
      }}
      effect={"fade"}
      modules={[Autoplay, EffectFade]}
      onSlideChange={(swiper) => setPagination(swiper.realIndex)}
    >
      <SwiperSlide key={0}>
        <Banner
          color="#fff"
          backgroundColor="#111"
          label="안내사항"
          title={
            <>
              흩어져 있는 스터디와 프로젝트 모집,
              <br />
              이젠 SouP에서 편하게 모아보세요
            </>
          }
        />
      </SwiperSlide>
      <SwiperSlide key={0}>
        <Banner
          color="#111"
          backgroundColor="#ffd3cc"
          label="프로모션"
          title={
            <>
              프론트엔드 BEST 강의
              <br />
              SouP에서만 30% 할인중👌
            </>
          }
          description={<>입문부터 실전까지, 믿고 보는 실무자 Pick</>}
        />
      </SwiperSlide>
    </Swiper>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    utils                                   */
/* -------------------------------------------------------------------------- */

const useSource = (initialSource: ISource) => {
  const [source, setSource] = useState<ISource>(initialSource);
  return [source, setSource] as [ISource, Dispatch<SetStateAction<ISource>>];
};

/* -------------------------------------------------------------------------- */
/*                                   styles                                   */
/* -------------------------------------------------------------------------- */

const FeaturedSectionStyle = css({
  paddingTop: "32px",
  [breakpoints.at("sm")]: {
    paddingTop: "24px",
  },
  paddingBottom: "44px",
  border: "0px",
  borderBottom: "1px solid var(--outline)",
});

/* -------------------------------------------------------------------------- */
/*                                 components                                 */
/* -------------------------------------------------------------------------- */

const Projects = () => {
  const styles = {
    Wrapper: css({
      flex: "99999 1 480px",
      gap: "12px",
    }),
    HeaderWrapper: css({
      fontSize: "20px",
      fontWeight: "700",
      "& > *+*": { marginLeft: "12px" },
    }),
  };

  const { data, isLoading, isError } = useQuery("front/projects", () =>
    fetchFrontProjects()
  );
  const [source, setSource] = useSource(
    SourceList[(Math.random() * SourceList.length) | 0]
  );

  if (!data || isLoading || isError)
    return <Flex column css={{ flex: "3 1 480px" }} />;

  return (
    <Flex column css={styles.Wrapper}>
      <p css={styles.HeaderWrapper}>
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

const Lounge = () => {
  const styles = {
    Wrapper: css({ flex: "1 1 440px", gap: "12px" }),
    HeaderWrapper: css({
      fontSize: "20px",
      fontWeight: "700",
    }),
    ContentWrapper: css({
      gap: "16px",
      padding: "16px 12px",
      cursor: "pointer",
    }),
  };

  const { data, isLoading, isError } = useQuery("lounge", () => fetchLounge());

  if (!data || isLoading || isError) return null;

  return (
    <Flex column css={styles.Wrapper}>
      <p css={styles.HeaderWrapper}>
        <span>라운지</span>
      </p>
      <Link passHref href="/lounge">
        <Box as="a" responsive column css={styles.ContentWrapper}>
          {data.map((post, i) => (
            <Fragment key={post.lounge_id}>
              {i !== 0 && <Hr />}
              <LoungeItem post={post} />
            </Fragment>
          ))}
        </Box>
      </Link>
    </Flex>
  );
};

const HotItem = ({ post }: { post: IPostPreviewContent }) => {
  const styles = {
    Wrapper: css`
      gap: 16px;
      flex: 0 1 320px;
      overflow: hidden;
      cursor: pointer;
    `,
    PostName: css`
      font-size: var(--font-paragraph-normal);
      font-weight: 600;
      ${ellipsis(undefined, 2)}
    `,
    PostContent: css`
      font-size: 13px;
      ${ellipsis(undefined, 2)}
    `,
  };

  return (
    <Link passHref href={`/projects/${post.id}`}>
      <Flex as="a" column css={styles.Wrapper}>
        <Image
          alt="hot1"
          src="https://i.imgur.com/hVe2ScX.png"
          width={320}
          height={180}
        />
        <Flex column css={{ gap: "8px" }}>
          <p css={styles.PostName}>{post.postName}</p>
          <p css={styles.PostContent}>{post.content}</p>
        </Flex>
      </Flex>
    </Link>
  );
};

const NewItem = ({ post }: { post: IPostPreviewContent }) => {
  return (
    <Link passHref href={`/projects/${post.id}`}>
      <Flex as="a" css={{ gap: "16px", cursor: "pointer" }}>
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
              fontSize: "var(--font-paragraph-normal)",
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
    </Link>
  );
};

const PostItem = ({ post }: { post: IPostPreviewContent }) => {
  return (
    <Link passHref href={`/projects/${post.id}`}>
      <Flex
        as="a"
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
              fontSize: "var(--font-paragraph-normal)",
              fontWeight: "600",
              ...ellipsis(),
            }}
          >
            {post.postName}
          </p>
          <p
            css={{
              fontSize: "var(--font-paragraph-small)",
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
    </Link>
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
          <p css={{ fontSize: "var(--font-paragraph-small)" }}>
            <b>{post.username}</b> · {timeDiffString(post.date)}
          </p>
        </Flex>
        <div
          css={{
            fontSize: "var(--font-paragraph-small)",
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

const HotFeatured = () => {
  const { data, isLoading, isError } = useQuery("front/featured", () =>
    fetchFrontFeatured()
  );

  const content = useMemo(() => toMatrix(data?.HOT || [], 2), [data]);
  const [pagination, setPagination] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  if (!data || isLoading || isError) return null;

  return (
    <Flex
      column
      css={{
        flex: "99999 1 480px",
        gap: "24px",
        minWidth: 0,
        marginBottom: "-36px",
        img: {
          borderRadius: "8px",
        },
      }}
    >
      <Flex css={{ alignItems: "center", justifyContent: "space-between" }}>
        <p css={{ fontSize: "20px", fontWeight: "bold" }}>
          Hot 스터디/프로젝트 🔥
        </p>
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
            <Flex
              css={{
                gap: "36px",
                [breakpoints.at("sm")]: {
                  gap: "24px",
                },
              }}
            >
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
  const { data, isLoading, isError } = useQuery("front/featured", () =>
    fetchFrontFeatured()
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

/* -------------------------------------------------------------------------- */
/*                                     api                                    */
/* -------------------------------------------------------------------------- */

export const getServerSideProps: GetServerSideProps = injectSession(
  async ({ http }) => {
    const queryClient = new QueryClient();

    await Promise.all([
      queryClient.prefetchQuery("front/featured", () =>
        fetchFrontFeatured(http)
      ),
      // queryClient.prefetchQuery("front/projects", fetchFrontProjects),
    ]);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
