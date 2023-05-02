import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import ImgVideoPoster from "~/assets/page/index/bg.png";
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
        className={cn("flex-1 basis-0 overflow-hidden", fontDisplay.className)}
      >
        <div className="relative h-full w-full">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 -z-10 h-full w-full bg-cover bg-top bg-no-repeat object-cover object-top"
            poster={ImgVideoPoster.src}
            style={{
              backgroundImage: `url(${ImgVideoPoster.blurDataURL!})`,
            }}
          />
          <SideNav className="ml-6 pt-20" />
        </div>
        <img
          alt="Zez logo"
          className="absolute right-20 top-16 w-56 mix-blend-multiply"
          src={ImageZezLogo.src}
        />
      </main>
    </>
  );
};

PageHome.getLayout = (page) => page;

export default PageHome;
