import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import ImageVideoPoster from "~/assets/page/index/bg.png";
import ImageTag from "~/assets/page/index/tag.png";
import { MainHeader } from "~/components/layout/main/MainHeader";
import { SideNav } from "~/components/layout/main/SideNav";
import { type NextPageWithLayout } from "~/types/layout";
import { fontDisplay } from "~/utils/font";
import { cn } from "~/utils/style";

const PageHome: NextPageWithLayout = () => {
  return (
    <>
      <MainHeader withoutLogo />
      <main
        className={cn(
          "container relative flex flex-1 basis-0 overflow-hidden",
          fontDisplay.className,
        )}
      >
        <div className="flex h-auto w-full max-br:hidden">
          <SideNav className="mt-[54px] self-baseline" />
        </div>
        <div className="container fixed flex max-br:bottom-8 max-br:left-6 br:top-[18px]">
          <img
            alt="Zez logo"
            className="h-[74px] object-contain br:ml-auto br:h-[118px]"
            src={ImageZezLogo.src}
          />
        </div>
        <img
          alt="Slušaj drugačije"
          className="mx-auto mt-8 h-16 object-contain br:absolute br:bottom-[46px] br:left-[42px] br:h-28"
          src={ImageTag.src}
        />
      </main>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 bottom-0 left-0 right-0 top-0 -z-10 h-full w-full bg-cover bg-top bg-no-repeat object-cover object-top max-br:top-8"
        poster={ImageVideoPoster.src}
        style={{
          backgroundImage: `url(${ImageVideoPoster.blurDataURL!})`,
        }}
      >
        <source src="/_forPage/index/bg.webm" type="video/webm; codecs=vp9" />
        <source
          src="/_forPage/index/bg.mp4"
          type='video/mp4; codecs="hvc1.1.6.L120.90"'
        />
        <source
          src="/_forPage/index/bg.fallback.mp4"
          type='video/mp4; codecs="avc1.640033"'
        />
      </video>
    </>
  );
};

PageHome.getLayout = (page) => page;

export default PageHome;
