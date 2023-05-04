import type { NextPage as NextPage_ } from "next";
import type { ReactElement, ReactNode } from "react";

export type LayoutFooter = () => ReactNode;
export type Layout = (page: ReactElement, footer?: LayoutFooter) => ReactNode;

type WithLayout<TPage extends NextPage<unknown, unknown>> = TPage & {
  getLayout?: Layout;
};

type WithFooter<TPage extends NextPage<unknown, unknown>> = TPage & {
  getFooter?: LayoutFooter;
};

type NextPageWithLayout<TProps = unknown, TInitialProps = TProps> = WithLayout<
  NextPage_<TProps, TInitialProps>
>;
