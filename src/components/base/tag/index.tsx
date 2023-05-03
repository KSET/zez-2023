import { type FC, type HTMLProps, type PropsWithChildren } from "react";

import { cn } from "~/utils/style";

import $style from "./index.module.scss";

export enum TagColor {
  Green = "green",
  Orange = "orange",
  Purple = "purple",
  Pink = "pink",
  Blue = "blue",
  Black = "black",
}

export type TagProps = HTMLProps<HTMLButtonElement> & {
  color: TagColor;
  selected?: boolean;
  asDisplay?: boolean;
};

export const Tag: FC<PropsWithChildren<TagProps>> = ({
  children,
  color,
  selected,
  asDisplay,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "rounded-full border border-black stroke-black px-3 py-1 text-2xl font-medium uppercase leading-none tracking-widest text-white",
        asDisplay && "cursor-text",
        !asDisplay && "hover:border-off-black hover:!bg-black",
        color === TagColor.Green && "bg-green",
        color === TagColor.Orange && "bg-orange",
        color === TagColor.Purple && "bg-purple",
        color === TagColor.Pink && "bg-pink",
        color === TagColor.Blue && "bg-blue",
        color === TagColor.Black && "bg-off-black",
        selected && "!bg-off-black",
        $style.outline,
        props.className,
      )}
    >
      {children}
    </button>
  );
};
