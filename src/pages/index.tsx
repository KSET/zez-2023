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
          "flex flex-1 basis-0 overflow-hidden",
          fontDisplay.className,
        )}
      >
        <div className="flex h-auto w-full max-br:hidden">
          <SideNav className="ml-[42px] mt-[54px] self-baseline" />
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 bottom-0 left-0 right-0 top-0 -z-10 h-full w-full bg-cover bg-top bg-no-repeat object-cover object-top"
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
        <img
          alt="Zez logo"
          className="absolute h-[74px] max-br:bottom-8 max-br:left-6 br:right-[42px] br:top-[18px] br:h-36"
          src={ImageZezLogo.src}
        />
        <img
          alt="Slušaj drugačije"
          className="mx-auto mt-8 h-16 br:absolute br:bottom-[46px] br:left-[42px] br:h-28"
          src={ImageTag.src}
        />
      </main>
    </>
  );
};

PageHome.getLayout = (page) => page;

export default PageHome;
