import { css } from "@emotion/react";
import { CarouselPagination } from "common/atoms";
import { defaultGridTemplate } from "common/styles";
import { Banner } from "components/Banner";
import { useSwiperRef } from "lib/hooks";
import React from "react";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerView = () => {
  const { swiperRef, onSwiper, pagination, onSlideChange, isClientRender } =
    useSwiperRef();

  return (
    <>
      <Swiper
        css={{ gridColumn: "1 / 5" }}
        onSwiper={onSwiper}
        loop={isClientRender}
        autoplay={{
          delay: 12000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        modules={[Autoplay, EffectFade]}
        onSlideChange={onSlideChange}
      >
        {bannerItems.map((item, i) => (
          <SwiperSlide key={i}>
            <Banner {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <BannerPagination
        swiperRef={swiperRef}
        current={pagination}
        end={bannerItems.length}
      />
    </>
  );
};

export default BannerView;

const bannerItems: React.ComponentProps<typeof Banner>[] = [
  {
    color: "#fff",
    backgroundColor: "#050c14",
    badgeColor: "#ff8a05",
    label: "안내사항",
    title: (
      <>
        흩어져 있는 스터디와 프로젝트 모집,
        <br />
        이젠 SouP에서 편하게 모아보세요 ✨
      </>
    ),
    image: "/banner/1.png",
  },
  {
    color: "#1d1d3d",
    backgroundColor: "#ecefff",
    badgeColor: "#1d1d3d",
    label: "안내사항",
    title: (
      <>
        홍보 라운지에서 <br />
        자신의 프로젝트를 자랑해 보세요 😍
      </>
    ),
    image: "/banner/2.png",
  },
  {
    color: "#130909",
    backgroundColor: "#fdf0f0",
    badgeColor: "#130909",
    label: "안내사항",
    title: (
      <>
        관련있는 프로젝트를 모아보고 <br />
        맞춤형 양식으로 편리하게 지원하세요 🥰
      </>
    ),
    image: "/banner/3.png",
  },
];

const BannerPagination = (
  props: React.ComponentProps<typeof CarouselPagination>
) => (
  <div
    css={css`
      grid-column: 1 / 5;
      position: relative;
      ${defaultGridTemplate};
    `}
  >
    <CarouselPagination
      css={{
        position: "absolute",
        bottom: "-14px",
        zIndex: 1,
        backgroundColor: "var(--positive)",
        padding: "6px 12px 6px 8px",
        borderRadius: "12px",
      }}
      {...props}
    />
  </div>
);
