import { type FC, type PropsWithChildren, type ReactNode } from "react";

import { cn } from "~/utils/style";

import $style from "./index.module.scss";

export type CollapsibleProps = {
  title: ReactNode;
};

export const Collapsible: FC<PropsWithChildren<CollapsibleProps>> = ({
  children,
  title,
}) => {
  if (children) {
    return (
      <details
        className={cn(
          "overflow-hidden border-b border-b-black open:pb-3",
          $style.details,
        )}
      >
        <summary
          className={cn(
            "flex items-center justify-stretch pb-2",
            children ? $style.withArrow : null,
          )}
        >
          {title}
        </summary>
        {children}
      </details>
    );
  }

  return (
    <div className="overflow-hidden border-b border-b-black">
      <div className="flex items-center justify-stretch pb-2">{title}</div>
    </div>
  );
};
