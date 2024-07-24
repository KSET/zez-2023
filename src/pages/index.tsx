import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import ImageVideoPoster from "~/assets/page/index/bg.png";
import ImageTag from "~/assets/page/index/tag.png";
import { MainHeader } from "~/components/layout/main/MainHeader";
import { type NextPageWithLayout } from "~/types/layout";

const PageHome: NextPageWithLayout = () => {
  return (
    <>
      <MainHeader />

      <div className="container relative flex-1">
        <img
          alt="Slušaj drugačije"
          className="absolute bottom-[46px] left-[42px] h-28 object-contain max-br:hidden"
          src={ImageTag.src}
        />
        <img
          alt="ZEZ"
          className="absolute bottom-6 right-5 h-[76px] object-contain br:hidden"
          src={ImageZezLogo.src}
        />
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 bottom-0 left-0 right-0 top-0 -z-10 h-full w-full bg-cover bg-top bg-no-repeat object-cover object-top max-br:top-8 max-br:-mt-8"
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
