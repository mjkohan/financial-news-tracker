import useSWR from 'swr';
import { fetchServerData } from '@/lib/serverFetch';

export function useClientData<T>(url: string) {
  const { data, error, isLoading } = useSWR<T>(url, fetchServerData);

  return {
    data,
    error,
    isLoading,
  };
}
