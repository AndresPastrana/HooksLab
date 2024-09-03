import { useRef, useCallback } from "react";

export const useDebounceCallback = (
  func: (args: any) => void | any,
  delay: number
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (args: any) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => func(args), delay);
    },
    [func, delay]
  );

  return { debouncedCallback };
};
