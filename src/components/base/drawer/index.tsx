import Head from "next/head";
import Drawer, { type DrawerProps } from "rc-drawer";
import { type FC, type PropsWithChildren, useCallback } from "react";

import { cn } from "~/utils/style";

import ImageMenuBurgerClose from "./assets/menu-burger-close.svg";
import $style from "./index.module.scss";

export type AppDrawerProps = DrawerProps & {
  onChange?: (to: boolean) => void;
  showCloseButton?: boolean;
};

export const AppDrawer: FC<PropsWithChildren<AppDrawerProps>> = ({
  children,
  onChange,
  showCloseButton,
  ...props
}) => {
  const onClose = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      props.onClose?.(e);
      onChange?.(false);
    },
    [onChange, props],
  );

  return (
    <>
      <Head>
        <style>
          {`
          @media (max-width: 1024px) {
            #__next main {
              transition-property: transform, filter;
              transition-duration: 0.3s;
              transition-timing-function: ease;
            }
          }
          `}
        </style>
        {props.open ? (
          <style>{`
          @media (max-width: 1024px) {
            body {
              overflow: hidden;
            }
            #__next main {
              transform: translateX(-5%) !important;
              filter: blur(.2rem) brightness(0.8) grayscale(0.2);
            }
          }
        `}</style>
        ) : null}
      </Head>
      <Drawer
        placement="right"
        prefixCls="app-drawer"
        width="100%"
        {...props}
        rootClassName={cn($style.root, props.rootClassName)}
        onClose={onClose}
      >
        <div className="flex h-full w-full flex-col bg-white p-4 text-black">
          {showCloseButton ? (
            <div className="p-3 pr-2">
              <button
                className="drawer-button ml-auto flex w-12"
                type="button"
                onClick={onClose}
              >
                <img
                  alt="Close menu"
                  className="h-full w-full object-contain"
                  src={(ImageMenuBurgerClose as { src: string }).src}
                />
              </button>
            </div>
          ) : null}
          {children}
        </div>
      </Drawer>
    </>
  );
};
