import { useState, useEffect, useCallback, useRef } from 'react';

type MutationMethod = 'POST' | 'PUT';

interface UseMutationOptions {
  /** Whether to run the mutation immediately on mount. Default: false */
  immediate?: boolean;
  /** Optional body/data for the request */
  body?: any;
  /** Optional headers for the request */
  headers?: Record<string, string>;
  /**
   * Callback invoked on a successful response.
   * Receives the response data and the full Response object.
   */
  onSuccess?: (data: any, response: Response) => void;
  /**
   * Callback invoked if the request fails.
   * Receives the error object.
   */
  onError?: (error: any) => void;
}

interface UseMutationReturn<T = any> {
  data: T | null;
  error: any;
  loading: boolean;
  /**
   * Function to trigger the mutation. You can optionally override
   * the initial body with a new payload.
   */
  mutate: (overrideBody?: any) => Promise<void>;
}

/**
 * A custom hook for performing POST/PUT requests.
 * 
 * @param method - The HTTP method, either 'POST' or 'PUT'.
 * @param url - The endpoint URL.
 * @param options - Configuration options (body, headers, callbacks, immediate).
 * @returns { data, error, loading, mutate } state and a function to trigger the mutation.
 */
export function useMutation<T = any>(
  method: MutationMethod,
  url: string,
  options: UseMutationOptions = {}
): UseMutationReturn<T> {
  const { immediate = false, body, headers, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Ref to hold the AbortController for cancelling in-flight requests.
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutate = useCallback(async (overrideBody?: any) => {
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
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(overrideBody !== undefined ? overrideBody : body),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Error ${method === 'POST' ? 'posting' : 'updating'} data: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
      onSuccess?.(json, response);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Request was cancelled; you may choose to handle this differently if needed.
      } else {
        setError(err);
        onError?.(err);
      }
    } finally {
      setLoading(false);
    }
  }, [method, url, body, headers, onSuccess, onError]);

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
