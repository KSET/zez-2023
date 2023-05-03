import Link from "next/link";
import { type FC } from "react";

import ImageZezLogo from "~/assets/img/shared/zez-logo.png";
import { fontDisplay } from "~/utils/font";
import { cn } from "~/utils/style";

export type MainHeaderProps = {
  withoutLogo?: boolean;
};

export const MainHeader: FC<MainHeaderProps> = ({ withoutLogo }) => {
  return (
    <header
      className={cn("mx-10 flex items-center pt-4", fontDisplay.className)}
    >
      <h1 className="w-48 text-2xl leading-6 tracking-tight">
        <Link href="/">Zavod za eksperimentalni zvuk</Link>
      </h1>

      {!withoutLogo ? (
        <img alt="ZEZ logo" className="ml-auto h-20" src={ImageZezLogo.src} />
      ) : null}
    </header>
  );
};
