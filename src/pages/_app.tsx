import "~/styles/globals.css";

import { Provider as JotaiProvider } from "jotai";
import { type NextPage } from "next";
import { type AppType } from "next/app";
import Head from "next/head";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { Suspense } from "react";

import { GlobalLoader } from "~/components/base/global-loader";
import { MainLayout } from "~/layouts/main";
import { type WithFooter, type WithLayout } from "~/types/layout";
import { api } from "~/utils/queryApi";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { getLayout, getFooter } = Component as WithLayout<
    WithFooter<NextPage>
  >;

  const layout = getLayout ?? MainLayout;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="IE=Edge" httpEquiv="X-UA-Compatible" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/site.webmanifest" rel="manifest" />
      </Head>
      <DefaultSeo
        description="Zavod za Eksperimentalni Zvuk - Nit vodilja svih programa je stvoriti prostor za slušati drugačije - ono što je drugačije, one koji su drugačiji i na drugačiji način."
        title="Pregled"
        titleTemplate="ZEZ - %s"
        openGraph={{
          type: "website",
          locale: "hr_HR",
          url: "https://zez.kset.org/",
          siteName: "ZEZ",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <SessionProvider session={session}>
        <JotaiProvider>
          {/* <GlobalLoader /> */}
          <Suspense>{layout(<Component {...pageProps} />, getFooter)}</Suspense>
        </JotaiProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
