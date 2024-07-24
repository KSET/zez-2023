import { MainHeader } from "~/components/layout/main/MainHeader";
import { type Layout } from "~/types/layout";
import { fontDisplay, fontUi } from "~/utils/font";
import { cn } from "~/utils/style";

export const MainLayout: Layout = (page, footer) => {
  return (
    <>
      <MainHeader />
      <div
        className={cn(
          "container relative mx-auto mt-[54px] flex-1",
          fontUi.className,
          fontDisplay.variable,
        )}
      >
        <main className="flex flex-1 flex-col">{page}</main>
      </div>
      {footer?.()}
    </>
  );
};
