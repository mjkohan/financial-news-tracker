import { useState, useEffect, useCallback, useRef } from "react";

type MutationMethod = "POST" | "PUT";

// Define generic types for request body and response
type RequestBody = Record<string, unknown>;
type ResponseData<T> = T;

interface UseMutationOptions<TBody extends RequestBody> {
  immediate?: boolean;
  body?: TBody;
  headers?: Record<string, string>;
  onSuccess?: (data: ResponseData<unknown>, response: Response) => void;
  onError?: (error: Error) => void;
}

interface UseMutationReturn<TData, TBody extends RequestBody> {
  data: TData | null;
  error: Error | null;
  loading: boolean;
  mutate: (overrideBody?: TBody) => Promise<void>;
}

export function useMutation<TData, TBody extends RequestBody = RequestBody>(
  method: MutationMethod,
  url: string,
  options: UseMutationOptions<TBody> = {},
): UseMutationReturn<TData, TBody> {
  const { immediate = false, body, headers, onSuccess, onError } = options;

  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Ref to hold the AbortController for cancelling in-flight requests.
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutate = useCallback(
    async (overrideBody?: TBody) => {
      // Cancel any previous request.
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          // Fix: Ensure we're stringifying the body correctly
          body: JSON.stringify(overrideBody || body),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Error ${method === "POST" ? "posting" : "updating"} data: ${response.statusText}`,
          );
        }

        const json = (await response.json()) as TData;
        setData(json);
        onSuccess?.(json, response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            // Request was cancelled
          } else {
            setError(err);
            onError?.(err);
          }
        } else {
          const error = new Error('An unknown error occurred');
          setError(error);
          onError?.(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [method, url, body, headers, onSuccess, onError],
  );

  // If immediate is true, run the mutation on mount.
  useEffect(() => {
    if (immediate) {
      void mutate();
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, mutate]);

  return { data, error, loading, mutate };
}
