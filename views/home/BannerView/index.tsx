import { css } from "@emotion/react";
import { Banner } from "components/Banner";
import { useRef, useState } from "react";
import SwiperType, { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerView = () => {
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

export default BannerView;
