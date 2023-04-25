import { type FC, type PropsWithChildren } from "react";

import ImgVideoPoster from "~/assets/layout/main/bg.png";
import { MainHeader } from "~/components/layout/main/MainHeader";
import { cn } from "~/utils/style";

export const MainLayout: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <>
      <MainHeader />
      <div className="relative flex flex-1 flex-col">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 z-[-1] -mt-8 h-[calc(100%+theme(spacing.8))] w-full bg-cover bg-center bg-no-repeat object-cover"
          poster={ImgVideoPoster.src}
          style={{
            backgroundImage: `url(${ImgVideoPoster.blurDataURL!})`,
          }}
        />
        <div className={cn("container flex flex-1 flex-col pb-20", className)}>
          <main className="overflow-hidden">{children}</main>
        </div>
      </div>
    </>
  );
};
