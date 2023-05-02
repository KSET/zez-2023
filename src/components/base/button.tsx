import { type FC, type HTMLProps, type PropsWithChildren } from "react";

import { cn } from "~/utils/style";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  active?: boolean;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  active,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "flex overflow-clip rounded-full border-[3px] border-black bg-white px-3 py-[1px] leading-none tracking-tight hover:bg-black hover:text-white",
        active && "bg-black text-white",
        props.className,
      )}
    >
      <div className="relative bottom-0.5">{children}</div>
    </button>
  );
};
