import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay = 300) {
  const [throttled, setThrottled] = useState(value);
  const lastRun = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      setThrottled(value);
      return;
    }

    const timeout = setTimeout(() => {
      lastRun.current = Date.now();
      setThrottled(value);
    }, delay - (now - lastRun.current));

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return throttled;
}
