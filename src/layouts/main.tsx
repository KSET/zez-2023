import { type FC, type PropsWithChildren } from "react";

import { MainHeader } from "~/components/layout/main/MainHeader";
import { SideNav } from "~/components/layout/main/SideNav";
import { fontUi } from "~/utils/font";
import { cn } from "~/utils/style";

export const MainLayout: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <>
      <MainHeader />
      <div
        className={cn(
          "relative mt-[54px] grid flex-1 grid-cols-[minmax(0,2fr),minmax(0,6fr)]",
          fontUi.className,
        )}
      >
        <SideNav className="ml-[42px] self-start" />
        <main className={cn("flex flex-1 flex-col", className)}>
          {children}
        </main>
      </div>
    </>
  );
};
