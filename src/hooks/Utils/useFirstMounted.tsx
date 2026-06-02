import { useEffect, useRef } from "react";
export const useFirstMounted = () => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }

    return () => {
      mounted.current = false;
    };
  }, [mounted]);

  //eslint-disable-next-line
  return mounted.current;
};
