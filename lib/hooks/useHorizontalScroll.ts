import { useRef, useCallback, useEffect } from "react";

export const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // event listener: on mouse wheel scroll
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerScrollPosition = scrollRef.current.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY * 0.25,
    });
  }, []);

  // attach onWheel to scrollRef
  // why: https://github.com/facebook/react/issues/14856
  useEffect(() => {
    if (!scrollRef.current) return;
    const ref = scrollRef.current;
    ref.addEventListener("wheel", onWheel);
    return () => ref.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  return scrollRef;
};
