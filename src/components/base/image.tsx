import { type FC, useCallback, useEffect, useRef, useState } from "react";

import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { cn } from "~/utils/style";

import { AspectRatio, type AspectRatioProps } from "./aspect-ratio";

function preloadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.addEventListener("load", () => {
      void img
        .decode()
        .then(() => resolve(url))
        .catch();
    });
    img.addEventListener("error", reject);

    img.src = url;
  });
}

export type ImageProps = {
  src: string;
  alt: string;
  lazySrc?: string;
  aspectRatio: AspectRatioProps["ratio"];
  observerOptions?: IntersectionObserverInit;
  cover?: boolean;
  onLoad?: (src: string | null | undefined) => void;
};

export const AppImage: FC<ImageProps & { className?: string }> = ({
  src,
  alt,
  lazySrc,
  aspectRatio = Infinity,
  observerOptions,
  cover,
  onLoad,
  className,
}) => {
  const imgEl = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPreview, setIsPreview] = useState(Boolean(lazySrc));
  const [imgSrc, setImgSrc] = useState(lazySrc ?? src);

  const onLoadListener = useCallback(() => {
    onLoad?.(imgEl.current?.src);
  }, [onLoad]);

  useEffect(() => {
    const img = imgEl.current;

    img?.addEventListener("load", onLoadListener);

    return () => {
      img?.removeEventListener("load", onLoadListener);
    };
  }, [onLoadListener]);

  const { stop } = useIntersectionObserver(
    imgEl,
    ([entry]) => {
      if (entry?.isIntersecting) {
        setIsVisible(true);
        stop();
      }
    },
    observerOptions,
  );

  if (!lazySrc) {
    stop();
  }

  useEffect(() => {
    if (!lazySrc) {
      return;
    }

    if (!isVisible) {
      return;
    }

    preloadImage(src)
      .then((src) => {
        setImgSrc(src);
        setIsPreview(false);
      })
      .catch(console.warn);
  }, [isVisible, lazySrc, src]);

  return (
    <AspectRatio className={className} ratio={aspectRatio}>
      <picture
        className={cn(
          "h-full w-full",
          lazySrc ? "bg-cover bg-center bg-no-repeat" : undefined,
        )}
        style={
          lazySrc
            ? {
                backgroundImage: `url(${lazySrc})`,
              }
            : undefined
        }
      >
        <img
          ref={imgEl}
          alt={alt}
          decoding="async"
          draggable="false"
          loading="lazy"
          src={imgSrc}
          className={cn(
            "h-full w-full object-center transition-[filter] duration-500 will-change-[filter]",
            cover ? "object-cover" : "object-contain",
            isPreview && "blur-md filter",
          )}
        />
      </picture>
    </AspectRatio>
  );
};
