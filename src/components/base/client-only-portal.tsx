import {
  type FC,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export const ClientOnlyPortal: FC<PropsWithChildren<{ selector?: string }>> = ({
  children,
  selector,
}) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = selector ? document.querySelector(selector) : document.body;
    setMounted(true);
  }, [selector]);

  return <>{mounted ? createPortal(children, ref.current!) : null}</>;
};
