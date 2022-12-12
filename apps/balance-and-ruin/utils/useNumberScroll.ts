import { MutableRefObject, useEffect } from "react";

const noop = () => {};

export function useNumberScroll(
  ref: MutableRefObject<HTMLInputElement | null>
) {
  useEffect(() => {
    if (ref.current) {
      const originalRef = ref.current;
      originalRef.addEventListener("wheel", noop, { passive: false });
      return () => {
        originalRef?.removeEventListener("wheel", noop);
      };
    }
  }, [ref]);
}
