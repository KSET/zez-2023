import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import ImageTag from "~/assets/page/index/tag.png";
import { backgroundColorAtom, SvgBands } from "~/components/base/svg-generator";
import { MainHeader } from "~/components/layout/main/MainHeader";
import { type NextPageWithLayout } from "~/types/layout";

const SvgBandsContainer = () => {
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

  const offsetTopPx = 128;

  return (
    <SvgBands
      className="absolute bottom-0 left-0 right-0 h-full w-full"
      data-height={windowHeight}
      height={windowHeight - offsetTopPx}
      randSeed=""
      width={windowWidth}
      style={{
        top: `${offsetTopPx}px`,
      }}
    />
  );
};

const PageHome: NextPageWithLayout = () => {
  const backgroundColor = useAtomValue(backgroundColorAtom);

  return (
    <div
      className="relative flex h-screen flex-1 flex-col overflow-hidden"
      style={{
        backgroundColor,
      }}
    >
      <MainHeader className="z-50" />

      <div className="container relative z-10 flex-1">
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
    </div>
  );
};

PageHome.getLayout = (page) => page;

export default PageHome;
