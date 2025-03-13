import useSWR, { SWRConfiguration } from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }
  return res.json();
};

export function useClientData(url: string, config?: SWRConfiguration) {
  return useSWR(url, fetcher, config);
}
