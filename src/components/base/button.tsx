import { type FC, type HTMLProps, type PropsWithChildren } from "react";

import { cn } from "~/utils/style";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  active?: boolean;
  plain?: boolean;
  square?: boolean;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  active,
  plain,
  square,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      type="button"
      className={cn(
        "flex overflow-clip border-off-black bg-white py-[1px] leading-none tracking-tight hover:hover-hover:pointer-fine:bg-off-black hover:hover-hover:pointer-fine:text-white",
        square ? "rounded-none" : "rounded-full",
        plain ? "border-0" : "border-4 px-3",
        active && "bg-off-black text-white",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        props.className,
      )}
    >
      <div className="relative mx-auto text-center br:bottom-0.5">
        {children}
      </div>
    </button>
  );
};
