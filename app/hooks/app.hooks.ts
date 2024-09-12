import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ActiveHookContext } from "../context/ActiveHookContext";
// Custom hook to inject and modify the active hook in any client component
export const useActiveHook = () => {
  const context = useContext(ActiveHookContext);
  if (!context) {
    throw new Error(
      "useActiveHook must be use inside a  ActiveHookProvider in a client component"
    );
  }
  return context;
};

export const useFetch = <T>(url: string, init?: RequestInit) => {
  // Fetch State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<T | null>(null);

  // Track the first render
  const firstRender = useRef(true);

  useEffect(() => {
    // AbortController must be recreated on each request
    const abortController = new AbortController();

    // Reset error and loading states
    if (!loading) {
      setLoading(true);
    }
    if (error) {
      setError(null);
    }

    // Fetch request
    fetch(url, { ...init, signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    // Cleanup function to abort the request if not on the first render
    return () => {
      if (!firstRender.current) {
        abortController.abort();
      } else {
        firstRender.current = false; // Mark the first render as done
      }
    };
  }, [url]); // Rerun effect if url or init changes

  return { data, loading, error };
};
