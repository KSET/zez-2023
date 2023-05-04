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
        "flex overflow-clip rounded-full border-[3px] border-current bg-white px-3 py-[1px] leading-none tracking-tight max-br:hover:bg-black max-br:hover:text-white",
        active && "bg-black text-white",
        props.className,
      )}
    >
      <div className="relative mx-auto text-center br:bottom-0.5">
        {children}
      </div>
    </button>
  );
};
