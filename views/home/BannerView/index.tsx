import { css } from "@emotion/react";
import { CarouselPagination } from "common/components";
import { defaultGridTemplate } from "common/styles";
import { Banner } from "components/Banner";
import React, { useRef, useState } from "react";
import SwiperType, { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerView = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [pagination, setPagination] = useState(0);

  return (
    <>
      <Swiper
        css={{ gridColumn: "1/5" }}
        onSwiper={(ref) => (swiperRef.current = ref)}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        modules={[Autoplay, EffectFade]}
        onSlideChange={(swiper) => setPagination(swiper.realIndex)}
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
    backgroundColor: "#111",
    label: "안내사항",
    title: (
      <>
        흩어져 있는 스터디와 프로젝트 모집,
        <br />
        이젠 SouP에서 편하게 모아보세요
      </>
    ),
  },
  {
    color: "#111",
    backgroundColor: "#ffd3cc",
    label: "프로모션",
    title: (
      <>
        프론트엔드 BEST 강의
        <br />
        SouP에서만 30% 할인중👌
      </>
    ),
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
