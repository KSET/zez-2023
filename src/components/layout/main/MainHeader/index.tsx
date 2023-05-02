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
      className={cn("mx-16 flex h-36 items-center py-8", fontDisplay.className)}
    >
      <h1 className="text-2xl uppercase tracking-tight">
        <Link href="/">Zavod za Eksperimentalni Zvuk</Link>
      </h1>

      {!withoutLogo ? (
        <img alt="ZEZ logo" className="ml-auto h-full" src={ImageZezLogo.src} />
      ) : null}
    </header>
  );
};
