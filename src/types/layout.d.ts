import type { NextPage as NextPage_ } from "next";
import type { ReactElement, ReactNode } from "react";

type WithLayout<TPage extends NextPage<unknown, unknown>> = TPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type WithFooter<TPage extends NextPage<unknown, unknown>> = TPage & {
  getFooter?: () => ReactNode;
};

type NextPageWithLayout<TProps = unknown, TInitialProps = TProps> = WithLayout<
  NextPage_<TProps, TInitialProps>
>;
