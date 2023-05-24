import {
  type FC,
  type PropsWithChildren,
  type ReactNode,
  useState,
} from "react";

import { cn } from "~/utils/style";

import $style from "./index.module.scss";

export type CollapsibleProps = {
  title: ReactNode;
  renderOnOpen?: boolean;
};

export const Collapsible: FC<PropsWithChildren<CollapsibleProps>> = ({
  children,
  title,
  renderOnOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const renderChildren = !renderOnOpen || isOpen;

  if (children) {
    return (
      <details
        open={isOpen}
        className={cn(
          "overflow-hidden border-b border-b-black open:pb-3",
          $style.details,
        )}
        onToggle={(event) => {
          if (event.target instanceof HTMLDetailsElement) {
            setIsOpen(event.target.open);
          }
        }}
      >
        <summary
          className={cn(
            "flex items-center justify-stretch pb-2",
            children ? $style.withArrow : null,
          )}
        >
          {title}
        </summary>
        {renderChildren ? children : null}
      </details>
    );
  }

  return (
    <div className="overflow-hidden border-b border-b-black">
      <div className="flex items-center justify-stretch pb-2">{title}</div>
    </div>
  );
};
