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
      <div className={cn("relative flex-1", fontUi.className)}>
        <SideNav className="absolute left-6 top-20 self-start" />
        <main className={cn("flex flex-1 flex-col", className)}>
          {children}
        </main>
      </div>
    </>
  );
};
