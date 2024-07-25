import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import ImageTag from "~/assets/page/index/tag.png";
import { backgroundColorAtom, SvgBands } from "~/components/base/svg-generator";
import { MainHeader } from "~/components/layout/main/MainHeader";
import { type NextPageWithLayout } from "~/types/layout";

const SvgBandsContainer = () => {
  const backgroundColor = useAtomValue(backgroundColorAtom);
  const [windowHeight, setWindowHeight] = useState(1920);
  const [windowWidth, setWindowWidth] = useState(1080);
  useEffect(() => {
    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <SvgBands
      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
      data-height={windowHeight}
      height={windowHeight}
      randSeed=""
      width={windowWidth}
      style={{
        backgroundColor,
      }}
    />
  );
};

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

      <SvgBandsContainer />
    </>
  );
};

PageHome.getLayout = (page) => page;

export default PageHome;
