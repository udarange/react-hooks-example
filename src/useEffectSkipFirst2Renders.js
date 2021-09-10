import { useEffect, useRef } from "react";

const useEffectSkipFirst2Renders = (callback, dependencies) => {
  const initialRenderDone = useRef(0);

  useEffect(() => {
    console.log("------triggered-----");
    if (initialRenderDone.current < 2) {
      initialRenderDone.current++
    } else {
      callback();
    }
  }, dependencies);
};

export default useEffectSkipFirst2Renders;
