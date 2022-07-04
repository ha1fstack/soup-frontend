import { useLayoutEffect, useRef, useState } from "react";

import SwiperType, { Swiper } from "swiper";
import useClientRender from "./useClientRender";

// this is certainly not a good solution, need to find better workaround
// maybe swiper should be lazy initialized, and show only the first slide when it's server rendered?
export const useSwiperRef = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [pagination, setPagination] = useState(0);
  const onSwiper = (ref: SwiperType) => (swiperRef.current = ref);
  const onSlideChange = (swiper: Swiper) => setPagination(swiper.realIndex);
  const isClientRender = useClientRender();

  useLayoutEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    if (isClientRender) swiper.slideTo(1, 0);
  }, [isClientRender]);

  return { swiperRef, onSwiper, pagination, onSlideChange, isClientRender };
};
