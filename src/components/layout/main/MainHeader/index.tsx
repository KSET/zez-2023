import Link from "next/link";
import { type FC, useState } from "react";

import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import { AppDrawer } from "~/components/base/drawer";
import ImageMenuBurger from "~/components/base/drawer/assets/menu-burger.svg";
import { useNavigationChange } from "~/hooks/onNavigation";
import { fontDisplay } from "~/utils/font";
import { cn } from "~/utils/style";

import { SideNav } from "../SideNav";

export type MainHeaderProps = {
  withoutLogo?: boolean;
};

export const MainHeader: FC<MainHeaderProps> = ({ withoutLogo }) => {
  const [navOpen, setNavOpen] = useState(false);
  useNavigationChange(() => setNavOpen(false));

  return (
    <header
      className={cn(
        "mx-6 flex items-center pt-6 br:mx-10 br:pt-7",
        fontDisplay.className,
      )}
    >
      <h1 className="w-28 leading-[1.15] tracking-tight br:w-48 br:text-2xl br:leading-6">
        <Link href="/">Zavod za eksperimentalni zvuk</Link>
      </h1>

      {!withoutLogo ? (
        <img
          alt="ZEZ logo"
          className="ml-auto h-20 max-br:hidden"
          src={ImageZezLogo.src}
        />
      ) : null}
      <div className="ml-auto block h-12 br:hidden">
        <button type="button" onClick={() => setNavOpen((open) => !open)}>
          <img
            alt="Open menu"
            className="h-full w-full object-contain"
            src={(ImageMenuBurger as { src: string }).src}
          />
        </button>
        <AppDrawer showCloseButton open={navOpen} onChange={setNavOpen}>
          <div className="flex w-full flex-col bg-white p-4 text-black">
            <SideNav className="mt-32" />
          </div>

          <div className="mb-[18px] ml-[10px] mt-auto">
            <img
              alt="ZEZ logo"
              className="h-[74px] w-auto"
              src={ImageZezLogo.src}
            />
          </div>
        </AppDrawer>
      </div>
    </header>
  );
};
