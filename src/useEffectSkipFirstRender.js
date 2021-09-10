import { useEffect, useRef } from "react";

const useEffectSkipFirstRender = (callback, dependencies) => {
  const initialRenderDone = useRef(false);

  useEffect(() => {
    console.log("+++++++++++++++++++");
    if (!initialRenderDone.current) {
      initialRenderDone.current = true;
    } else {
      callback();
    }
  }, dependencies);
};

export default useEffectSkipFirstRender;
