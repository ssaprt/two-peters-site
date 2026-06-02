import { useEffect, useState } from "react";

export const useCompleteLoad = (flags: boolean[]) => {
  const [elementIsReady, setElementIsReady] = useState(flags.length === 0);

  useEffect(() => {
    const isReady = flags.length === 0 || flags.every(Boolean);
    //eslint-disable-next-line
    setElementIsReady(isReady);
  }, [flags]);

  return {
    elementIsReady,
  };
};
