import { type RefObject, useEffect, useState } from "react";

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  handler: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  const [intersectionObserver, setIntersectionObserver] =
    useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === "function") {
      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      setIntersectionObserver(observer);

      return () => {
        intersectionObserver?.disconnect();
        setIntersectionObserver(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, options?.threshold, options?.root, options?.rootMargin]);

  return {
    stop: () => {
      intersectionObserver?.disconnect();
      setIntersectionObserver(null);
    },
  };
};
