import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type FC, type HTMLProps, type PropsWithChildren } from "react";

export type AnimatedProps = Omit<HTMLProps<HTMLDivElement>, "ref"> & {
  animation?: Parameters<typeof useAutoAnimate>[0];
};

export const Animated: FC<PropsWithChildren<AnimatedProps>> = ({
  children,
  animation,
  ...props
}) => {
  const [parent] = useAutoAnimate({
    duration: 150,
    ...animation,
  });

  return (
    <div {...props} ref={parent}>
      {children}
    </div>
  );
};
