import { Router } from "next/router";
import { useCallback, useEffect, useState } from "react";

export const useNavigation = ({
  start,
  end,
}: {
  start: () => void;
  end: (success: boolean) => void;
}) => {
  const success = useCallback(() => end(true), [end]);
  const error = useCallback(() => end(false), [end]);

  useEffect(() => {
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", success);
    Router.events.on("routeChangeError", error);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", success);
      Router.events.off("routeChangeError", error);
    };
  }, [error, start, success]);
};

export const useNavigationChange = (change: () => void) => {
  return useNavigation({
    start: change,
    end: change,
  });
};

export const useNavigationProgress = () => {
  const [loading, setLoading] = useState(false);

  const start = () => setLoading(true);
  const end = () => setLoading(false);

  useNavigation({ start, end });

  return {
    loading,
  };
};
