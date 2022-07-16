import { CarouselPagination, Flex } from "common/atoms";
import { useSwiperRef } from "lib/hooks";
import { frontFeaturedQueryContext } from "lib/queries";
import { breakpoints, toMatrix } from "lib/utils";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import HotItem from "./HotItem";

const HotFeatured = ({ className }: { className?: string }) => {
  const { data, isLoading, isError } = useQuery(...frontFeaturedQueryContext());

  const content = useMemo(() => toMatrix(data?.HOT || [], 2), [data]);
  const { swiperRef, onSwiper, pagination, onSlideChange, isClientRender } =
    useSwiperRef();

  if (!data || isLoading || isError) return null;

  return (
    <Flex
      column
      className={className}
      css={{
        gap: "16px",
        minWidth: 0,
        img: {
          borderRadius: "8px",
        },
      }}
    >
      <Flex css={{ alignItems: "center", justifyContent: "space-between" }}>
        <p css={{ fontSize: "2rem", fontWeight: "bold" }}>
          Hot 스터디/프로젝트 🔥
        </p>
        <CarouselPagination
          reverse
          swiperRef={swiperRef}
          current={pagination}
          end={content.length}
        />
      </Flex>
      <Swiper
        onSwiper={onSwiper}
        loop={isClientRender}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        spaceBetween={72}
        onSlideChange={onSlideChange}
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
              {content.map((post, j) => (
                <HotItem index={i * 2 + j + 1} key={post.id} post={post} />
              ))}
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export default HotFeatured;
