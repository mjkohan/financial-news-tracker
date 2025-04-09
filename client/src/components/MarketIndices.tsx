'use client';

import { useClientData } from '@/hooks/useClientData';

interface MarketIndex {
  name: string;
  value: number;
  change: number;
}

export default function MarketIndices() {
  const { data, error, isLoading } = useClientData<MarketIndex[]>('/api/markets/indices');

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Market Indices</h2>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Market Indices</h2>
        <div className="text-red-500">Failed to load market indices</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Market Indices</h2>
      <div className="grid gap-4">
        {data?.map((index) => (
          <div key={index.name} className="flex justify-between items-center border rounded-lg p-4">
            <span className="font-semibold">{index.name}</span>
            <div className="text-right">
              <div className="text-lg">{index.value.toLocaleString()}</div>
              <div className={index.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}