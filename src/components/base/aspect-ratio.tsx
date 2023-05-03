import { type FC, type HTMLProps, type PropsWithChildren } from "react";

import { cn } from "~/utils/style";

export type AspectRatioProps = HTMLProps<HTMLDivElement> & {
  ratio: number | string;
};

export const AspectRatio: FC<PropsWithChildren<AspectRatioProps>> = ({
  children,
  ratio: rawRatio,
  ...props
}) => {
  const ratio =
    typeof rawRatio === "number" ? (1 / rawRatio) * 100 : Number(rawRatio);

  return (
    <div
      {...props}
      className={cn("relative overflow-clip", props.className)}
      style={{
        paddingBottom: `${ratio.toFixed(4)}%`,
        aspectRatio: (100 / ratio).toFixed(4),
        ...props.style,
      }}
    >
      <div className="absolute left-0 top-0 flex h-full w-full border-none">
        {children}
      </div>
    </div>
  );
};
