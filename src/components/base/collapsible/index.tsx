import { type FC, type PropsWithChildren, type ReactNode } from "react";
import { BsChevronDown } from "react-icons/bs";

import { cn } from "~/utils/style";

import $style from "./index.module.scss";

export type CollapsibleProps = {
  title: ReactNode;
};

export const Collapsible: FC<PropsWithChildren<CollapsibleProps>> = ({
  children,
  title,
}) => {
  return (
    <div className={cn("collapse", $style.container)}>
      <input type="checkbox" />
      <div
        className={cn(
          "collapse-title flex items-center border-b-2 border-b-black",
          $style.title,
        )}
      >
        {title}
        <BsChevronDown
          className={cn(
            "pointer-events-none absolute right-6 top-4 h-[calc(100%-theme(spacing.4)*1.5)] w-auto",
            $style.arrow,
          )}
        />
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
