import { MainHeader } from "~/components/layout/main/MainHeader";
import { SideNav } from "~/components/layout/main/SideNav";
import { type Layout } from "~/types/layout";
import { fontDisplay, fontUi } from "~/utils/font";
import { cn } from "~/utils/style";

export const mainLayout: Layout = (page, footer) => {
  return (
    <>
      <MainHeader />
      <div
        className={cn(
          "relative mx-6 mt-[54px] flex-1 gap-5 br:grid br:grid-cols-[minmax(0,2fr),minmax(0,6fr)]",
          fontUi.className,
          fontDisplay.variable,
        )}
      >
        <SideNav className="ml-[18px] self-start max-br:!hidden" />
        <main className={cn("flex flex-1 flex-col")}>{page}</main>
      </div>
      {footer?.()}
    </>
  );
};
