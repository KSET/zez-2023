import { Router } from "next/router";
import { type FC, useEffect, useState } from "react";

import { cn } from "~/utils/style";

import $style from "./index.module.scss";

export const GlobalLoader: FC = () => {
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
  };

  const end = () => {
    setLoading(false);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <div className={cn($style.loader, !loading && $style.hidden)}>
      Loading...
    </div>
  );
};
